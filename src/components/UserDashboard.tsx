import { useEffect } from "react";
import { LogoutAction } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { User } from "../models";
import { Typography, Space, Button } from "antd";

const LabelAndText = ({ label, text }: { label: string; text: string }) => (
  <Typography.Text>
    <Typography.Text strong>{label}:</Typography.Text> {text}
  </Typography.Text>
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
      navigate("/baby-name-poll/login");
    }
  }, [user, navigate]);

  return (
    <Space direction="vertical">
      <LabelAndText label="Usuario" text={userId || ""} />
      <LabelAndText label="Color" text={user?.color || "sin color"} />
      <LabelAndText label="Emoji" text="(funcionalidad en desarrollo 😎)" />
      {/* TODO: Add emoji to user */}
      <Space>
        <Button
          type="primary"
          onClick={() => navigate("/baby-name-poll/nombres")}
        >
          Seguir votando nombres 📝
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
