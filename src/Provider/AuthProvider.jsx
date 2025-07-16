/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosPublic from "../utils/axiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Register
  const register = async (userData) => {
    try {
      const res = await axiosPublic.post("/api/register", userData, {
        withCredentials: true,
      });
      if (res.status === 201 || res.status === 200) {
        setUser(res.data.user);
        return res;
      }
    } catch (error) {
      toast.error("Registration failed");
      console.error(error);
      throw error;
    }
  };

  //  Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post(
        "/api/login",
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUser(res.data.user);
        return res;
      }
    } catch (err) {
      toast.error("Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  //  Logout
  const logout = async () => {
    try {
      await axiosPublic.post("/api/logout", {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out");
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  //  Check auth on refresh
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosPublic.get("/api/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const authValues = {
    user,
    register,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
