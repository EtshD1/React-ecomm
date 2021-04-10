import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ toggleMenu, logout, cartLength, user, menuDisplay }) => <nav
  className="navbar container"
  role="navigation"
  aria-label="main navigation"
>
  <div className="navbar-brand">
    <strong className="navbar-item is-size-4">e-commerce</strong>
    <label
      role="button"
      className="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
      onClick={(e) => { e.preventDefault(); toggleMenu() }}
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </label>
  </div>

  <div className={`navbar-menu ${menuDisplay ? "is-active" : ""}`}>
    <Link to="/products" className="navbar-item">
      Products
    </Link>
    {user && user.accessLevel < 1 ? <Link to="/add-product" className="navbar-item">Add Product</Link> : ""}
    <Link to="/cart" className="navbar-item">
      Cart
      <span
        className="tag is-primary"
        style={{ marginLeft: "5px" }}
      >
        {cartLength}
      </span>
    </Link>
    {!user ? <Link to="/login" className="navbar-item">Login</Link> : <Link to="/" onClick={logout} className="navbar-item">Logout</Link>}
  </div>

</nav>

export default NavBar;