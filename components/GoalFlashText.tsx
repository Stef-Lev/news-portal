import React, { useState, useEffect } from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";

interface GoalFlashTextProps {
  text: string;
  hasChanged?: boolean;
  type: "goalTxt" | "goalNum";
}

const GoalFlashText: React.FC<GoalFlashTextProps> = ({
  text,
  hasChanged,
  type,
}) => {
  const [isFlashing, setIsFlashing] = useState(false);

  const color = useColorModeValue(
    "light.score.goalText",
    "dark.score.goalText"
  );

  useEffect(() => {
    if (hasChanged) {
      setIsFlashing(true);
      setTimeout(() => {
        setIsFlashing(false);
      }, 5000);
    }
  }, [hasChanged]);

  return (
    <>
      {type === "goalTxt" && (
        <Text
          color={color}
          position="relative"
          visibility={isFlashing ? "visible" : "hidden"}
          className={isFlashing ? "isFlashing" : ""}
        >
          GOAL
        </Text>
      )}
      {type === "goalNum" && (
        <Text
          color={color}
          position="relative"
          className={isFlashing ? "isFlashing" : ""}
        >
          {text}
        </Text>
      )}
    </>
  );
};

export default GoalFlashText;
