import { LoginAction, SetNewUser, Users } from "../models";
import styled from "styled-components";
import Avatar from "./Avatar";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Button, Typography, Card } from "antd";
import { useState } from "react";
import NewUserModal from "./NewUserModal";
import useScrollTop from "../hooks/useScrollTop";
import { useNavigate } from "react-router-dom";

const UserList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  align-items: stretch;
`;

const AvatarAndName = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Login = ({
  login,
  users,
  setNewUser,
}: {
  login: LoginAction;
  users: Users | null;
  setNewUser: SetNewUser;
}) => {
  const navigate = useNavigate();
  const [addUserModalVisible, setAddUserModalVisible] =
    useState<boolean>(false);
  useScrollTop();

  if (!users) {
    return null;
  }

  const loginAndMove = (userId: string) => {
    login(userId);
    navigate("/baby-name-poll/nombres");
  };

  return (
    <>
      <UserList>
        <Typography.Title level={4}>Quien te pensas que sos?</Typography.Title>
        {Object.keys(users).map((userId) => {
          const user = users[userId];
          return (
            <Card key={userId} onClick={() => loginAndMove(userId)}>
              <AvatarAndName>
                <Avatar
                  key={userId}
                  size={50}
                  onClick={() => loginAndMove(userId)}
                  user={user}
                  userId={userId}
                />
                <Typography.Text>{userId}</Typography.Text>
              </AvatarAndName>
            </Card>
          );
        })}
        <Divider />
        <Card onClick={() => setAddUserModalVisible((prev) => !prev)}>
          <AvatarAndName>
            <Button
              style={{
                height: "50px",
                width: "50px",
              }}
              type="primary"
              shape="circle"
              icon={
                <PlusOutlined
                  style={{
                    fontSize: "1.5rem",
                  }}
                />
              }
            />
            <span>Nuevo Usuario</span>
          </AvatarAndName>
        </Card>
      </UserList>
      <NewUserModal
        setNewUser={setNewUser}
        login={login}
        open={addUserModalVisible}
        close={() => setAddUserModalVisible(false)}
      />
    </>
  );
};

export default Login;
