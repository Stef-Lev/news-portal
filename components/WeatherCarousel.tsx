import { Box, Image, Text, Flex, Container, Center } from "@chakra-ui/react";
import { weatherCities } from "../helpers/weatherCities";

function WeatherCarousel({ items }) {
  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }} mb="20px">
      <Center>
        <Flex
          h="120px"
          bg="blue.900"
          padding="0px"
          overflowX="auto"
          mt="66px"
          scrollSnapType="x"
        >
          {items.map((item) => (
            <Box key={item.name} w="120px">
              <Flex
                w="120px"
                padding="5px 8px"
                flexDirection="column"
                alignItems="center"
              >
                <Text fontSize="md">{weatherCities[item.name]}</Text>
                <Image
                  alt="weather"
                  w="50px"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                />
                <Text fontSize="sm">{Math.round(item.main.temp)}°C</Text>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Center>
    </Container>
  );
}
//https://openweathermap.org/img/wn/04n@2x.png

export default WeatherCarousel;
