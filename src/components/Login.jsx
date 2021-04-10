import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();

    if (!username || !password) {
      return this.setState({ error: "Fill all fields!" });
    }
    context.login(username, password)
      .then((loggedIn) => {
        if (!loggedIn) {
          this.setState({ error: "Invalid Credentails" });
        }
      })
  };


  return <>Login</>;
}

export default Login;