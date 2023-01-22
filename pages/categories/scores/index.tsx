import React from "react";
import scoreDates from "../../../helpers/scoreDates";

function ScoresIndex() {
  return <div>index</div>;
}

export default ScoresIndex;

export async function getServerSideProps() {
  const today = scoreDates()[0];

  return {
    redirect: {
      permanent: false,
      destination: `/categories/scores/${today}`,
    },
    props: {},
  };
}
