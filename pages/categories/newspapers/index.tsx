import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { NextPageContext } from "next";
import { Paper } from "../../../types/types";
import { FrontPages } from "../../../types/types";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateString } from "../../../helpers/scoreDates";
import { el } from "date-fns/locale";
import scrapeIt from "scrape-it";
import {
  Heading,
  Image,
  Box,
  Flex,
  Container,
  Center,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";

registerLocale("el", el);
setDefaultLocale("el");

type NewspapersProps = { frontpages: FrontPages };

const Newspapers: NextPage<NewspapersProps> = ({ frontpages }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [frontpage, setFrontpage] = useState({ img: "", title: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    const { date } = router.query;
    if (date) {
      setStartDate(new Date(date as string));
    }
  }, [router.query]);

  const showModal = (item: Paper) => {
    setFrontpage({ img: item.img, title: item.title });
    onOpen();
  };

  return (
    <Box mt="120px" mb="20px">
      <Container
        maxW={{ base: "100%", md: "720px", lg: "900px", xl: "1100px" }}
        mb="20px"
      >
        <Heading marginBottom="30px" textAlign="center">
          ΠΡΩΤΟΣΕΛΙΔΑ ΕΦΗΜΕΡΙΔΩΝ
        </Heading>
        <Center id="newspaper-date">
          <Flex alignItems="center" justifyContent="center" gap={2}>
            <Box mb="20px">
              <FiCalendar size="32px" />
            </Box>
            <Box>
              <DatePicker
                selected={startDate}
                locale="el"
                dateFormat="dd-MM-yyyy"
                disabledKeyboardNavigation
                onChange={(date) =>
                  router.push(
                    `/categories/newspapers?date=${dateString(
                      date as Date,
                      true
                    )}`
                  )
                }
              />
            </Box>
          </Flex>
        </Center>

        <Flex flexWrap="wrap" gap={5} justifyContent="center">
          {frontpages.papers.length > 0 &&
            frontpages.papers.map((item) => (
              <Box key={item.url}>
                <Flex
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  w="300px"
                >
                  <Heading as="h5" fontSize="20px" mb="10px">
                    {item.title}
                  </Heading>
                  <Image
                    src={item.img}
                    alt={item.title}
                    onClick={() => showModal(item)}
                    borderRadius="8px"
                    _hover={{ cursor: "pointer" }}
                  />
                </Flex>
              </Box>
            ))}
          {frontpages.papers.length === 0 && (
            <Flex h="200px" alignItems="center" justifyContent="center">
              <Text>Δεν υπάρχουν πρωτοσέλιδα για αυτήν την ημερομηνία</Text>
            </Flex>
          )}
        </Flex>
        <Box>
          <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent color="light.global.color" background="white">
              <ModalHeader fontWeight="bold">
                <Center>{frontpage.title}</Center>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody padding="0">
                <Center>
                  <Image
                    width="620px"
                    src={frontpage.img}
                    alt={frontpage.title}
                    onClick={onOpen}
                    margin="0"
                    _hover={{ cursor: "pointer" }}
                  />
                </Center>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Container>
    </Box>
  );
};

export default Newspapers;

export async function getServerSideProps(ctx: NextPageContext) {
  const url = process.env.PAPERS_URL;
  const { date } = ctx.query;
  const fetchDate = `?dt=${date}&publication=-1`;

  let frontpages;
  try {
    const ftc = await scrapeIt(url + fetchDate, {
      papers: {
        listItem: ".fpItem",
        data: {
          title: { selector: "h3" },
          url: { selector: "a", attr: "href" },
          img: {
            selector: "picture source[type='image/jpeg']",
            attr: "data-srcset",
          },
        },
      },
    }).then(({ data }) => {
      return (frontpages = data);
    });

    return {
      props: { frontpages },
    };
  } catch (err) {
    return {
      redirect: { permanent: false, destination: "/404" },
      props: { error: err },
    };
  }
}
