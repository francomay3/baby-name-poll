import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";

const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("user")
  );

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

  const RedirectToHome = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate(routes.home.path);
    }, [navigate]);
    return null;
  };

  const RedirectToLogin = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate(routes.login.path);
    }, [navigate]);
    return null;
  };

  return { userId, login, logout, RedirectToHome, RedirectToLogin };
};

export type LoginAction = ReturnType<typeof useAuth>["login"];

export type LogoutAction = ReturnType<typeof useAuth>["logout"];

export default useAuth;
