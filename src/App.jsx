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

  const checkout = () => {
    if (!user) {
      routerRef.current.history.push("/login");
      return;
    }

    const newCart = {};
    for (let key in cart) {
      newCart[key] = cart[key];
    }

    const newProducts = products.map(p => {
      if (newCart[p.name]) {
        p.stock = p.stock - newCart[p.name].amount;

        axios.put(
          `http://localhost:3001/products/${p.id}`,
          { ...p },
        )
      }
      return p;
    });

    setProducts(newProducts);
    clearCart();
  };


  const addToCart = cartItem => {
    const newCart = {};
    for (let key in cart) {
      newCart[key] = cart[key];
    }
    if (newCart[cartItem.id]) {
      newCart[cartItem.id].amount += cartItem.amount;
    } else {
      newCart[cartItem.id] = cartItem;
    }
    if (newCart[cartItem.id].amount > newCart[cartItem.id].product.stock) {
      newCart[cartItem.id].amount = newCart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(newCart);
  };

  const removeFromCart = cartItemId => {
    const newCart = {};
    for (let key in cart) {
      newCart[key] = cart[key];
    }
    delete newCart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(newCart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart({});
  };



  const addProduct = (product, callback) => {
    let newProducts = products.slice();
    newProducts.push(product);
    setProducts(newProducts);
  };


  const logout = e => {
    e.preventDefault();
    setUser(null);
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
    (async () => {
      let user = localStorage.getItem("user");
      const products = await axios.get('http://localhost:3001/products');
      user = user ? JSON.parse(user) : null;
      setUser(user);
      setProducts(products.data);
    })()
  }, []);

  return (<Context.Provider value={{
    user,
    cart,
    products,
    login,
    addProduct,
    addToCart,
    removeFromCart,
    checkout,
    clearCart
  }}>
    <Router ref={routerRef}>
      <div className="App">
        <NavBar cartLength={Object.keys(cart).length} menuDisplay={showMenu} user={user} toggleMenu={toggleMenu} logout={logout} />
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