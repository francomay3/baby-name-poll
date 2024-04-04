import styled from "styled-components";
import { User } from "../models";
import Avatar from "./Avatar";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Drawer, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../constants";

const Wrapper = styled.header`
  padding-block: 0.5rem;
  padding-inline: 1rem;
  background: #e1e1ff;
  border-bottom: 1px solid #bebee1;
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
  userId,
}: {
  user: User | null;
  userId?: string | null | undefined;
}) {
  const navigate = useNavigate();
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
        <Typography.Title
          level={4}
          onClick={() => navigate(routes.home.path)}
          style={{ margin: 0 }}
        >
          Consulta popular para la eleccion del nombre del neonato
        </Typography.Title>
        <Avatar
          user={user}
          userId={userId}
          onClick={() => navigate(routes.user.path)}
        />
      </Wrapper>
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={() => setCollapsed((prev) => !prev)}
        open={!collapsed}
      >
        <Space direction="vertical">
          {Object.values(routes).map((route) => (
            <Typography.Text key={route.path}>
              <Link onClick={() => setCollapsed(true)} to={route.path}>
                {route.name}
              </Link>
            </Typography.Text>
          ))}
        </Space>
      </Drawer>
    </>
  );
}

export default Header;
