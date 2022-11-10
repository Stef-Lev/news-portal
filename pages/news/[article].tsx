import {
  Container,
  Heading,
  Text,
  Image,
  Center,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import scrapeIt from "scrape-it";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

const Article = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <Box
        mt="40px"
        mb="20px"
        borderBottom="1px solid #f3f3f3"
        pb="8px"
        display={{ base: "block", md: "none" }}
      >
        <IconButton
          aria-label="Go back"
          variant="unstyled"
          icon={<ChevronLeftIcon boxSize="40px" />}
          onClick={() => router.back()}
        />
      </Box>
      <Container
        maxW={["95%", "90%", "70%", "60%"]}
        gap="120px"
        pb="30px"
        mt={{ base: "0px", md: "40px" }}
      >
        <Heading fontSize={["1.4rem", "1.6rem", "1.8rem", "2rem"]} pb="16px">
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
    </>
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
