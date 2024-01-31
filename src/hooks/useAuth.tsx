import { useState, useEffect } from "react";

const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserId(storedUser);
    }
  }, []);

  const login = (userId: string) => {
    localStorage.setItem("user", userId);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserId(null);
  };

  return { userId, login, logout };
};

export type LoginAction = ReturnType<typeof useAuth>["login"];

export type LogoutAction = ReturnType<typeof useAuth>["logout"];

export default useAuth;
