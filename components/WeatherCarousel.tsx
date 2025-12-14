import { WeatherObject } from "../types/types";
import { weatherCities } from "../helpers/weatherCities";
import { Box, Image, Text, Flex, Container, Center } from "@chakra-ui/react";

type WeatherProps = {
  items: WeatherObject[];
};

function convertKelvinToCelsius(kelvin: number): string {
  return Math.round(kelvin - 273.15) + "°C";
}

function WeatherCarousel({ items }: WeatherProps) {
  console.log({ items });
  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }} mb="20px">
      <Center>
        <Flex
          id="sky"
          h="120px"
          bg="white"
          padding="0px"
          overflowX="auto"
          mt="90px"
          scrollSnapType="x"
          borderRadius="10px"
        >
          {items.map((item) => (
            <Box key={item.city.id} w="120px">
              <Flex
                w="120px"
                padding="5px 8px"
                flexDirection="column"
                alignItems="center"
              >
                <Text fontSize="md">
                  {weatherCities[item.city.name as keyof typeof weatherCities]}
                </Text>
                <Image
                  alt="weather"
                  w="50px"
                  src={`https://openweathermap.org/img/wn/${item.data.weather[0].icon}@2x.png`}
                />
                <Text fontSize="sm">
                  {convertKelvinToCelsius(item.data.main.temp)}
                </Text>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Center>
    </Container>
  );
}

export default WeatherCarousel;
