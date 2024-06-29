import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import useAuthCheck from "../../hooks/useAuthCheck";
import UserDetailsContext from "../../context/UserDetailsContext";
import { toFav } from "../../utils/api";
import { persistfav, updateFavBooking } from "../../utils/common";

const Favourite = ({ id }) => {
  const [likeColor, setLikeColor] = useState("white");
  const {
    userDetails: { favourites, token },
    setUserDetails,
  } = useContext(UserDetailsContext);

  useEffect(() => {
    // const aa = persistfav(id, favourites)
    // console.log("aaaa", aa)
    setLikeColor(() => persistfav(id, favourites))
  }, [ favourites])
  
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();



  const { mutate, isLoading } = useMutation({
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: (data) => {
      likedVisit(data?.message)
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast.error(error.message);
    }
  });
  const likedVisit =  (msg) => {
    try {
      setUserDetails((prev) => ({
        ...prev, 
        favourites: updateFavBooking(id, prev.favourites)
      }))
      toast.success(`${msg}`, {position: "bottom-right"})
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };
  const handleLike =  (e) => {
    e.stopPropagation()
    try {
      // if (isLoading) return; 
      if (validateLogin()) {
         mutate();
        setLikeColor((prev) => (prev === "white" ? "red" : "white"));
      } else {
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  return (
    <>
      <AiFillHeart size={24} color={likeColor} onClick={ handleLike}  style={{ cursor: isLoading ? 'not-allowed' : 'pointer', pointerEvents: isLoading ? 'none' : 'auto' }} />
    </>
  );
};

export default Favourite;
