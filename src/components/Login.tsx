import { LoginAction, SetNewUser, Users } from "../models";
import styled from "styled-components";
import Avatar from "./Avatar";
import { PlusOutlined } from "@ant-design/icons";
import {
  Divider,
  Modal,
  ColorPickerProps,
  GetProp,
  Button,
  Input,
  ColorPicker,
} from "antd";
import { useState } from "react";

const UserList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  overflow-y: scroll;
  height: 100%;
  align-items: flex-start;
`;

const AvatarAndName = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  & > span {
    font-size: 1.275rem;
  }
`;

type Color = GetProp<ColorPickerProps, "value">;

const ModalInner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Login = ({
  login,
  users,
  setNewUser,
}: {
  login: LoginAction;
  users: Users;
  setNewUser: SetNewUser;
}) => {
  const [addUserModalVisible, setAddUserModalVisible] =
    useState<boolean>(false);
  const [newUserId, setNewUserId] = useState<string>("");
  const [newUserColor, setNewUserColor] = useState<Color>("#1677ff");
  const [newUserHex, setNewUserHex] = useState<string>("");

  return (
    <>
      <UserList>
        <h1 style={{ marginInline: "auto" }}>Quien te pensas que sos?</h1>
        {Object.keys(users).map((userId) => {
          const user = users[userId];
          return (
            <AvatarAndName>
              <Avatar
                key={userId}
                size={80}
                onClick={() => login(userId)}
                user={user}
                userId={userId}
              />
              <span>{userId}</span>
            </AvatarAndName>
          );
        })}
        <Divider />
        <AvatarAndName onClick={() => setAddUserModalVisible((prev) => !prev)}>
          <Button
            style={{
              height: "80px",
              width: "80px",
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
      </UserList>
      <Modal
        title="Tu Nombre"
        open={addUserModalVisible}
        onOk={() => {
          setNewUser(newUserId, newUserHex);
          login(newUserId);
        }}
        onCancel={() => setAddUserModalVisible(false)}
      >
        <ModalInner>
          <Input
            placeholder="Javier Milei"
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
          />
          <ColorPicker
            value={newUserColor}
            onChange={(color, hex) => {
              setNewUserHex(hex);
              setNewUserColor(color);
            }}
          />
        </ModalInner>
      </Modal>
    </>
  );
};

export default Login;
