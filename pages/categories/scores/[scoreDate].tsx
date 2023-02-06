import { useState, useEffect } from "react";
import useSWR from "swr";
import { el } from "date-fns/locale";
import { dateString } from "../../../helpers/scoreDates";
import filterLiveGames from "../../../helpers/filterLiveGames";
import { scoresAccordion } from "../../../helpers/scoresAccordion";
import scoreDates from "../../../helpers/scoreDates";
import ScoreItem from "../../../components/ScoreItem";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";
import format from "date-fns/format";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Switch,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Box, Tab, Tabs, TabList, Container } from "@chakra-ui/react";

function Scores() {
  const [oldData, setOldData] = useState({});
  const [liveOnly, setLiveOnly] = useState(false);
  const dates = scoreDates();
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.scoreDate, dates);
  }, []);

  const fetcher = (url: string) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const filteredGames = data.filter((item) => item.isLive);
        let liveObj = {};
        filteredGames.forEach((item) => {
          liveObj[item.id] = item;
        });
        setOldData(liveObj);
        return scoresAccordion(data);
      });

  const scoreDate = router.query.scoreDate || dateString(new Date(), true);

  const { data, error, isLoading } = useSWR(
    `/api/scores/?date=${scoreDate}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshInterval: 2000,
    }
  );

  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }} mt="90px">
      {router.query.scoreDate && (
        <>
          <Tabs
            variant="soft-rounded"
            marginBottom="20px"
            index={dates.indexOf(router.query.scoreDate) || -1}
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
                    router.push(`/categories/scores/${item}`);
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
              isChecked={liveOnly}
              onChange={() => setLiveOnly((prev) => !prev)}
            />
          </HStack>
        </>
      )}

      {!isLoading && data && !liveOnly && (
        <Accordion
          allowMultiple
          defaultIndex={Object.keys(data).map((item, idx) => idx)}
        >
          {Object.entries(data).map((item) => (
            <AccordionItem key={item[0]}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {item[0]}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {item[1].map((el, idx) => (
                  <ScoreItem
                    key={el.id}
                    item={el}
                    index={idx}
                    oldData={oldData}
                  />
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      {!isLoading && data && liveOnly && (
        <Accordion
          allowMultiple
          defaultIndex={Object.keys(filterLiveGames(data)).map(
            (item, idx) => idx
          )}
        >
          {Object.entries(filterLiveGames(data)).map((item) => (
            <AccordionItem key={item[0]}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {item[0]}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {item[1].map((el, idx) => (
                  <ScoreItem
                    key={el.id}
                    item={el}
                    index={idx}
                    oldData={oldData}
                  />
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Box my="20px">{isLoading && <Loader />}</Box>
    </Container>
  );
}

export default Scores;
