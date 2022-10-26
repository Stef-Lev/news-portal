import { Box, HStack, VStack, Image, Text } from "@chakra-ui/react";

function WeatherCarousel({ items }) {
  return (
    <div>
      <HStack h="140px" bg="lightgray" padding="8px" overflowX="scroll">
        {items.map((item) => (
          <Box key={item.name} w="120px">
            <VStack w="120px" padding="5px 8px">
              <Text fontSize="md">{item.name}</Text>
              <Image
                alt="weather"
                w="50px"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                my="0px"
              />
              <Text fontSize="sm">{Math.round(item.main.temp)}°C</Text>
            </VStack>
          </Box>
        ))}
      </HStack>
    </div>
  );
}
//https://openweathermap.org/img/wn/04n@2x.png

export default WeatherCarousel;
