import axios from "axios";
import React, { useState } from "react";

const AddProducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState(null);

  // Feedback system
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product_name ||
      !product_description ||
      !product_cost ||
      !product_photo
    ) {
      setError("All fields are required!");
      return;
    }

    setLoading("Uploading...");

    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);

      const response = await axios.post(
        "https://Anjin.pythonanywhere.com/api/add_product",
        formData
      );

      if (response.data.success) {
        setLoading("");
        setSuccess(response.data.success);
        setProductName("");
        setProductDescription("");
        setProductCost("");
        setProductPhoto(null);
      } else {
        setLoading("");
        setError("Failed to add product. Please try again.");
      }
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  return (
    <div className="row justify-content-center mt-2">
     <div className="col-lg-6 col-md-8 col-sm-10 col-12 card shadow-lg p-4 text-light" style={cardStyle}>

        <h1 className="text-center text-warning">Add Product</h1>

        {/* Feedback messages */}
        {loading && <p className="text-info">{loading}</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product name"
            className="form-control mb-3"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Product description"
            className="form-control mb-3"
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
            style={inputStyle}
          ></textarea>

          <input
            type="number"
            placeholder="Product cost"
            className="form-control mb-3"
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
            style={inputStyle}
          />

          <input
            type="file"
            placeholder="Choose image"
            className="form-control mb-3"
            onChange={(e) => setProductPhoto(e.target.files[0])}
            style={inputStyle}
          />

          <button
            type="submit"
            className="btn btn-warning w-100"
            style={buttonStyle}
          >
            {loading ? "Adding Product..." : "Add Product"}
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
  background: "linear-gradient(to right, #1c1c1c, #2a2a2a)",
  borderRadius: "15px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.8)",
  padding: "30px",
  backdropFilter: "blur(10px)",
  textAlign: "center",
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
};

// Cinematic button styling
const buttonStyle = {
  backgroundColor: "#f1c40f",
  color: "#2c3e50",
  border: "none",
  borderRadius: "5px",
  padding: "15px",
  fontSize: "1.2rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
  marginTop: "15px",
};

export default AddProducts;
