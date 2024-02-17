import nata from "../assets/nata.jpeg";
import { Image, Typography, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
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
      <Button
        type="primary"
        size="large"
        onClick={() => navigate("/baby-name-poll/nombres")}
      >
        Votar nombres 📝
      </Button>
      <Button
        type="primary"
        size="large"
        onClick={() => navigate("/baby-name-poll/ranking")}
      >
        Ver ranking 🏆
      </Button>
    </Space>
  );
};

export default Main;
