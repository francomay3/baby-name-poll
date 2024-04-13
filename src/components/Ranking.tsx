import { Data } from "../hooks/useDatabase";
import { Stack } from "./Layout";
import Podio from "./Podio";
import { Titulo } from "./Texto";

const Ranking = ({ data }: { data: Data }) => {
  if (!data) return null;
  return (
    <Stack>
      <Titulo>Por ahora, estos son los nombres más gustados:</Titulo>
      <Podio data={data} />
    </Stack>
  );
};

export default Ranking;
