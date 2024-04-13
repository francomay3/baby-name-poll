import { Inline, Stack } from "./Layout";
import styled from "styled-components";
import { Texto } from "./Texto";
import { Data } from "../models";
import { getTotalScores } from "../constants";

const Columna1 = styled.div`
  height: 250px;
  background-color: #ffd700;
  width: 100%;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
`;

const Columna2 = styled.div`
  height: 180px;
  background-color: #c0c0c0;
  width: 100%;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
`;

const Columna3 = styled.div`
  height: 100px;
  background-color: #cd7f32;
  width: 100%;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
`;

const Wrapper = styled(Inline)`
  & > * {
    flex: 1;
  }
  align-items: flex-end;
  width: 100%;
  gap: 8px;
  margin-top: 2rem;
`;

const Podio = ({ data }: { data: Data }) => {
  const totalScores = getTotalScores(data);
  if (!totalScores) return null;
  const [nombre1, nombre2, nombre3] = totalScores
    .sort(([, a], [, b]) => {
      const scoreA = a as number;
      const scoreB = b as number;
      return scoreB - scoreA;
    })
    .map(([name]) => name);

  return (
    <Wrapper>
      <Stack>
        <Texto>
          <b>{nombre2}</b>
        </Texto>
        <Columna2 />
      </Stack>
      <Stack>
        <Texto>
          <b>{nombre1}</b>
        </Texto>
        <Columna1 />
      </Stack>
      <Stack>
        <Texto>
          <b>{nombre3}</b>
        </Texto>
        <Columna3 />
      </Stack>
    </Wrapper>
  );
};

export default Podio;
