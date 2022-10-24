import { Box, HStack, VStack, Image, Heading } from "@chakra-ui/react";

function WeatherCarousel({ items }) {
  console.log(items);
  return (
    <div>
      <HStack h="80px" bg="grey" padding="8px 12px" overflowX="scroll">
        {items.map((item) => (
          <Box>
            <VStack>
              <Heading as="h4">{item.name}</Heading>
            </VStack>
          </Box>
        ))}
      </HStack>
    </div>
  );
}
//https://openweathermap.org/img/wn/04n@2x.png

export default WeatherCarousel;
