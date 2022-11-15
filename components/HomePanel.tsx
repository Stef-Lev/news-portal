import { Image, VStack, Text, GridItem, Box, Heading } from "@chakra-ui/react";
import { NewsItem } from "../types/types";
import { useRouter } from "next/router";

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
  console.log(newsItem);
  return (
    <GridItem
      key={newsItem.title}
      colSpan={{ base: 2, md: index === 0 ? 2 : 1 }}
      borderRadius="8px"
      background="blue.800"
      minH="340px"
      w="100%"
      onClick={() => goToPath(newsItem.link)}
    >
      <VStack>
        <Image
          src={newsItem.image.$.url}
          w="100%"
          borderRadius="8px 8px 0px 0px"
          objectFit="cover"
        />
        <Box w="100%" h="100%" padding="8px 16px 12px">
          <Heading as="h3" fontSize="22px" fontWeight={500}>
            {newsItem.title}
          </Heading>
          {index === 0 && (
            <Text fontWeight={400}>{newsItem.contentSnippet}</Text>
          )}
        </Box>
      </VStack>
    </GridItem>
  );
};

export default HomePanel;
