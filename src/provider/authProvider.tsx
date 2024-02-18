import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import httpClient from "../utils/httpClient";
import { AxiosResponse } from "axios";

type AuthContextProps = {
  isLogin: boolean;
  handleLogin: (user: UserProps) => void;
  handleLogout: () => void;
  currentUser: UserProps | undefined;
  setCurrentUser: (user: UserProps | undefined) => void;
};

export type UserProps = {
  email: string;
  id: number;
  name: string;
}

type DetailResponse = {
  data: {
    attributes: UserProps;
  }
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider = ({ children }: any) => {

  const [isLogin, setIsLogin] = useState<boolean>(localStorage.getItem("login") === "true");
  const [currentUser, setCurrentUser] = useState<UserProps | undefined>();
  const handleLogin = (user: UserProps) => {
    setCurrentUser(user);
    setIsLogin(true);
    localStorage.setItem("login", "true");
  }

  const handleLogout = () => {
    setIsLogin(false);
    setCurrentUser(undefined);
    localStorage.removeItem("login");
  }

  useEffect(() => {
    if (isLogin && !currentUser) {
      const token = localStorage.getItem('token');
      httpClient.get('/api/users/detail', { withCredentials: true, headers: { Authorization: token } })
      .then((response: AxiosResponse<DetailResponse>) => {
        setCurrentUser(response.data.data.attributes);
      }).catch(() => {
        handleLogout();
      });
    }
  }, [isLogin]);


  const contextValue: AuthContextProps = {
    isLogin,
    handleLogin,
    handleLogout,
    currentUser,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}

export const ProtectedRoute = () => {
  const { isLogin } = useAuth();

  if (!isLogin) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default AuthProvider;
