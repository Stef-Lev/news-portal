import {
  Image,
  Flex,
  Text,
  GridItem,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NewsItem } from "../types/types";
import { useRouter } from "next/router";
import { el } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";

type PanelProps = {
  data: NewsItem;
};

const Panel: React.FC<PanelProps> = ({ data }) => {
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

  const publishedDate = formatDistanceToNowStrict(new Date(data.isoDate), {
    locale: el,
    addSuffix: true,
  });

  const type = useBreakpointValue({ base: "vertical", sm: "horizontal" });

  if (type === "vertical") {
    return (
      <GridItem
        borderRadius="8px"
        background="blue.800"
        w="100%"
        _hover={{ cursor: "pointer" }}
        onClick={() => goToPath(data.link)}
      >
        <Flex flexDirection="column">
          <Image
            alt={data.title}
            src={data.image?.$.url}
            w="100%"
            borderRadius="8px 8px 0px 0px"
            objectFit="cover"
          />
          <Flex
            flexDirection="column"
            padding="10px"
            justifyContent="space-between"
          >
            <Box w="100%">
              <Text fontSize="16px" fontWeight={500}>
                {data.title}
              </Text>
            </Box>
            <Box>
              <Text
                fontSize="14px"
                fontStyle="italic"
                color="text.medium"
                pt="4px"
                css={{
                  "&::-webkit-line-clamp": 3,
                  overflow: "hidden",
                }}
              >
                {publishedDate}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </GridItem>
    );
  } else {
    return (
      <GridItem
        borderRadius="8px"
        background="blue.800"
        h={{ base: "110px", md: "120px", lg: "130px", xl: "140px" }}
        w="100%"
        _hover={{ cursor: "pointer" }}
        onClick={() => goToPath(data.link)}
      >
        <Flex>
          <Image
            alt={data.title}
            src={data.image?.$.url}
            borderRadius="8px 0px 0px 8px"
            boxSize={{ base: "110px", md: "120px", lg: "130px", xl: "140px" }}
            objectFit="cover"
          />
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            padding={{ base: "10px", md: "10px", lg: "14px" }}
            w="100%"
          >
            <Box>
              <Text fontSize={{ base: "14px", lg: "18px" }} fontWeight={500}>
                {data.title}
              </Text>
            </Box>
            <Box>
              <Text
                fontSize="13px"
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
  }
};

export default Panel;
