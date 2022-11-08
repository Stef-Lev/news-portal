import { Container, Heading, Text, Image, Center } from "@chakra-ui/react";
import scrapeIt from "scrape-it";
import { NextPageContext } from "next";

const Article = ({ data }) => {
  // console.log(data);
  return (
    <Container maxW={["95%", "90%", "70%", "60%"]}>
      <Heading fontSize={["1.4rem", "1.6rem", "1.8rem", "2rem"]}>
        {data.title}
      </Heading>
      <Heading
        as="h4"
        fontSize={["0.9rem", "0.9rem", "1rem", "1.1rem"]}
        fontWeight={400}
        fontStyle="italic"
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
    title: "h1",
    subtitle: "h2",
    imgUrl: {
      selector: '.first-img source[media="(min-width: 1024px)"]',
      attr: "srcset",
    },
    content: {
      selector: ".entry-content p",
    },
  }).then(({ data, response }) => {
    return (finalData = data);
  });

  return {
    props: { data: finalData },
  };
}
