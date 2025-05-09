import "./App.css";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import AddProduct from "./components/AddProducts";
import Payment from "./components/Payment";
import GetMovies from "./components/GetMovies";
import NotFound from "./components/NotFound";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const navLinks = [
    { path: "/getmovies", label: "Home" },
    { path: "/signin", label: "Signin" },
    { path: "/signup", label: "Signup" },
    { path: "/addproduct", label: "Premium" },
  ];

  <br />

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation */}
        <nav className="d-flex justify-content-center gap-3 mt-3">
          {navLinks.map(({ path, label }) => (
            <Link key={path} to={path}>
              <button className="btn btn-outline-danger">{label}</button>
            </Link>
          ))}
        </nav>

        {/* Header */}
        <header className="App-header">
          <h1 className="text-warning">ANJIN</h1>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<GetMovies />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/getmovies" element={<GetMovies />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
