import GoalFlashText from "./GoalFlashText";
import { ScoreItem, Rcard } from "../types/types";
import {
  Flex,
  Text,
  Box,
  Grid,
  GridItem,
  useMediaQuery,
  useColorModeValue,
} from "@chakra-ui/react";

type ScoreItemProps = {
  item: ScoreItem;
  index: number;
  oldData: {
    [key: string]: ScoreItem;
  };
};

function ScoreItem({ item, index, oldData }: ScoreItemProps) {
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  const oddBackground = useColorModeValue(
    "light.score.bgOdd",
    "dark.score.bgOdd"
  );
  const evenBackground = useColorModeValue(
    "light.score.bgEven",
    "dark.score.bgEven"
  );
  const liveColor = useColorModeValue(
    "light.score.liveText",
    "dark.score.liveText"
  );
  const completeColor = useColorModeValue(
    "light.score.completeText",
    "dark.score.completeText"
  );

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

  const hasChanged = (
    item: ScoreItem,
    goalAttr: keyof ScoreItem["score"],
    oldData: ScoreItemProps["oldData"]
  ) => {
    if (item && item.id !== undefined) {
      return (
        item.isLive &&
        oldData[item.id] &&
        oldData[item.id].score[goalAttr] !== item.score[goalAttr]
      );
    }
  };

  return (
    <Box key={item.id}>
      {isLargerThan880 ? (
        <Grid
          templateColumns="1fr 1fr 6fr 2fr 6fr 1fr 1fr"
          gap={2}
          backgroundColor={index % 2 === 0 ? evenBackground : oddBackground}
        >
          <GridItem
            display="flex"
            alignItems="center"
            w="100%"
            p="10px"
            textAlign="center"
          >
            <Text
              color={item.isLive ? liveColor : completeColor}
              fontWeight={item.isLive ? "bold" : "normal"}
            >
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
            {item.rcards &&
              item.rcards.length > 0 &&
              item.rcards.some((item: Rcard) => item.team == 1) && (
                <Box h="14px" w="9px" background="#f33e3e" />
              )}
          </GridItem>
          <GridItem
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            p="10px"
          >
            <GoalFlashText
              hasChanged={hasChanged(item, "goal1", oldData)}
              type="goalTxt"
              text="GOAL"
            />
            <Text>{item?.teams?.hometeam.name}</Text>
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
              <GoalFlashText
                hasChanged={hasChanged(item, "goal1", oldData)}
                text={item.score.goal1}
                type="goalNum"
              />
              <Text> - </Text>
              <GoalFlashText
                hasChanged={hasChanged(item, "goal2", oldData)}
                text={item.score.goal2}
                type="goalNum"
              />
            </Box>
          </GridItem>
          <GridItem
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            p="10px"
            textAlign="left"
          >
            <Text>{item?.teams?.awayteam.name}</Text>
            <GoalFlashText
              hasChanged={hasChanged(item, "goal2", oldData)}
              text="GOAL"
              type="goalTxt"
            />
          </GridItem>
          <GridItem
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            w="100%"
            p="10px"
            textAlign="center"
          >
            {item.rcards &&
              item.rcards.length > 0 &&
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
          backgroundColor={index % 2 === 0 ? evenBackground : oddBackground}
        >
          <GridItem
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="50px"
            p="10px"
            textAlign="center"
          >
            <Text
              color={item.isLive ? liveColor : completeColor}
              fontWeight={item.isLive ? "bold" : "normal"}
            >
              {status(item)}
            </Text>
          </GridItem>
          <GridItem w="100%" p="10px">
            <Flex justify="space-between">
              <Flex alignItems="center">
                <Flex w="20px">
                  {item.rcards &&
                    item.rcards.length > 0 &&
                    item.rcards.some((item) => item.team == 1) && (
                      <Box h="7px" w="5px" background="#f33e3e" />
                    )}
                </Flex>
                <Text>{item?.teams?.hometeam.name}</Text>
              </Flex>
              <Flex justify="space-between" alignItems="center">
                <Box>
                  <GoalFlashText
                    hasChanged={hasChanged(item, "goal1", oldData)}
                    text="GOAL"
                    type="goalTxt"
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  w="20px"
                  mx="10px"
                  fontSize="16px"
                  color="#FFFDD0"
                >
                  <GoalFlashText
                    hasChanged={hasChanged(item, "goal1", oldData)}
                    text={item.score.goal1}
                    type="goalNum"
                  />
                </Box>
              </Flex>
            </Flex>
            <Flex justify="space-between">
              <Flex alignItems="center">
                <Flex w="20px">
                  {item.rcards &&
                    item.rcards.length > 0 &&
                    item.rcards.some((item) => item.team == 2) && (
                      <Box h="7px" w="5px" background="#f33e3e" />
                    )}
                </Flex>
                <Text>{item?.teams?.awayteam.name}</Text>
              </Flex>
              <Flex justify="space-between" alignItems="center">
                <Box>
                  <GoalFlashText
                    hasChanged={hasChanged(item, "goal2", oldData)}
                    text="GOAL"
                    type="goalTxt"
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  w="20px"
                  mx="10px"
                  fontSize="16px"
                  color="#FFFDD0"
                >
                  <GoalFlashText
                    hasChanged={hasChanged(item, "goal2", oldData)}
                    text={item.score.goal2}
                    type="goalNum"
                  />
                </Box>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
}

export default ScoreItem;
