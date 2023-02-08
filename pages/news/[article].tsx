import { useRouter } from "next/router";
import type { NextPage } from "next";
import { NextPageContext } from "next";
import { titleToPath } from "../../helpers/pathTitles";
import { categories } from "../../helpers/pathTitles";
import cleanArticle from "../../helpers/cleanArticle";
import { ArticleType } from "../../types/types";
import scrapeIt from "scrape-it";
import format from "date-fns/format";
import { el } from "date-fns/locale";
import {
  Container,
  Heading,
  Text,
  Image,
  Center,
  IconButton,
  Box,
  HStack,
} from "@chakra-ui/react";
import { ChevronLeftIcon, CalendarIcon } from "@chakra-ui/icons";

type ArticleProps = { data: ArticleType };

const Article: NextPage<ArticleProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      {data && (
        <>
          <Box mt="90px" mb="20px" pb="8px">
            <IconButton
              aria-label="Go back"
              variant="unstyled"
              icon={<ChevronLeftIcon boxSize="40px" />}
              onClick={() => router.back()}
            />
          </Box>
          <Container
            maxW={["95%", "90%", "80%", "70%", "60%"]}
            gap="120px"
            pb="30px"
          >
            <Heading fontSize={["24px", "24px", "26px", "28px"]} pb="16px">
              {data.title}
            </Heading>
            <Heading
              as="h4"
              fontSize={["16px", "16px", "18px", "20px"]}
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
                width={{ base: "100%", md: "90%", lg: "90%", xl: "70%" }}
                alt="article"
              />
            </Center>
            <Box
              bg="blue.400"
              color="white"
              borderRadius="5px"
              p="2px 6px"
              fontWeight={700}
              width="max-content"
              mb="16px"
              onClick={() =>
                router.push(
                  `/categories/${
                    titleToPath[
                      categories[
                        data.category as keyof typeof categories
                      ] as keyof typeof titleToPath
                    ]
                  }`
                )
              }
            >
              {categories[data.category as keyof typeof categories]}
            </Box>

            <HStack mb={3}>
              <CalendarIcon color="text.medium" />
              {data.date && (
                <Text
                  fontSize={{ base: "12px", md: "16px" }}
                  fontStyle="italic"
                  color="text.medium"
                >
                  {format(new Date(data.date), "PPPp", { locale: el })}
                </Text>
              )}
            </HStack>
            <Text fontSize={{ base: "16px", md: "18px" }}>{data.content}</Text>
          </Container>
        </>
      )}
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

  let finalData: ArticleType = {};
  const ftc = await scrapeIt(url, {
    title: "h1",
    subtitle: "h2",
    category: { selector: ".entry-header a" },
    date: { selector: ".meta-date-published", attr: "datetime" },
    imgUrl: {
      selector: '.first-img source[media="(min-width: 1024px)"]',
      attr: "srcset",
    },
    content: {
      selector: ".entry-content p",
    },
  }).then((res) => {
    if (res.data) {
      const data: ArticleType = res.data;
      return (finalData = cleanArticle(data));
    } else {
      return null;
    }
  });

  return {
    props: { data: finalData },
  };
}
