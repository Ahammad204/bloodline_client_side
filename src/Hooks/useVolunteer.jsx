import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxiosSecure from "../utils/useAxiosSecure";

const useVolunteer = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isVolunteer = false,
    isPending: isVolunteerLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["isVolunteer", user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/volunteer/${user.email}`);
      return res.data.isVolunteer;
    },
  });

  return [isVolunteer, isVolunteerLoading, isError, error];
};

export default useVolunteer;
