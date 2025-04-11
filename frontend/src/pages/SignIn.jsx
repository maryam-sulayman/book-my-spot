import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";
import Button from "../components/Button.jsx";
import axios from "axios";
import { UserContext } from "../userContext.jsx";
import AuthImage from "../images/auth.jpeg";
import Logo from "../images/logo.png";
import { jwtDecode } from "jwt-decode"; // Correct named import

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "/auth/sign-in",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true, // To handle cookies set by the backend
        }
      );

      const token = data.token; 
      const decoded = jwtDecode(token); 
      console.log("Decoded token:", decoded);
      setUser({
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
      });

      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <div>
        <img src={AuthImage} className="img-fluid auth-image" alt="Authentication" />
      </div>
      <div className="sign-in-container">
        <img src={Logo} className="img-fluid logo" alt="Logo" />
        <h1 className="sign-in-container__title">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <Button type="submit" title={loading ? "Signing in..." : "Sign in"} customClass="button" disabled={loading} />
          {error && <p className="error-message">{error}</p>}
          <div className="sign-up-wrapper">
            <p className="sign-up-text">
              Don't have an account?{" "}
              <Link to="/sign-up" className="sign-up-link">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
