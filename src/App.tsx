import useDatabase from "./hooks/useDatabase";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Login from "./components/Login";
import NamesList from "./components/NamesList";
import Layout from "./components/Layout";

const App = () => {
  const { data, loading, error, setNewValue, setNewName, setNewUser } =
    useDatabase();
  const { userId, login, logout } = useAuth();
  let Child;
  if (!data || loading) {
    Child = <Loading />;
  } else if (error) {
    Child = <Error />;
  } else if (!userId) {
    Child = <Login users={data.users} login={login} setNewUser={setNewUser} />;
  } else {
    Child = (
      <NamesList
        setNewName={setNewName}
        logout={logout}
        userId={userId}
        names={data.names}
        setNewValue={setNewValue}
      />
    );
  }

  return (
    <Layout
      userId={userId}
      user={userId ? data?.users[userId] || null : null}
      logout={logout}
    >
      {Child}
    </Layout>
  );
};

export default App;
