import React from "react";
import { useNavigate } from "react-router-dom";
import image from "./images/GkPL_JBXEAAsUXX.png";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="text-danger">404 - Page Not Found</h1>
      <p className="text-muted">The URL you entered does not exist.</p>
      <img
        src={image}
        alt="Not Found"
        className="img-fluid"
        style={{ maxWidth: "400px", margin: "20px 0" }}
      />
      <button
        onClick={() => navigate("/")}
        className="btn btn-warning px-4 py-2"
      >
        Return Home
      </button>
    </div>
  );
};

export default NotFound;
