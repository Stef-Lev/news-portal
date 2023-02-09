import { useRouter } from "next/router";
import { NewsItem } from "../types/types";
import { formatDistanceToNowStrict } from "date-fns";
import { el } from "date-fns/locale";
import { Image, Flex, Text, GridItem, Box, Heading } from "@chakra-ui/react";

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

  return (
    <GridItem
      key={newsItem.title}
      colSpan={{ base: 2, md: index === 0 ? 2 : 1 }}
      borderRadius="8px"
      background="light.300"
      boxShadow="1px 1px 3px 1px rgba(0,0,0,0.40)"
      w="100%"
      _hover={{ cursor: "pointer" }}
      onClick={() => goToPath(newsItem.link)}
    >
      <Flex flexDirection="column">
        <Image
          alt={newsItem.title}
          src={newsItem.image?.$.url}
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
