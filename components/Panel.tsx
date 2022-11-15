import {
  Image,
  HStack,
  VStack,
  Text,
  GridItem,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NewsItem } from "../types/types";
import { useRouter } from "next/router";

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
  const type = useBreakpointValue({ base: "vertical", sm: "horizontal" });

  if (type === "vertical") {
    return (
      <GridItem
        borderRadius="8px"
        background="blue.800"
        minH="340px"
        w="100%"
        onClick={() => goToPath(data.link)}
      >
        <VStack>
          <Image
            src={data.image.$.url}
            w="100%"
            borderRadius="8px 8px 0px 0px"
            objectFit="cover"
          />
          <Box w="100%" h="100%" padding="8px 16px 12px">
            <Text fontSize="16px" fontWeight={500}>
              {data.title}
            </Text>
          </Box>
        </VStack>
      </GridItem>
    );
  } else {
    return (
      <GridItem
        borderRadius="8px"
        background="blue.800"
        minH={{ base: "110px", md: "120px", lg: "130px", xl: "140px" }}
        w="100%"
        onClick={() => goToPath(data.link)}
      >
        <HStack>
          <Image
            src={data.image.$.url}
            borderRadius="8px 0px 0px 8px"
            boxSize={{ base: "110px", md: "120px", lg: "130px", xl: "140px" }}
            objectFit="cover"
          />
          <Box padding={{ base: "6px 6px 6px 4px", md: "10px", lg: "14px" }}>
            <Text
              fontSize={{ base: "14px", md: "15px", lg: "18px" }}
              fontWeight={500}
            >
              {data.title}
            </Text>
          </Box>
        </HStack>
      </GridItem>
    );
  }
};

export default Panel;
