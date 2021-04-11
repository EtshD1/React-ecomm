import React, { useState } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import axios from 'axios';


const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setscription] = useState('');

  return <>
    AddProduct
  </>
}

export default AddProduct;