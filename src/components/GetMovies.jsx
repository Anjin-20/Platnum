import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import Carousel styles
import { Carousel } from "react-responsive-carousel";
import beak from "./imageses/1594260923815-game-of-thrones-s1-cc1.jpg";
import push from "./imageses/money-heist-season-5.avif";
import rada from "./imageses/fx-shogun.jpg";
import me from "./imageses/p10874252_b_h10_aa.jpg";
import you from "./imageses/x-former-twitter-social-media-app-icon-black-silhouete-square-rounded-corners-shape-vector-illustration-294027990.webp";
import po from "./imageses/download (6).jpeg";

const GetMovies = () => {
  const [products, setProducts] = useState([]);
  const img_url = "https://Anjin.pythonanywhere.com/static/images/";
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const getProduct = async () => {
    try {
      const response = await axios.get(
        "https://Anjin.pythonanywhere.com/api/get_product_details"
      );
      setProducts(response.data.products);
      localStorage.setItem("products", JSON.stringify(response.data.products));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // 🔍 Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      {/* 🔹 Search Bar */}
      <div className="container my-4 d-flex align-items-center">
        <span className="text-white me-2">🔍</span>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary w-50"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🔹 Movie Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        className="carousel-container"
      >
        <div>
          <img src={beak} alt="Movie 1" className="carousel-image" />
          <p className="legend">Enjoy Unlimited Streaming</p>
        </div>
        <div>
          <img src={rada} alt="Movie 2" className="carousel-image" />
          <p className="legend">Secure Payment & Fast Access</p>
        </div>
        <div>
          <img src={push} alt="Movie 3" className="carousel-image" />
          <p className="legend">Exclusive Movies & Special Offers</p>
        </div>
        <div>
          <img src={me} alt="Movie 4" className="carousel-image" />
          <p className="legend">Latest Blockbusters & Hidden Gems</p>
        </div>
      </Carousel>

      {/* 🔹 Product List */}
      <div className="row d-flex justify-content-center">
        {filteredProducts?.map((product, index) => (
          <div className="col-md-3 d-flex align-items-stretch mb-4" key={index}>
            <div
              className="card shadow p-2 w-100"
              style={{ minHeight: "450px" }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "250px" }}
              >
                <img
                  src={img_url + product.product_photo}
                  alt={product.product_name}
                  className="card-img-top"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="mt-2">{product.product_name}</h5>
                <p className="text-muted flex-grow-1">
                  {product.product_description}
                </p>
                <b className="text-warning">${product.product_cost}</b>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => navigate("/payment", { state: { product } })}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Footer Section */}
      <footer className="container-fluid bg-dark text-light py-4 mt-5">
        <div className="row text-center">
          {/* About Us Section */}
          <div className="col-md-6 text-end">
            <h4 className="text-warning text-right">About Us</h4>
            <p>
              We offer the best quality movies across all genres, suitable for
              all ages.
            </p>
            <p>
              We provide movies from Netflix, Hulu, Amazon, Warner Bros, and
              more.
            </p>
          </div>

          {/* Social Media Section */}
          <div className="col-md-6 text-end">
            <h4 className="text-warning">Stay Connected</h4>
            <div>
              {/* Instagram (Read-Only Link) */}
              <a
                href="https://instagram.com/anjin_2.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={po} alt="Instagram" className="social-icon mx-2" />
              </a>

              {/* X (Twitter) (Read-Only Link) */}
              <a
                href="https://twitter.com/@Anjin129"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={you} alt="Twitter/X" className="social-icon mx-2" />
              </a>
            </div>
            <p className="mt-2">
              Follow us for the latest updates on your favorite movies.
            </p>
          </div>
        </div>
      </footer>

      {/* 🔹 Footer Styles */}
      <style>
        {`
          .social-icon {
            width: 40px;
            height: 40px;
            transition: transform 0.3s ease-in-out;
          }
          .social-icon:hover {
            transform: scale(1.1);
          }
          .carousel-image {
            height: 400px;
            width: 100%;
            object-fit: contain;
          }
        `}
      </style>
      <footer className="text-warning">
        <p>&copy;Anjin movies All rights Reserved</p>
      </footer>
    </div>
  );
};

export default GetMovies;
