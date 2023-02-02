import { useState } from "react";
import useSWR from "swr";
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
} from "@chakra-ui/react";
import { Box, Tab, Tabs, TabList, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

function Scores() {
  const [oldData, setOldData] = useState({});
  const dates = scoreDates();
  const router = useRouter();

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

  const { data, error, isLoading } = useSWR(
    `/api/scores/?date=${router.query.scoreDate}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshInterval: 2000,
    }
  );

  // data && console.log(data);
  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }} mt="90px">
      <Tabs variant="soft-rounded" marginBottom="20px">
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
      {data && (
        <Accordion
          allowMultiple
          defaultIndex={Object.keys(data).map((item, idx) => idx)}
        >
          {!isLoading &&
            data &&
            Object.entries(data).map((item) => (
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
