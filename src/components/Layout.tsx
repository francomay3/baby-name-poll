import styled from "styled-components";
import { LogoutAction, User } from "../models";
import Avatar from "./Avatar";

const Header = styled.header`
  padding-block: 0.5rem;
  padding-inline: 1rem;
  background: #f2f2f2;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  gap: 1rem;
  & > h1 {
    font-size: 18px;
  }
`;

const Main = styled.main`
  padding: 1rem;
`;

const Layout = ({
  children,
  user,
  logout,
  userId,
}: {
  children: React.ReactNode;
  user: User | null;
  logout: LogoutAction;
  userId?: string | null;
}) => {
  return (
    <>
      <Header>
        <Avatar user={user} userId={userId} onClick={logout} />
        <h1>Consulta popular para la eleccion del nombre del neonato</h1>
      </Header>
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
