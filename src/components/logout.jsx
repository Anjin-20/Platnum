import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication data (adjust as needed)
    localStorage.removeItem("authToken"); // or sessionStorage
    // Redirect to login or home
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        background: "tomato",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
