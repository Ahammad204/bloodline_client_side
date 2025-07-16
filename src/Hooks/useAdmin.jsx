import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxiosSecure from "../utils/useAxiosSecure";

const useAdmin = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isAdmin = false,
    isPending: isAdminLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !!user?.email && !authLoading, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data.isAdmin;
    },
  });

  return [isAdmin, isAdminLoading, isError, error];
};

export default useAdmin;
