import { useEffect, useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";
import scoreDates from "../../../helpers/scoreDates";
import { useRouter } from "next/router";
import format from "date-fns/format";

import {
  Flex,
  Text,
  Box,
  Grid,
  GridItem,
  Tab,
  Tabs,
  TabList,
  Container,
} from "@chakra-ui/react";

function Scores() {
  const dates = scoreDates();
  const router = useRouter();

  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, error, isLoading } = useSWR(
    `/api/scores/?date=${router.query.scoreDate}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshInterval: 2000,
    }
  );

  const status = (item) => {
    if (item.isHT) {
      return "ΗΜ";
    }
    if (item.isFinished) {
      return "ΤΕΛ";
    }
    if (item.isLive) {
      return `${item.minute}'`;
    }
    return `${item.time}`;
  };

  console.log(data);
  console.log(router.query.scoreDate);

  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }} mt="70px">
      <Tabs variant="soft-rounded">
        <TabList>
          {dates.map((item) => (
            <Tab
              _selected={{ background: "teal", color: "white" }}
              key={item}
              onClick={() => {
                router.push(`/categories/scores/${item}`);
              }}
            >
              {format(new Date(item), "dd-MM")}
            </Tab>
          ))}
        </TabList>
      </Tabs>
      <Box my="20px">
        {!isLoading &&
          !error &&
          data.map((item) => (
            <Grid
              templateColumns="1fr 1fr 6fr 2fr 6fr 1fr 1fr"
              gap={2}
              key={item.id}
              backgroundColor="#0d181b"
              _odd={{ backgroundColor: "#16262b" }}
            >
              <GridItem
                display="flex"
                alignItems="center"
                w="100%"
                p="10px"
                textAlign="center"
              >
                <Text color={item.isLive ? "#73c3ce" : "#fff"}>
                  {status(item)}
                </Text>
              </GridItem>
              <GridItem
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                w="100%"
                p="10px"
                textAlign="center"
              >
                {item.rcards.length > 0 &&
                  item.rcards.some((item) => item.team == 1) && (
                    <Box h="14px" w="9px" background="#f33e3e" />
                  )}
              </GridItem>
              <GridItem
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                w="100%"
                p="10px"
              >
                {item.teams.hometeam.name}
              </GridItem>
              <GridItem
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100%"
                p="10px"
                fontSize="24px"
              >
                <Box display="flex" gap="8px">
                  <Text color="#FFFDD0">{item.score.goal1}</Text>
                  <Text> - </Text>
                  <Text color="#FFFDD0">{item.score.goal2}</Text>
                </Box>
              </GridItem>
              <GridItem
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                w="100%"
                p="10px"
                textAlign="left"
              >
                {item.teams.awayteam.name}
              </GridItem>
              <GridItem
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                w="100%"
                p="10px"
                textAlign="center"
              >
                {item.rcards.length > 0 &&
                  item.rcards.some((item) => item.team == 2) && (
                    <Box h="14px" w="9px" background="#f33e3e" />
                  )}
              </GridItem>
              <GridItem
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                w="100%"
                p="10px"
                textAlign="center"
              />
            </Grid>
          ))}
      </Box>
    </Container>
  );
}

export default Scores;
