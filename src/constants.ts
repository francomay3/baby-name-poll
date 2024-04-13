import { Scores } from "./hooks/useDatabase";
import { Data } from "./models";

export const routes = {
  home: {
    path: "/",
    name: "Inicio",
  },
  // vote: {
  //   path: "/nombres",
  //   name: "Puntuar Nombres 📝",
  // },
  ranking: {
    path: "/ranking",
    name: "Ranking 🏆",
  },
  user: {
    path: "/usuario",
    name: "Usuario 👨‍💻",
  },
  login: {
    path: "/login",
    name: "Login 🔑",
  },
  batalla: {
    path: "/batalla",
    name: "Batalla de Nombres 🥊",
  },
};

export const topNombres = [
  "Francisca",
  "Bianca",
  "Annika",
  "Elsa",
  "Giuliana",
  "Francesca",
  "Ana Lucía",
  "Lucía",
];

export const getTotalScores = (data: Data) => {
  if (!data) return null;
  const allScores = Object.values(data.users);
  const totalScores = allScores.reduce((totalScores, { ratings }) => {
    if (!ratings) return totalScores;
    Object.entries(ratings).forEach(([nombre, score]) => {
      totalScores[nombre] = (totalScores[nombre] || 0) + (score as number);
    });
    return totalScores;
  }, {} as Scores);

  const asArray = Object.entries(totalScores)
    .map(([nombre, score]) => {
      return [nombre, score];
    })
    .sort(
      ([_, scoreA], [__, scoreB]) => (scoreB as number) - (scoreA as number)
    );

  return asArray;
};
