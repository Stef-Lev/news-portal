import { useRouter } from "next/router";
import { NewsItem } from "../types/types";
import { formatDistanceToNowStrict } from "date-fns";
import { el } from "date-fns/locale";
import {
  Image,
  Flex,
  Text,
  GridItem,
  Box,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

type PanelProps = {
  data: NewsItem;
};

const Panel: React.FC<PanelProps> = ({ data }) => {
  const router = useRouter();

  const color = useColorModeValue("light.global.color", "dark.global.color");
  const background = useColorModeValue("light.panel.bg", "dark.panel.bg");
  const dateColor = useColorModeValue("light.text.medium", "dark.text.medium");

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
        color={color}
        background={background}
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
            minH="120px"
          >
            <Box w="100%">
              <Text fontSize="20px" fontWeight={500}>
                {data.title}
              </Text>
            </Box>
            <Box>
              <Text
                fontSize="14px"
                fontStyle="italic"
                color={dateColor}
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
        color={color}
        background={background}
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
              <Text
                fontSize={{ base: "16px", md: "14px", lg: "18px" }}
                fontWeight={500}
              >
                {data.title}
              </Text>
            </Box>
            <Box>
              <Text
                fontSize="13px"
                fontStyle="italic"
                color={dateColor}
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
