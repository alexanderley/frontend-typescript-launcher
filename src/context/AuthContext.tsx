import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import API_URL from "../../apiKey";

type User = {
  _id?: string;
  name?: string;
  email?: string;
};

type AuthContextObj = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  storeToken: (token: string) => void;
  authenticateUser: () => Promise<void>;
  logOutUser: () => void;
};

export const AuthContext = React.createContext<AuthContextObj>({
  isLoggedIn: false,
  isLoading: false,
  user: null,
  storeToken: () => {},
  authenticateUser: async () => {},
  logOutUser: () => {},
});

const AuthProviderWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    try {
      // Get the stored token from the localStorage
      const storedToken = localStorage.getItem("authToken");

      // If the token exists in the localStorage
      if (storedToken) {
        // We must send the JWT token in the request's "Authorization" Headers
        const response = await axios.get<User>(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        // If the server verifies that JWT token is valid ✅
        const user: User = response.data;

        // Update state variables
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
      } else {
        // If the token is not available
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
    } catch (error) {
      // If the server sends an error response (invalid token) ❌
      console.error(error);

      // Update state variables
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    // Run the function after the initial render,
    // after the components in the App render for the first time.
    authenticateUser();
  }, []);

  const contextValue: AuthContextObj = {
    isLoggedIn,
    isLoading,
    user,
    storeToken,
    authenticateUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProviderWrapper };
