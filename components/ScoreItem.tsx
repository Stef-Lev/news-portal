import React from "react";
import {
  Flex,
  Text,
  Box,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import { ScoreItem, Rcard } from "../types/types";

type ScoreItemProps = {
  item: ScoreItem;
  index: number;
};

function ScoreItem({ item, index }: ScoreItemProps) {
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  const status = (game: ScoreItem) => {
    if (game.isHT) {
      return "ΗΜ";
    }
    if (game.isFinished) {
      return "ΤΕΛ";
    }
    if (game.isLive) {
      return `${game.minute}'`;
    }
    return `${game.time}`;
  };

  return (
    <Box key={item.id}>
      {isLargerThan880 ? (
        <Grid
          templateColumns="1fr 1fr 6fr 2fr 6fr 1fr 1fr"
          gap={2}
          backgroundColor={index % 2 === 0 ? "#16262b" : "#0d181b"}
        >
          <GridItem
            display="flex"
            alignItems="center"
            w="100%"
            p="10px"
            textAlign="center"
          >
            <Text color={item.isLive ? "#73c3ce" : "#fff"}>{status(item)}</Text>
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
              item.rcards.some((item: Rcard) => item.team == 1) && (
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
      ) : (
        <Grid
          templateColumns="1fr 9fr"
          gap={2}
          fontSize="14px"
          backgroundColor={index % 2 === 0 ? "#16262b" : "#0d181b"}
        >
          <GridItem
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="50px"
            p="10px"
            textAlign="center"
          >
            <Text color={item.isLive ? "#73c3ce" : "#fff"}>{status(item)}</Text>
          </GridItem>
          <GridItem w="100%" p="10px">
            <Flex justify="space-between">
              <Flex alignItems="center">
                <Flex w="20px">
                  {item.rcards.length > 0 &&
                    item.rcards.some((item) => item.team == 1) && (
                      <Box h="7px" w="5px" background="#f33e3e" />
                    )}
                </Flex>
                <Box>{item.teams.hometeam.name}</Box>
              </Flex>
              <Box
                display="flex"
                justifyContent="center"
                w="20px"
                mx="20px"
                fontSize="16px"
                color="#FFFDD0"
              >
                {item.score.goal1}
              </Box>
            </Flex>
            <Flex justify="space-between">
              <Flex alignItems="center">
                <Flex w="20px">
                  {item.rcards.length > 0 &&
                    item.rcards.some((item) => item.team == 2) && (
                      <Box h="7px" w="5px" background="#f33e3e" />
                    )}
                </Flex>
                <Box>{item.teams.awayteam.name}</Box>
              </Flex>
              <Box
                display="flex"
                justifyContent="center"
                w="20px"
                mx="20px"
                fontSize="16px"
                color="#FFFDD0"
              >
                {item.score.goal2}
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
}

export default ScoreItem;
