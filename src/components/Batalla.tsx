import { useState } from "react";
import { Data, Names, SetNewEloRating } from "../models";
import { Inline, Stack } from "./Layout";

function calculateNewRating(
  rating: number,
  opponentRating: number,
  score: number
): number {
  const kFactor = 32;
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - rating) / 400));
  return Math.floor(rating + kFactor * (score - expectedScore));
}

const getRandomFighters = (rawNames: Names) => {
  while (true) {
    const names = Object.entries(rawNames)
      .map(([name, nameData]) => {
        const elo = nameData.elo || 1500;
        return [name, elo];
      })
      .sort((a: any, b: any) => b[1] - a[1]);
    // replace ],[ with \n
    console.log(JSON.stringify(names).replace(/],\[/g, "\n"));

    const index1 = Math.floor(Math.random() * names.length);
    const index2 = Math.floor(Math.random() * names.length);
    if (index1 === index2) continue;
    const name1 = names[index1];
    const name2 = names[index2];
    return [name1, name2];
  }
};

const Batalla = ({
  data,
  setNewEloRating,
}: {
  data: Data;
  setNewEloRating: SetNewEloRating;
}) => {
  if (!data) return <div>mmm... where is the data?</div>;
  const [fighters, setFighters] = useState<(string | number)[][]>(
    getRandomFighters(data.names)
  );

  const [fighter0, fighter1] = fighters;
  const [name0, rating0] = fighter0;
  const [name1, rating1] = fighter1;

  const saveResult = (winner: number) => {
    const newRating0 = calculateNewRating(
      rating0 as number,
      rating1 as number,
      winner === 0 ? 1 : 0
    );
    const newRating1 = calculateNewRating(
      rating1 as number,
      rating0 as number,
      winner === 1 ? 1 : 0
    );
    setNewEloRating(name0 as string, newRating0);
    setNewEloRating(name1 as string, newRating1);

    const newFighters = getRandomFighters(data.names);
    setFighters(newFighters);
  };

  return (
    <Stack style={{ alignItems: "stretch" }}>
      <Inline>
        <span
          onClick={() => saveResult(0)}
          style={{ flex: 1, textAlign: "end" }}
        >
          {name0}
        </span>
        <span>🥊</span>
        <span onClick={() => saveResult(1)} style={{ flex: 1 }}>
          {name1}
        </span>
      </Inline>
      <span
        onClick={() => setFighters(getRandomFighters(data.names))}
        style={{ textAlign: "center" }}
      >
        NO ME PUEDO DECIDIR!
      </span>
    </Stack>
  );
};

export default Batalla;
