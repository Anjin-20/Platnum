import axios from "axios";
import React, { useState, useRef } from "react";

const AddProducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState(null);

  // Feedback system
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fileInputRef = useRef(null); // Ref for file input

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !product_name.trim() ||
      !product_description.trim() ||
      !product_cost ||
      !product_photo
    ) {
      setError("All fields are required!");
      return;
    }

    if (!["image/jpeg", "image/png"].includes(product_photo.type)) {
      setError("Only JPG and PNG image files are allowed.");
      return;
    }

    if (Number(product_cost) <= 0) {
      setError("Product cost must be greater than zero.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);

      const response = await axios.post(
        "https://anjin.pythonanywhere.com/api/add_product",
        formData
      );

      if (response.data.message) {
        setSuccess(response.data.message);
        setProductName("");
        setProductDescription("");
        setProductCost("");
        setProductPhoto(null);
        fileInputRef.current.value = null; // Clear file input
        setError("");
      } else {
        setError("Failed to add product. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div
        className="col-lg-6 col-md-8 col-sm-10 col-12 card shadow-lg p-4 text-light"
        style={cardStyle}
      >
        <h1 className="text-center text-warning">Add Product</h1>

        {loading && (
          <p className="text-info">
          
            Uploading...
          </p>
        )}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="form-label">Product Name</label>
          <input
            type="text"
            placeholder="Product name"
            className="form-control mb-3"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            style={inputStyle}
          />

          <label className="form-label">Product Description</label>
          <textarea
            placeholder="Product description"
            className="form-control mb-3"
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
            style={inputStyle}
          ></textarea>

          <label className="form-label">Product Cost</label>
          <input
            type="number"
            placeholder="Product cost"
            className="form-control mb-3"
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
            style={inputStyle}
          />

          <label className="form-label">Product Photo (JPG/PNG)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            className="form-control mb-3"
            onChange={(e) => setProductPhoto(e.target.files[0])}
            style={inputStyle}
          />

          <button
            type="submit"
            className="btn btn-warning w-100"
            style={buttonStyle}
            disabled={loading}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>

        <footer className="text-warning mt-4">
          <p>&copy; Anjin Movies. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  marginTop: "60px",
  background: "linear-gradient(to right, #1c1c1c, #2a2a2a)",
  borderRadius: "15px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.8)",
  padding: "30px",
  backdropFilter: "blur(10px)",
  textAlign: "center",
};

const inputStyle = {
  backgroundColor: "#333",
  color: "#fff",
  border: "1px solid #444",
  borderRadius: "5px",
  padding: "12px",
  fontSize: "1rem",
  transition: "all 0.3s ease",
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
  marginTop: "15px",
};

export default AddProducts;
