import { UserViewModel } from "@tajdid-academy/tajdid-corelib";
import { createContext, useEffect, useState } from "react";

import useAsyncStorage from "../useAsyncStorage";

type IAuthContext = {
  isAuthenticated?: boolean;
  user?: UserViewModel;
  token?: string;
  setAuth: (user: UserViewModel, token: string) => void;
  removeAuth: () => void;
  setUser: (user: UserViewModel) => void;
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [userState, setUserState] = useState<UserViewModel>();
  const [token, setToken] = useAsyncStorage<string>("authKey", "");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  useEffect(() => {
    if (!token) return;
  }, [token, userState]);

  const setAuth = (user: UserViewModel, token_: string) => {
    setUserState(user);
    setToken(token_);
    setIsAuthenticated(!!token_);
  };

  const removeAuth = () => {
    setUserState(undefined);
    setToken("");
    setIsAuthenticated(false);
  };

  const setUser = (user: UserViewModel) => {
    setUserState(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user: userState,
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
