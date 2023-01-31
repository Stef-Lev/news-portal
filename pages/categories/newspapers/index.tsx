import scrapeIt from "scrape-it";
import type { NextPage } from "next";
import { NextPageContext } from "next";
import {
  Container,
  Heading,
  Text,
  Image,
  Center,
  IconButton,
  Box,
  HStack,
  Link,
} from "@chakra-ui/react";

const Newspapers: NextPage = ({ data }) => {
  console.log(data);
  return (
    <Box mt="90px" mb="20px" borderBottom="1px solid #f3f3f3" pb="8px">
      <Text>Newspapers</Text>

      {data.papers.map((item) => (
        <Box key={item.url}>
          <Heading>{item.title}</Heading>
          <Link href={`/newspapers/${item.url}`}>
            <Image src={item.img} />
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default Newspapers;

export async function getServerSideProps(ctx: NextPageContext) {
  const url = "https://www.protothema.gr/frontpages/";

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
