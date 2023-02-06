import { useState } from "react";
import showNotification from "../../../helpers/showNotification";
import useSWR from "swr";
import { el } from "date-fns/locale";
import { dateString } from "../../../helpers/scoreDates";
import filterLiveGames from "../../../helpers/filterLiveGames";
import { scoresAccordion } from "../../../helpers/scoresAccordion";
import scoreDates from "../../../helpers/scoreDates";
import ScoreItem from "../../../components/ScoreItem";
import { ScoreItem as ScoreItemType } from "../../../types/types";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";
import format from "date-fns/format";
import {
  Box,
  Tab,
  Tabs,
  TabList,
  Switch,
  Text,
  HStack,
  Container,
} from "@chakra-ui/react";

function Scores() {
  const [oldData, setOldData] = useState({});
  const dates = scoreDates();
  const router = useRouter();

  const fetcher = (url: string) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const filteredGames = data.filter((item: ScoreItemType) => item.isLive);
        let liveObj: ScoreItem = {};
        filteredGames.forEach((item: ScoreItemType) => {
          liveObj[item.id] = item;
        });
        setOldData(liveObj);
        return scoresAccordion(data);
      });

  const isLive = router.query.live === "true" ? true : false;
  const scoreDate = router.query.scoreDate || dateString(new Date(), true);

  const { data, error, isLoading } = useSWR<{
    [key: string]: Array<ScoreItemType>;
  }>(`/api/scores/?date=${scoreDate}`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    refreshInterval: 2000,
  });

  if (error) {
    showNotification("Κάτι πήγε στραβά, δοκιμάστε αργότερα", "error", {
      theme: "colored",
    });
  }

  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }} mt="90px">
      {router.query.scoreDate && (
        <>
          <Tabs
            variant="soft-rounded"
            marginBottom="20px"
            index={dates.indexOf(router.query.scoreDate as string)}
          >
            <TabList>
              {dates.map((item) => (
                <Tab
                  padding={{ base: "5px 10px", md: "8px 16px" }}
                  fontSize={{ base: "14px", md: "16px" }}
                  marginRight="5px"
                  _selected={{ background: "blue.400", color: "white" }}
                  key={item}
                  onClick={() => {
                    router.push(`/categories/scores/${item}?live=${isLive}`);
                  }}
                >
                  {format(new Date(item), "d MMM", { locale: el })}
                </Tab>
              ))}
            </TabList>
          </Tabs>
          <HStack marginBottom="20px" ml="16px">
            <Text>Μόνο LIVE</Text>
            <Switch
              size="lg"
              colorScheme="orange"
              isChecked={isLive}
              onChange={() =>
                router.push(
                  `/categories/scores/${router.query.scoreDate}?live=${!isLive}`
                )
              }
            />
          </HStack>
        </>
      )}

      {!isLoading && data && !isLive && (
        <Box>
          {Object.entries(data).map((item) => (
            <Box key={item[0]}>
              <Box textAlign="left" p="10px">
                {item[0]}
              </Box>

              <Box pb={4}>
                {item[1].map((el: ScoreItemType, idx: number) => (
                  <ScoreItem
                    key={el.id}
                    item={el}
                    index={idx}
                    oldData={oldData}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
      {!isLoading && data && isLive && (
        <Box>
          {Object.entries(filterLiveGames(data)).map((item) => (
            <Box key={item[0]}>
              <Box textAlign="left" p="10px">
                {item[0]}
              </Box>
              <Box pb={4}>
                {item[1].map((el, idx) => (
                  <ScoreItem
                    key={el.id}
                    item={el}
                    index={idx}
                    oldData={oldData}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <button onClick={() => showNotification("TEST notification", "info")}>
        CLICK
      </button>
      <Box my="20px">{isLoading && <Loader />}</Box>
    </Container>
  );
}

export default Scores;
