import { useEffect } from "react";
import { LogoutAction } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { User } from "../models";
import { Space, Button } from "antd";
import { routes } from "../constants";
import { Texto } from "./Texto";

const LabelAndText = ({ label, text }: { label: string; text: string }) => (
  <Texto>
    <Texto>{label}:</Texto> {text}
  </Texto>
);

const UserDashboard = ({
  user,
  logout,
  userId,
}: {
  userId: string | null;
  user: User | null;
  logout: LogoutAction;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(routes.login.path);
    }
  }, [user, navigate]);

  return (
    <Space direction="vertical">
      <LabelAndText label="Usuario" text={userId || ""} />
      <LabelAndText label="Color" text={user?.color || "sin color"} />
      <LabelAndText label="Emoji" text="(funcionalidad en desarrollo 😎)" />
      {/* TODO: Add emoji to user */}
      <Space style={{ flexWrap: "wrap" }}>
        <Button type="primary" onClick={() => navigate(routes.batalla.path)}>
          Ir a la batalla de nombres 🥊
        </Button>
        <Button
          type="primary"
          onClick={logout}
          style={{
            background: "#ff930e",
          }}
        >
          Cerrar sesion 👋🏻
        </Button>
      </Space>
    </Space>
  );
};

export default UserDashboard;
