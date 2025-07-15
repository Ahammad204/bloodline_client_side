/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAuth from "./UseAuth";
import useAxiosSecure from "../utils/useAxiosSecure";


const useVolunteer = () => {
  const { user, loading:authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [isVolunteerLoading, setIsVolunteerLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/volunteer/${user.email}`)
        .then((res) => {
          setIsVolunteer(res.data.isVolunteer);
          setIsVolunteerLoading(false);
        })
        .catch((err) => {
          console.error("Volunteer check failed:", err);
          setIsVolunteer(false);
          setIsVolunteerLoading(false);
        });
    } else {
      setIsVolunteer(false);
      setIsVolunteerLoading(false);
    }
  }, [user, axiosSecure]);

  return [isVolunteer, isVolunteerLoading];
};

export default useVolunteer;
