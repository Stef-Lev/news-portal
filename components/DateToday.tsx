import React from "react";
import { Container, Box, Heading } from "@chakra-ui/react";
import { format } from "date-fns";
import { el } from "date-fns/locale";

const DateToday = () => {
  const dateToday = format(new Date(), "PPPP", { locale: el });
  return (
    <Container
      maxW={{ base: "100%", md: "720px", lg: "900px", xl: "1100px" }}
      my="20px"
    >
      <Heading as="h4" fontSize="19px" fontWeight="normal">
        {dateToday}
      </Heading>
    </Container>
  );
};

export default DateToday;
