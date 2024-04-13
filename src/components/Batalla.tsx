import { useEffect, useRef, useState } from "react";
import { Inline, Stack } from "./Layout";
import { topNombres } from "../constants";
import useDatabase, { Data } from "../hooks/useDatabase";
import useAuth from "../hooks/useAuth";
import styled from "styled-components";
import Progress from "./Progress";
import { Fireworks } from "fireworks-js";
import Podio from "./Podio";
import { Texto, Titulo } from "./Texto";
import VotosDelUsuario from "./VotosDelUsuario";

const FireworksCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Boton = styled.button`
  display: flex;
  justify-content: center;
  background-color: #e67e23;
  border: none;
  padding-block: 1rem;
  padding-inline: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 0.7rem;
  color: white;
  &:active {
    background-color: #e7964f;
  }
`;

const Gloves = styled(Texto)`
  font-size: 1.9rem;
  & > * {
    font-size: 1.9rem;
  }
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ProgressWrapper = styled.div`
  height: 1rem;
  width: 100%;
`;

const Buttons = styled(Inline)`
  gap: 2.2rem;
  width: 100%;
  justify-content: space-between;
  & > button {
    flex: 1;
  }
`;

function calculateNewRating(
  rating: number,
  opponentRating: number,
  win: boolean | "tie"
): number {
  const winVariable = win === "tie" ? 0.5 : win ? 1 : 0;
  const k = 32;
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - rating) / 400));
  return rating + k * (winVariable - expectedScore);
}

const getPairs = (arr: string[]) => {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs
    .map((pair) => pair.sort(() => Math.random() - 0.5))
    .sort(() => Math.random() - 0.5);
};

const pairs = getPairs(topNombres);

const Batalla = ({ data }: { data: Data }) => {
  const { userId, RedirectToLogin } = useAuth();
  const [index, setIndex] = useState(0);
  const [quiereVolverAVotar, setQuiereVolverAVotar] = useState(false);
  const { setNewRatings } = useDatabase();
  const container = useRef<HTMLCanvasElement>(null);
  const finished = pairs.length === index;
  useEffect(() => {
    if (userId && finished && container.current) {
      const newObj: { [key: string]: number } = {};
      eloRatings.forEach(([name, rating]) => {
        newObj[name] = rating;
      });
      setNewRatings(userId, newObj);

      const fireworks = new Fireworks(container.current);
      fireworks.start();
    }
  }, [finished, container.current, userId]);
  const [eloRatings, setEloRatings] = useState<[string, number][]>(
    topNombres.map((name) => [name, 1000])
  );

  useEffect(() => {
    if (!data || !userId) return;
    const userRatings = data.users[userId]?.ratings;
    if (!userRatings) return;
    setEloRatings(Object.entries(userRatings));
  }, [userId, data]);

  const handleEloRating = (name: string, newScore: number) => {
    setEloRatings((ratings) =>
      ratings.map(([n, r]) => {
        if (n === name) {
          return [n, newScore];
        }
        return [n, r];
      })
    );
  };

  if (!userId) {
    return <RedirectToLogin />;
  }

  const userCannotVote = (data: Data, userId: string) => {
    const yaVoto = data?.users[userId]?.ratings ? true : false;
    return yaVoto && !quiereVolverAVotar;
  };

  if (finished) {
    return (
      <Stack style={{ paddingTop: "1rem" }}>
        <FireworksCanvas
          ref={container}
          style={{ pointerEvents: "none" }}
        ></FireworksCanvas>
        <Titulo>¡Terminaste!</Titulo>
        <Texto>gracias por participar, gato</Texto>
        <Texto>Estos son tus nombres favoritos:</Texto>
        <VotosDelUsuario userId={userId} eloRatings={eloRatings} />
        <Texto>
          y así queda el ranking general, con los votos de todos los usuarios:
        </Texto>
        <Podio data={data} />
      </Stack>
    );
  }

  if (userCannotVote(data, userId)) {
    return (
      <Stack>
        <Titulo>Ehh.. vos ya votaste, gato</Titulo>
        <Texto>Así habian quedado tus votos, por si te olvidaste:</Texto>
        <Stack>
          <VotosDelUsuario data={data} userId={userId} />
          <Boton
            onClick={() => setQuiereVolverAVotar(true)}
            style={{ backgroundColor: "#6a6add" }}
          >
            Quiero volver a votar 😼
          </Boton>
        </Stack>
      </Stack>
    );
  }

  const nombre1 = pairs[index][0];
  const score1 = eloRatings.find(([name]) => name === nombre1)?.[1] ?? 1000;

  const nombre2 = pairs[index][1];
  const score2 = eloRatings.find(([name]) => name === nombre2)?.[1] ?? 1000;

  const handleWinner = (winner: 0 | 1 | "tie") => {
    const nombre1nuevoScore = calculateNewRating(
      score1,
      score2,
      winner === "tie" ? winner : winner === 0
    );
    const nombre2nuevoScore = calculateNewRating(
      score2,
      score1,
      winner === "tie" ? winner : winner === 1
    );
    handleEloRating(nombre1, nombre1nuevoScore);
    handleEloRating(nombre2, nombre2nuevoScore);
    setIndex(index + 1);
  };

  const progreso = Math.floor((index / pairs.length) * 100);

  return (
    <Stack style={{ paddingTop: "1rem" }}>
      <Titulo>Tocá el nombre que mas te guste de los dos</Titulo>
      <Buttons>
        <Boton onClick={() => handleWinner(0)}>{nombre1}</Boton>
        <Gloves>
          <Texto
            className="izq"
            style={{
              display: "inline-block",
              transform: "scaleX(-1)",
            }}
          >
            🥊
          </Texto>
          🥊
        </Gloves>
        <Boton onClick={() => handleWinner(1)}>{nombre2}</Boton>
      </Buttons>
      <Boton
        style={{ backgroundColor: "#6a6add" }}
        onClick={() => handleWinner("tie")}
      >
        Empate 🥱
      </Boton>
      <ProgressWrapper>
        <Texto>Progreso: {progreso}%</Texto>
        <Progress max={pairs.length} value={index} />
      </ProgressWrapper>
    </Stack>
  );
};

export default Batalla;
