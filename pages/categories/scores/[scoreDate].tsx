import { useState } from "react";
import { useRouter } from "next/router";
import ScoreItem from "../../../components/ScoreItem";
import Loader from "../../../components/Loader";
import { League } from "../../../types/types";
import { ScoreItem as ScoreItemType } from "../../../types/types";
import { dateString } from "../../../helpers/scoreDates";
import filterLiveGames from "../../../helpers/filterLiveGames";
import { scoresAccordion } from "../../../helpers/scoresAccordion";
import scoreDates from "../../../helpers/scoreDates";
import showNotification from "../../../helpers/showNotification";
import useSWR from "swr";
import { el } from "date-fns/locale";
import format from "date-fns/format";
import {
  Box,
  Tab,
  Tabs,
  TabList,
  Switch,
  Text,
  Flex,
  Container,
  Select,
} from "@chakra-ui/react";

function Scores() {
  const [oldData, setOldData] = useState({});
  const [selectedLeague, setSelectedLeague] = useState("ΟΛΑ");
  const dates = scoreDates();
  const router = useRouter();

  const fetcher = (url: string) =>
    fetch(url)
      .then((r) => r.json())
      .then((data: ScoreItemType[]) => {
        const filteredGames = data.filter((item: ScoreItemType) => item.isLive);
        let liveObj: { [key: string]: ScoreItemType } = {};
        if (filteredGames.length > 0) {
          filteredGames.forEach((item: ScoreItemType) => {
            liveObj[item.id] = item;
          });
        }
        setOldData(liveObj);
        return scoresAccordion(data);
      });

  const isLive = router.query.live === "true" ? true : false;
  const scoreDate = router.query.scoreDate || dateString(new Date(), true);

  const { data, error, isLoading } = useSWR<League>(
    `/api/scores/?date=${scoreDate}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshInterval: 2000,
    }
  );

  if (error) {
    showNotification("Κάτι πήγε στραβά, δοκιμάστε αργότερα", "error", {
      theme: "colored",
    });
  }

  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }} mt="90px">
      {router.query.scoreDate && data && (
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
                    setSelectedLeague("ΟΛΑ");
                    router.push(`/categories/scores/${item}?live=${isLive}`);
                  }}
                >
                  {format(new Date(item), "d MMM", { locale: el })}
                </Tab>
              ))}
            </TabList>
          </Tabs>
          <Flex
            marginBottom="20px"
            alignItems={{ base: "flex-start", md: "center" }}
            gap={2}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Flex alignItems="center" gap={2}>
              <Text width={{ base: "110px", md: "max-content" }}>
                ΠΡΩΤΑΘΛΗΜΑ
              </Text>
              <Box w="200px" mr="10px" bg="#0d181b">
                <Select
                  size="md"
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                >
                  <option value="ΟΛΑ">ΟΛΑ</option>
                  {Object.keys(data).map((item, index) => (
                    <option key={index + 1} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </Box>
            </Flex>
            <Flex alignItems="center" gap={2} h="40px">
              <Text width={{ base: "110px", md: "max-content" }}>
                Μόνο LIVE
              </Text>
              <Switch
                size="lg"
                colorScheme="orange"
                isChecked={isLive}
                onChange={() =>
                  router.push(
                    `/categories/scores/${
                      router.query.scoreDate
                    }?live=${!isLive}`
                  )
                }
              />
            </Flex>
          </Flex>
        </>
      )}

      {!isLoading &&
        data &&
        !isLive &&
        (!selectedLeague || selectedLeague === "ΟΛΑ") && (
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
      {!isLoading &&
        data &&
        !isLive &&
        selectedLeague &&
        selectedLeague !== "ΟΛΑ" && (
          <Box>
            {Object.entries(data)
              .filter((item) => item[0] === selectedLeague)
              .map((item) => (
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
      {!isLoading &&
        data &&
        isLive &&
        (!selectedLeague || selectedLeague === "ΟΛΑ") && (
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

      {!isLoading &&
        data &&
        isLive &&
        selectedLeague &&
        selectedLeague !== "ΟΛΑ" && (
          <Box>
            {Object.entries(filterLiveGames(data))
              .filter((item) => item[0] === selectedLeague)
              .map((item) => (
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
      <Box my="20px">{isLoading && <Loader />}</Box>
    </Container>
  );
}

export default Scores;
