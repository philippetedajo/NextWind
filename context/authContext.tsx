import { createContext, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import {fetcher} from "../utils/fetcher";
import {Response} from "../_types/fetcher_types";

interface AuthContextInterface {
  user: any;
  login: (input: any) => Promise<void>;
  signup: (input: any) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (input) => {
    try {
      setIsLoading(true);
      const response = await fetcher({
        url: "/api/auth/login",
        method: "POST",
        input,
        internalApi: true,
      });
      setUser(response);

      if (response.type === Response.SUCCESS) await router.push("/dashboard");

      setIsLoading(false);
      setError("");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const signup = async (input) => {
    try {
      setIsLoading(true);
      const response = await fetcher({
        url: "/api/auth/signup",
        method: "POST",
        input,
        internalApi: true,
      });

      setUser(response);

      if (response.type === Response.SUCCESS)await router.push("/dashboard");

      setIsLoading(false);
      setError("");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/logout");
      setUser(response.data);
      await router.push("/auth/login");
      setIsLoading(false);
      setError("");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const checkSession = async () => {
    const response = await axios.get("/api/auth/user");
    setUser(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, signup, logout, checkSession, user, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
