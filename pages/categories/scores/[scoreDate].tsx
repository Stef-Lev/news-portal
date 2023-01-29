import useSWR from "swr";
import scoreDates from "../../../helpers/scoreDates";
import ScoreItem from "../../../components/ScoreItem";
import { ScoreItem as ScoreItemType } from "../../../types/types";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";
import format from "date-fns/format";

import { Box, Tab, Tabs, TabList, Container } from "@chakra-ui/react";

function Scores() {
  const dates = scoreDates();
  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data, error, isLoading } = useSWR(
    `/api/scores/?date=${router.query.scoreDate}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshInterval: 2000,
    }
  );

  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }} mt="90px">
      <Tabs variant="soft-rounded">
        <TabList>
          {dates.map((item) => (
            <Tab
              padding={{ base: "5px 10px", md: "8px 16px" }}
              fontSize={{ base: "14px", md: "16px" }}
              marginRight="5px"
              _selected={{ background: "blue.400", color: "white" }}
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
        {isLoading && <Loader />}
        {!isLoading &&
          !error &&
          data.map((item: ScoreItemType, index: number) => (
            <ScoreItem key={item.id} item={item} index={index} />
          ))}
      </Box>
    </Container>
  );
}

export default Scores;
