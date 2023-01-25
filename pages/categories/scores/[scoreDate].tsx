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
    { refreshInterval: 5000 }
  );

  console.log(data);

  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }} mt="70px">
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          {dates.map((item) => (
            <Tab
              key={item}
              onClick={(e) => {
                router.push(`/categories/scores/${item}`);
              }}
            >
              {format(new Date(item), "dd-MM")}
            </Tab>
          ))}
        </TabList>
      </Tabs>
      {!isLoading &&
        !error &&
        data.map((item) => (
          <Flex flexDirection="column" key={item.id} border="1px solid white">
            <Box>
              {item.teams.hometeam.name} -{item.score.goal1}
            </Box>{" "}
            <Box>
              {item.teams.awayteam.name} -{item.score.goal2}
            </Box>
          </Flex>
        ))}
    </Container>
  );
}

export default Scores;
