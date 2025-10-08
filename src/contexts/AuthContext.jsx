import { createContext, useState, useEffect, useContext } from "react";
import {
  mockLogin,
  mockRegister,
  mockLogout,
  mockCheckToken,
} from "../utils/mockBackendApi.js";
import {
  getFromStorage,
  removeFromStorage,
  STORAGE_KEYS,
} from "../utils/storageHelpers.js";

const AuthContext = createContext();

// auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // check for existing session on mount
  useEffect(() => {
    const token = getFromStorage(STORAGE_KEYS.AUTH_TOKEN);
    const user = getFromStorage(STORAGE_KEYS.CURRENT_USER);

    if (token && user) {
      // verify token is still valid
      mockCheckToken(token)
        .then((response) => {
          setCurrentUser(response.user);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch(() => {
          // token invalid, clear storage
          removeFromStorage(STORAGE_KEYS.AUTH_TOKEN);
          removeFromStorage(STORAGE_KEYS.CURRENT_USER);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (email, password) => {
    return mockLogin(email, password).then((response) => {
      setCurrentUser(response.user);
      setIsLoggedIn(true);
      return response;
    });
  };

  const register = (name, email, password) => {
    return mockRegister(name, email, password).then((response) => {
      setCurrentUser(response.user);
      setIsLoggedIn(true);
      return response;
    });
  };

  const logout = () => {
    mockLogout();
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    currentUser,
    isLoggedIn,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
