import React from "react";
import { Avatar, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = ({ user, logout }) => {
  const navigate = useNavigate();
  const avatarStyle = {
    width: "40px",
    height: "40px", 
    borderRadius: "50%",
    objectFit: "cover", 
    cursor: "pointer", 
  };
  return (
    <Menu>
      <Menu.Target>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer", 
          }}
        >
          <img
            src={user?.picture}
            alt="user image"
            style={avatarStyle}
          />
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate("./favourites", { replace: true })}>
          Favourites
        </Menu.Item>
        <Menu.Item onClick={() => navigate("./bookings", { replace: true })}>
          Bookings
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Profile;
