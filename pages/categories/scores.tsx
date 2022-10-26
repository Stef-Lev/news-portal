import { getScores } from "../../helpers/fetchData";

function Scores({ scores }) {
  return <div>scores</div>;
}

export default Scores;

export async function getServerSideProps(ctx) {
  const allScores = await getScores();

  return {
    props: { scores: allScores },
  };
}
