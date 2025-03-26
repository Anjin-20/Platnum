import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const { product } = useLocation().state || {};
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("amount", product.product_cost);
      formData.append("phone", phone);

      const response = await axios.post(
        "https://Anjin.pythonanywhere.com/api/mpesa_payment",
        formData
      );

      if (response.data.message) {
        setLoading(false);
        setSuccess("Payment Successful!");
      } else {
        setLoading(false);
        setError("Payment failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow-lg p-4" style={cardStyle}>
        <h1 className="text-center text-warning">Make Mpesa Payment</h1>

        {loading && <p className="text-info">Processing your payment...</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        <h3 className="text-center text-light">{product?.product_name}</h3>
        <p className="text-light">{product?.product_description}</p>
        <p className="text-warning">
          <strong>{product?.product_cost}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Enter 254*********"
            className="form-control mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
          <button
            type="submit"
            className="btn btn-danger w-100"
            style={buttonStyle}
            disabled={loading}
          >
            {loading ? "Processing..." : "Purchase Now"}
          </button>
        </form>
        <footer className="text-warning">
        <p>&copy;Anjin movies All rights Reserved</p>
      </footer>
      </div>
    </div>
    
  );
};

// Cinematic card styling
const cardStyle = {
  background: "linear-gradient(to right, #2e2e2e, #111)",
  borderRadius: "15px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.9)",
  padding: "30px",
  backdropFilter: "blur(10px)",
  textAlign: "center",
  color: "#fff",
  border: "none",
};

// Cinematic input styling
const inputStyle = {
  backgroundColor: "#333",
  color: "#fff",
  border: "1px solid #444",
  borderRadius: "5px",
  padding: "12px",
  marginBottom: "10px",
  fontSize: "1rem",
  transition: "all 0.3s ease",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
};

// Cinematic button styling
const buttonStyle = {
  backgroundColor: "#e67e22",
  color: "#2c3e50",
  border: "none",
  borderRadius: "5px",
  padding: "15px",
  fontSize: "1.2rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.6)",
};


export default Payment;
