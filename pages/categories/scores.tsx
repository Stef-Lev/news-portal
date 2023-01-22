import { getScores } from "../../helpers/fetchData";
import { Image, Flex, Text, GridItem, Box } from "@chakra-ui/react";

function Scores({ scores }) {
  console.log(Object.values(scores));
  return (
    <Box mt="70px">
      {Object.values(scores)[0].map((item) => (
        <Flex flexDirection="column" key={item.id} border="1px solid white">
          <Box>
            {item.teams.home} -{item.score.goal1}
          </Box>{" "}
          <Box>
            {item.teams.away} -{item.score.goal2}
          </Box>
        </Flex>
      ))}
    </Box>
  );
}

export default Scores;

export async function getServerSideProps(ctx) {
  const allScores = await getScores();

  return {
    props: { scores: allScores },
  };
}
