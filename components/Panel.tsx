import { Image, HStack, VStack, Text, GridItem, Box } from "@chakra-ui/react";
import { NewsItem } from "../types/types";
import { useRouter } from "next/router";

type PanelProps = {
  data: NewsItem;
  type?: "horizontal" | "vertical";
};

const Panel: React.FC<PanelProps> = ({ data, type }) => {
  const router = useRouter();
  const preparePath = (link: string) => {
    let path = link.split("/");
    return path[path.length - 2];
  };
  const goToPath = (url: string) => {
    router.push({
      pathname: `/news/${preparePath(url)}`,
      query: { url: url },
    });
  };

  if (type === "vertical") {
    return null;
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
          <Box padding="6px 6px 6px 4px">
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
