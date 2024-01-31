import styled from "styled-components";
import { LogoutAction, User } from "../models";
import Header from "./Header";

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
      <Header user={user} userId={userId} logout={logout} />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
