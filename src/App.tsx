import useDatabase from "./hooks/useDatabase";
import useAuth from "./hooks/useAuth";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Ranking from "./components/Ranking";
import { HashRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import Main from "./components/Main";
import { routes } from "./constants";
import Batalla from "./components/Batalla";

const App = () => {
  const { data, loading, error, setNewUser } = useDatabase();
  const { userId, login, logout, RedirectToHome } = useAuth();

  const user = userId ? data?.users[userId] || null : null;

  return (
    <HashRouter>
      <Layout
        userId={userId}
        user={user}
        logout={logout}
        loading={!data || loading}
        error={error}
      >
        <Routes>
          <Route path={routes.home.path} element={<Main />} />
          <Route path={routes.ranking.path} element={<Ranking data={data} />} />
          <Route
            path={routes.login.path}
            element={
              <Login
                users={data?.users || null}
                login={login}
                setNewUser={setNewUser}
              />
            }
          />
          <Route
            path={routes.user.path}
            element={
              <UserDashboard userId={userId} user={user} logout={logout} />
            }
          />
          <Route path={routes.batalla.path} element={<Batalla data={data} />} />
          <Route path="*" element={<RedirectToHome />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
