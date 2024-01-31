import styled from "styled-components";
import { LogoutAction, User } from "../models";
import Avatar from "./Avatar";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Drawer, Typography } from "antd";

const Wrapper = styled.header`
  padding-block: 0.5rem;
  padding-inline: 1rem;
  background: #f2f2f2;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
  & > h1 {
    font-size: 18px;
  }
`;

function Header({
  user,
  logout,
  userId,
}: {
  user: User | null;
  logout: LogoutAction;
  userId?: string | null | undefined;
}) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <Wrapper>
        {collapsed ? (
          <MenuUnfoldOutlined
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "38px" }}
          />
        ) : (
          <MenuFoldOutlined
            style={{ fontSize: "38px" }}
            onClick={() => setCollapsed(!collapsed)}
          />
        )}
        <Typography.Title level={4}>
          Consulta popular para la eleccion del nombre del neonato
        </Typography.Title>
        <Avatar user={user} userId={userId} onClick={logout} />
      </Wrapper>
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={() => setCollapsed((prev) => !prev)}
        open={!collapsed}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}

export default Header;
