import scrapeIt from "scrape-it";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { NextPageContext } from "next";
import { FrontPages } from "../../../types/types";
import { Heading, Image, Box, Link, Flex, Container } from "@chakra-ui/react";

type NewspapersProps = { frontpages: FrontPages };

const Newspapers: NextPage<NewspapersProps> = ({ frontpages }) => {
  const router = useRouter();
  console.log(router);
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
        <Flex flexWrap="wrap" gap={5} justifyContent="center">
          {frontpages.papers.map((item) => (
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
                <Link href={`/newspapers/${item.url}`}>
                  <Image src={item.img} alt={item.title} />
                </Link>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default Newspapers;

export async function getServerSideProps(ctx: NextPageContext) {
  const url = process.env.PAPERS_URL || "https://www.protothema.gr/frontpages/";

  let frontpages;
  const ftc = await scrapeIt(url, {
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
