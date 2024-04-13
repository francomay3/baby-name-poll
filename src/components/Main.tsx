import nata from "../assets/nata.jpeg";
import { Image, Space, Button } from "antd";
import { Link } from "react-router-dom";
import { routes } from "../constants";
import { Texto, Titulo } from "./Texto";

const Main = () => {
  return (
    <Space direction="vertical" align="center">
      <Titulo>Hola! 👋🏻</Titulo>
      <Texto>
        Este es un proyecto de consulta popular para la eleccion del nombre del
        nuevo <s>hamster</s> bebe de nata (y franco). 🍼
      </Texto>

      <Image
        style={{
          borderRadius: "10px",
        }}
        width={300}
        src={nata}
        preview={false}
      />
      <Link to={routes.batalla.path}>
        <Button type="primary" size="large">
          Ir a la batalla de nombres 🥊
        </Button>
      </Link>
      <Link to={routes.ranking.path}>
        <Button type="primary" size="large">
          Ver ranking 🏆
        </Button>
      </Link>
    </Space>
  );
};

export default Main;
