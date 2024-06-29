import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import UserDetailsContext from "../context/UserDetailsContext";
import { getAllFav } from "../utils/api";

const useFavourites = () => {
  const { user } = useAuth0();
  const queryRef = useRef();
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: "allFavourites",
    queryFn: () => getAllFav(user?.email, userDetails?.token),
    onSuccess: (data) => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: data,
      }));
    },
    enabled: user !== undefined,
    staleTime: 30000,
  });
  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
