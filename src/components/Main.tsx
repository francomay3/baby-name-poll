import nata from "../assets/nata.jpeg";
import { Image, Typography, Space, Button } from "antd";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <Space direction="vertical" align="center">
      <Typography.Title level={1}>Hola! 👋🏻</Typography.Title>
      <Typography.Text>
        Este es un proyecto de consulta popular para la eleccion del nombre del
        nuevo <s>hamster</s> bebe de nata (y franco). 🍼
      </Typography.Text>

      <Image
        style={{
          borderRadius: "10px",
        }}
        width={300}
        src={nata}
        preview={false}
      />
      <Link to="/baby-name-poll/nombres">
        <Button type="primary" size="large">
          Votar nombres 📝
        </Button>
      </Link>
      <Link to="/baby-name-poll/ranking">ranking</Link>
    </Space>
  );
};

export default Main;
