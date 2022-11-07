import { Box, Image, HStack, VStack, Text, GridItem } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Panel({ data }) {
  const router = useRouter();
  const preparePath = (link: string) => {
    let path = link.split("/");
    return path[path.length - 2];
  };
  const goToPath = (url) => {
    router.push({
      pathname: `/news/${preparePath(url)}`,
      query: { url: url },
    });
  };

  return (
    <GridItem
      borderRadius="8px"
      border="1px solid grey"
      h="140px"
      w="100%"
      onClick={() => goToPath(data.link)}
    >
      <HStack>
        <Image
          src={data.image.$.url}
          borderRadius="8px 0px 0px 8px"
          boxSize="140px"
          objectFit="cover"
        />
        <VStack justify="flex-start" padding="8px">
          <Text fontSize={{ base: "14px", md: "15px", lg: "18px" }}>
            {data.title}
          </Text>
        </VStack>
      </HStack>
    </GridItem>
  );
}

export default Panel;
