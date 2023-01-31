import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { dateString } from "../../../helpers/scoreDates";
import { el } from "date-fns/locale";
import scrapeIt from "scrape-it";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { NextPageContext } from "next";
import { FrontPages } from "../../../types/types";
import {
  Heading,
  Image,
  Box,
  Link,
  Flex,
  Container,
  Center,
  Text,
} from "@chakra-ui/react";

registerLocale("el", el);
setDefaultLocale("el");

type NewspapersProps = { frontpages: FrontPages };

const Newspapers: NextPage<NewspapersProps> = ({ frontpages }) => {
  const [startDate, setStartDate] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const { date } = router.query;
    if (date) {
      setStartDate(new Date(date as string));
    }
  }, [router.query]);

  console.log(dateString(new Date(), true));
  // console.log(router);
  console.log(frontpages);
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
          <DatePicker
            selected={startDate}
            locale="el"
            dateFormat="dd-MM-yyyy"
            onChange={(date) =>
              router.push(
                `/categories/newspapers?date=${dateString(date as Date, true)}`
              )
            }
          />
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
                  <Link
                    href={`/categories/newspapers/${
                      item.img.split("/")[7].split(".")[0]
                    }/?img=${item.img}&title=${item.title}`}
                  >
                    <Image src={item.img} alt={item.title} />
                  </Link>
                </Flex>
              </Box>
            ))}
          {frontpages.papers.length === 0 && (
            <Flex h="200px" alignItems="center" justifyContent="center">
              <Text>Δεν υπάρχουν πρωτοσέλιδα για αυτήν την ημερομηνία</Text>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Newspapers;

export async function getServerSideProps(ctx: NextPageContext) {
  const url = process.env.PAPERS_URL || "https://www.protothema.gr/frontpages/";
  const { date } = ctx.query;
  const fetchDate = `?dt=${date}&publication=-1`;

  let frontpages;
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
}
