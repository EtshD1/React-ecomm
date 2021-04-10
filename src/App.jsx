import React, { useRef, useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';


import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import NavBar from "./components/Navbar";
import ProductList from './components/ProductList';

import Context from "./context";

const App = props => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const routerRef = useRef();

  const toggleMenu = () => setShowMenu((prevState) => !prevState);

  const logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  const login = async (email, password) => {
    const res = await axios.post(
      'http://localhost:3001/login',
      { email, password },
    ).catch(res => ({ status: 401, message: 'Unauthorized' }));

    if (res.status === 200) {
      const { email } = jwt_decode(res.data.accessToken)
      const user = {
        email,
        token: res.data.accessToken,
        accessLevel: email === 'admin@example.com' ? 0 : 1
      }

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    const products = await axios.get('http://localhost:3001/products');
    user = user ? JSON.parse(user) : null;
    setUser(user);
    setProducts(products.data);
  }, [])

  return (<Context.Provider value={{
    user,
    cart,
    products
  }}>
    <Router ref={routerRef}>
      <div className="App">
        <NavBar cartLength={Object.keys(cart).length} menuDisplay={showMenu} toggleMenu={toggleMenu} logout={logout} />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/add-product" component={AddProduct} />
          <Route exact path="/products" component={ProductList} />
        </Switch>
      </div>
    </Router>
  </Context.Provider>)
}

export default App;