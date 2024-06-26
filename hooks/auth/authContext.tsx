import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import { createContext, useEffect, useState } from "react";

import useAsyncStorage from "../useAsyncStorage";

type IAuthContext = {
  isAuthenticated?: boolean;
  user?: UserViewModel | null;
  token?: string | null;
  setAuth: (user: UserViewModel, token: string) => void;
  removeAuth: () => void;
  setUser: (user: UserViewModel) => void;
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useAsyncStorage<string | null>("authKey", null);
  const [userInfo, setUserInfo] = useAsyncStorage<UserViewModel | null>(
    "user",
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token, userInfo]);

  useEffect(() => {
    if (!token) return;
  }, [token, userInfo]);

  const setAuth = (user: UserViewModel, token_: string) => {
    setToken(token_);
    setUserInfo(user);
    setIsAuthenticated(!!token_);
  };

  const removeAuth = () => {
    setToken(null);
    setUserInfo(null);
    setIsAuthenticated(false);
  };

  const setUser = (user: UserViewModel) => {
    setUserInfo(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user: userInfo,
        token,
        isAuthenticated,
        setAuth,
        removeAuth,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
