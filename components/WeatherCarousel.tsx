import { Box, HStack, VStack, Image, Text } from "@chakra-ui/react";
import { weatherCities } from "../helpers/weatherCities";

function WeatherCarousel({ items }) {
  return (
    <div>
      <HStack h="140px" bg="lightgray" padding="8px" overflowX="auto">
        {items.map((item) => (
          <Box key={item.name} w="120px">
            <VStack w="120px" padding="5px 8px">
              <Text fontSize="md">{weatherCities[item.name]}</Text>
              <Image
                alt="weather"
                w="50px"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                marginTop={0}
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
