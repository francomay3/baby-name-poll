import useDatabase from "./hooks/useDatabase";
import useAuth from "./hooks/useAuth";
import Login from "./components/Login";
import NamesList from "./components/NamesList";
import Layout from "./components/Layout";
import Ranking from "./components/Ranking";
import { HashRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import Main from "./components/Main";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { routes } from "./constants";
import Batalla from "./components/Batalla";

const RedirectToHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(routes.home.path);
  }, [navigate]);
  return null;
};

const App = () => {
  const {
    data,
    loading,
    error,
    setNewValue,
    setNewName,
    setNewUser,
    setNewEloRating,
  } = useDatabase();
  const { userId, login, logout } = useAuth();

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
            path={routes.vote.path}
            element={
              <NamesList
                setNewName={setNewName}
                logout={logout}
                userId={userId}
                names={data?.names || null}
                setNewValue={setNewValue}
              />
            }
          />
          <Route
            path={routes.user.path}
            element={
              <UserDashboard userId={userId} user={user} logout={logout} />
            }
          />
          <Route
            path={routes.batalla.path}
            element={<Batalla data={data} setNewEloRating={setNewEloRating} />}
          />
          <Route path="*" element={<RedirectToHome />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
