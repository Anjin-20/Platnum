import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // Form validation function
  const validateForm = () => {
    if (!username || !email || !phone || !password) {
      setError("❌ All fields are required.");
      return false;
    }
    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("❌ Please enter a valid email.");
      return false;
    }
    // Basic phone number validation
    if (phone.length < 10) {
      setError("❌ Phone number should be at least 10 digits.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    if (!validateForm()) return; // Only proceed if form is valid

    setLoading(true);
    try {
      const response = await axios.post(
        "https://Anjin.pythonanywhere.com/api/signup",
        {
          username,
          email,
          phone,
          password,
        }
      );

      // Success message
      setLoading(false);
      setSuccess("✅ Signup successful! Redirecting to login...");

      // Redirect to login page after successful signup
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError("⚠️ An error occurred while signing up. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row w-100 justify-content-center">
        <div
          className="col-12 col-md-6 card shadow-lg p-4 text-light"
          style={cardStyle}
        >
          <h1 className="text-center text-warning">Sign Up</h1>

          {/* Feedback Messages */}
          {loading && <p className="text-info text-center">⌛ Loading...</p>}
          {success && <p className="text-success text-center">{success}</p>}
          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="w-100">
            {/* Username Input */}
            <input
              type="text"
              placeholder="Username"
              className="form-control mb-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              disabled={loading}
            />

            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              disabled={loading}
            />

            {/* Phone Input */}
            <input
              type="tel"
              placeholder="Phone"
              className="form-control mb-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
              disabled={loading}
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
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
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/signin" className="text-warning">
                Sign In
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
  background: "linear-gradient(to right, #0d0d0d, #222222)",
  borderRadius: "10px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.6)",
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

export default Signup;
