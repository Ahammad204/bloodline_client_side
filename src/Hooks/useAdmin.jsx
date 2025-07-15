/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAuth from "./UseAuth";
import useAxiosSecure from "../utils/useAxiosSecure";


const useAdmin = () => {
  const { user, loading:authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/admin/${user.email}`)
        .then((res) => {
          setIsAdmin(res.data.isAdmin);
          setIsAdminLoading(false);
        })
        .catch((err) => {
          console.error("Admin check failed:", err);
          setIsAdmin(false);
          setIsAdminLoading(false);
        });
    } else {
      setIsAdmin(false);
      setIsAdminLoading(false);
    }
  }, [user, axiosSecure]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
