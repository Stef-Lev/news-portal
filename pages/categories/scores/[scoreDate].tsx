import { useEffect, useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";
import scoreDates from "../../../helpers/scoreDates";
import ScoreItem from "../../../components/ScoreItem";
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
  Show,
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

  console.log(data);
  // console.log(router.query.scoreDate);

  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }} mt="90px">
      <Tabs variant="soft-rounded">
        <TabList>
          {dates.map((item) => (
            <Tab
              padding={{ base: "5px 10px", md: "8px 16px" }}
              fontSize={{ base: "14px", md: "16px" }}
              marginRight="5px"
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
          data.map((item) => <ScoreItem key={item.id} item={item} />)}
      </Box>
    </Container>
  );
}

export default Scores;
