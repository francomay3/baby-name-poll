import { Data } from "../hooks/useDatabase";
import Podio from "./Podio";

const Ranking = ({ data }: { data: Data }) => {
  if (!data) return null;
  return <Podio data={data} />;
};

export default Ranking;
