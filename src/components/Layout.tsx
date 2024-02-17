import styled from "styled-components";
import { LogoutAction, User } from "../models";
import Header from "./Header";
import Loading from "./Loading";
import Error from "./Error";

const Main = styled.main`
  padding: 1rem;
`;

const Layout = ({
  children,
  error,
  loading,
  user,
  userId,
}: {
  children: React.ReactNode;
  error: boolean;
  loading: boolean;
  logout: LogoutAction;
  user: User | null;
  userId?: string | null;
}) => {
  return (
    <>
      <Header user={user} userId={userId} />
      {loading && <Loading />}
      {error && <Error />}
      {!loading && !error && <Main>{children}</Main>}
    </>
  );
};

export default Layout;
