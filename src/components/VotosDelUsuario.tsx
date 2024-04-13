import styled from "styled-components";
import { Data } from "../models";
import { Texto } from "./Texto";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 0.2rem;
`;

const VotosDelUsuario = ({
  data,
  userId,
  eloRatings,
}: {
  data?: Data;
  userId: string;
  eloRatings?: [string, number][];
}) => {
  if (!userId) return null;
  if (!data && !eloRatings) return null;
  const ratings =
    eloRatings ?? Object.entries(data?.users[userId]?.ratings ?? {});
  if (ratings.length === 0) return null;
  return (
    <Wrapper>
      {ratings
        .sort(([, a], [, b]) => b - a)
        .map(([name], index) => (
          <Texto key={name}>
            <b>
              {index + 1}. {name}
            </b>
          </Texto>
        ))}
    </Wrapper>
  );
};

export default VotosDelUsuario;
