import { Box, Image, HStack, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Panel({ data }) {
  const router = useRouter();
  const preparePath = (link: string) => {
    return link.split("/")[6];
  };
  const goToPath = (url) => {
    router.push({
      pathname: `/news/${preparePath(url)}`,
      query: { url: url },
    });
  };

  return (
    <Box
      borderRadius="8px"
      border="1px solid grey"
      h="180px"
      onClick={() => goToPath(data.link)}
    >
      <HStack>
        <Image src={data.image.$.url} boxSize="180px" objectFit="cover" />
        <VStack justify="flex-start">
          <Text>{data.title}</Text>
        </VStack>
      </HStack>
    </Box>
  );
}

export default Panel;
