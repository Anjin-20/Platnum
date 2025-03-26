import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Feedback system
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Posting data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("❌ Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://Anjin.pythonanywhere.com/api/signin",
        {
          email,
          password,
        }
      );

      if (response.data.user) {
        setSuccess("✅ Sign-in successful!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("❌ Incorrect email or password. Try again.");
      }
    } catch (err) {
      setError("⚠️ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row w-100 justify-content-center">
        <div
          className="col-12 col-md-6 card shadow-lg p-4 text-light"
          style={cardStyle}
        >
          <h1 className="text-center text-warning">Sign In</h1>

          {/* Feedback Messages */}
          {loading && <p className="text-info text-center">⌛ Connecting...</p>}
          {success && <p className="text-success text-center">{success}</p>}
          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="w-100">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              disabled={loading}
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              disabled={loading}
            />

            <button
              type="submit"
              className="btn w-100"
              style={buttonStyle}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className="text-warning">
                Sign Up
              </Link>
            </p>
          </form>

          <footer className="text-warning text-center mt-3">
            <p>&copy; Anjin Movies | All Rights Reserved</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

// Styling
const cardStyle = {
  background: "linear-gradient(to right, #1c1c1c, #2a2a2a)",
  borderRadius: "15px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.8)",
  color: "#fff",
  padding: "30px",
  textAlign: "center",
  maxWidth: "100%",
};

const inputStyle = {
  backgroundColor: "#333",
  color: "#fff",
  border: "1px solid #444",
  borderRadius: "5px",
  padding: "12px",
  fontSize: "1rem",
  transition: "all 0.3s ease",
  width: "100%",
};

const buttonStyle = {
  backgroundColor: "#f1c40f",
  color: "#2c3e50",
  border: "none",
  borderRadius: "5px",
  padding: "15px",
  fontSize: "1.2rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
  width: "100%",
};

export default Signin;
