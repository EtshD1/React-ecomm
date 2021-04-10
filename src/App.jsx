import React, { useRef, useState } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

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

  const logout = () => { };

  return (<Context.Provider value={{
    user,
    cart,
    products
  }}>
    <Router ref={routerRef}>
      <div className="App">
        <NavBar cartLength={Object.keys(cart).length} />
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