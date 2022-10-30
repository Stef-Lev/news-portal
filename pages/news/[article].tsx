import { Container, Heading, Text, Image, Center } from "@chakra-ui/react";
import scrapeIt from "scrape-it";
import { NextPageContext } from "next";

import { cleanContent } from "../../helpers/cleanContent";

const Article = ({ data }) => {
  return (
    <Container maxW={["95%", "90%", "70%", "60%"]}>
      <Heading fontSize={["1.6rem", "1.8rem", "2.2rem", "2.2rem"]}>
        {data.title}
      </Heading>
      <Heading
        as="h4"
        fontSize={["1.2rem", "1.3rem", "1.5rem", "1.5rem"]}
        fontWeight={500}
      >
        {data.subtitle}
      </Heading>
      <Center>
        <Image
          src={data.imgUrl}
          fallbackSrc={data.imgUrl}
          borderRadius="10px"
          my="22px"
          width={["100%", "88%"]}
          alt="article"
        />
      </Center>
      <Text>{data.content}</Text>
    </Container>
  );
};

export default Article;

export async function getServerSideProps(ctx: NextPageContext) {
  const { url } = ctx.query;

  if (!url) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let finalData;
  const ftc = await scrapeIt(url, {
    title: ".title h1",
    subtitle: ".articleTopInfo h3",
    imgUrl: { selector: ".imgWrp picture img", attr: "src" },
    content: {
      selector: ".articleContainer__main .cnt",
    },
  }).then(({ data, response }) => {
    return (finalData = cleanContent(data));
  });

  return {
    props: { data: finalData },
  };
}
