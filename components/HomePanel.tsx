import { Image, Flex, Text, GridItem, Box, Heading } from "@chakra-ui/react";
import { NewsItem } from "../types/types";
import { useRouter } from "next/router";
import { el } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";

type HomePanelProps = {
  newsItem: NewsItem;
  index: number;
};

const HomePanel: React.FC<HomePanelProps> = ({ newsItem, index }) => {
  const router = useRouter();
  const preparePath = (link: string) => {
    let path = link.split("/");
    return path[path.length - 3];
  };
  const goToPath = (url: string) => {
    router.push({
      pathname: `/news/${preparePath(url)}`,
      query: { url: url },
    });
  };
  const publishedDate = formatDistanceToNowStrict(new Date(newsItem.isoDate), {
    locale: el,
    addSuffix: true,
  });
  // console.log(newsItem);
  return (
    <GridItem
      key={newsItem.title}
      colSpan={{ base: 2, md: index === 0 ? 2 : 1 }}
      borderRadius="8px"
      background="blue.800"
      w="100%"
      onClick={() => goToPath(newsItem.link)}
    >
      <Flex flexDirection="column">
        <Image
          alt={newsItem.title}
          src={newsItem.image.$.url}
          w="100%"
          height={{
            base: "250px",
            sm: "320px",
            md: index === 0 ? "400px" : "220px",
            lg: index === 0 ? "500px" : "300px",
          }}
          borderRadius="8px 8px 0px 0px"
          objectFit="cover"
        />
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          w="100%"
          minH="120px"
          padding={{ base: "12px", sm: "14px", md: "20px" }}
        >
          <Heading
            as="h3"
            fontSize="22px"
            fontWeight={500}
            h={{
              base: index === 0 ? "auto" : "86px",
              md: index === 0 ? "auto" : "78px",
            }}
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {newsItem.title}
          </Heading>
          {index === 0 && (
            <Text fontWeight={400}>{newsItem.contentSnippet}</Text>
          )}
          <Box>
            <Text
              fontSize="14px"
              fontStyle="italic"
              color="text.medium"
              pt="4px"
            >
              {publishedDate}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default HomePanel;
