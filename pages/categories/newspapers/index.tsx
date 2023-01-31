import scrapeIt from "scrape-it";
import { useRouter } from "next/router";
import { pathToTitle } from "../../../helpers/pathTitles";
import type { NextPage } from "next";
import { NextPageContext } from "next";
import {
  Heading,
  Text,
  Image,
  Box,
  Link,
  Flex,
  Center,
} from "@chakra-ui/react";

const Newspapers: NextPage = ({ data }) => {
  const router = useRouter();
  console.log(router);
  console.log(data);
  return (
    <Box mt="90px" mb="20px" borderBottom="1px solid #f3f3f3" pb="8px">
      <Heading marginBottom="16px">ΕΦΗΜΕΡΙΔΕΣ</Heading>

      <Flex flexWrap="wrap" gap={5} justifyContent="center">
        {data.papers.map((item) => (
          <Box key={item.url}>
            <Flex
              display="flex"
              flexDirection="column"
              alignItems="center"
              w="300px"
            >
              <Heading as="h5" fontSize="20px">
                {item.title}
              </Heading>
              <Link href={`/newspapers/${item.url}`}>
                <Image src={item.img} alt={item.title} />
              </Link>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Newspapers;

export async function getServerSideProps(ctx: NextPageContext) {
  const url = process.env.PAPERS_URL;

  let finalData;
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
    return (finalData = data);
  });

  return {
    props: { data: finalData },
  };
}
