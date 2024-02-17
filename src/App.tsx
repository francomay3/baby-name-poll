import useDatabase from "./hooks/useDatabase";
import useAuth from "./hooks/useAuth";
import Login from "./components/Login";
import NamesList from "./components/NamesList";
import Layout from "./components/Layout";
import Ranking from "./components/Ranking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import Main from "./components/Main";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RedirectToHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/baby-name-poll");
  }, [navigate]);
  return null;
};

const App = () => {
  const { data, loading, error, setNewValue, setNewName, setNewUser } =
    useDatabase();
  const { userId, login, logout } = useAuth();

  const user = userId ? data?.users[userId] || null : null;

  return (
    <BrowserRouter>
      <Layout
        userId={userId}
        user={user}
        logout={logout}
        loading={!data || loading}
        error={error}
      >
        <Routes>
          <Route path="baby-name-poll" element={<Main />} />
          <Route
            path="baby-name-poll/ranking"
            element={<Ranking data={data} />}
          />
          <Route
            path="baby-name-poll/login"
            element={
              <Login
                users={data?.users || null}
                login={login}
                setNewUser={setNewUser}
              />
            }
          />
          <Route
            path="baby-name-poll/nombres"
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
            path="baby-name-poll/usuario"
            element={
              <UserDashboard userId={userId} user={user} logout={logout} />
            }
          />
          <Route path="*" element={<RedirectToHome />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
