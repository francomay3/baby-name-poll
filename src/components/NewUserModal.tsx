import { Modal, Input, ColorPicker, ColorPickerProps, GetProp } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { LoginAction, SetNewUser } from "../models";

const ModalInner = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0.5rem;
  align-items: center;
  padding-block: 1rem;

  & > span {
    font-weight: bold;
  }

  & .ant-color-picker-color-block {
    flex: 1;
  }
`;

type NewUserModalProps = {
  open: boolean;
  close: () => void;
  setNewUser: SetNewUser;
  login: LoginAction;
};

type Color = GetProp<ColorPickerProps, "value">;

function NewUserModal({ open, close, setNewUser, login }: NewUserModalProps) {
  const [newUserId, setNewUserId] = useState<string>("");
  const [newUserColor, setNewUserColor] = useState<Color>("#1677ff");
  const [newUserHex, setNewUserHex] = useState<string>("");
  return (
    <Modal
      title="Nuevo Usuario"
      open={open}
      onOk={() => {
        setNewUser(newUserId, newUserHex);
        login(newUserId);
      }}
      onCancel={close}
    >
      <ModalInner>
        <span>Nombre</span>
        <Input
          placeholder="Javier Milei"
          value={newUserId}
          onChange={(e) => setNewUserId(e.target.value)}
        />
        <span>Color</span>
        <ColorPicker
          value={newUserColor}
          onChange={(color, hex) => {
            setNewUserHex(hex);
            setNewUserColor(color);
          }}
        />
      </ModalInner>
    </Modal>
  );
}

export default NewUserModal;
