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
        <Typography.Title level={4} onClick={() => navigate(routes.home)}>
          Consulta popular para la eleccion del nombre del neonato
        </Typography.Title>
        <Avatar
          user={user}
          userId={userId}
          onClick={() => navigate(routes.user)}
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
          <Typography.Text>
            <Link onClick={() => setCollapsed(true)} to={routes.home}>
              Home
            </Link>
          </Typography.Text>
          <Typography.Text>
            <Link onClick={() => setCollapsed(true)} to={routes.vote}>
              Votar Nombres
            </Link>
          </Typography.Text>
          <Typography.Text>
            <Link onClick={() => setCollapsed(true)} to={routes.ranking}>
              Ranking
            </Link>
          </Typography.Text>

          {user && (
            <Typography.Text>
              <Link onClick={() => setCollapsed(true)} to={routes.user}>
                {userId}
              </Link>
            </Typography.Text>
          )}
        </Space>
      </Drawer>
    </>
  );
}

export default Header;
