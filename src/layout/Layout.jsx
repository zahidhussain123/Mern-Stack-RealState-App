import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import UserDetailsContext from "../context/UserDetailsContext";
import { useMutation } from "react-query";
import { useEffect } from "react";
import { createUser } from "../utils/api";
import { toast } from "react-toastify";
import useFavourites from "../hooks/useFavourites";
import useBookings from "../hooks/useBookings";

const Layout = () => {
  useFavourites()
  useBookings()
  const { isAuthenticated, user, logout, getAccessTokenWithPopup } = useAuth0();
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  

  useEffect(() => {
    async function getTokenAndRegister() {
      try {
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "http://localhost:5000",
            scope: "openid profile email",
          },
        });
        localStorage.setItem("access_token", res)
        setUserDetails(prev => ({...prev, token: res}))
        mutate(res)
      
      } catch (error) {
        toast.error(error.message)  
      }
    }
    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated, getAccessTokenWithPopup, setUserDetails, mutate]);
  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
