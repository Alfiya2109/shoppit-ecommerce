import React, { useState, useEffect } from 'react';
import CardContainer from './CardContainer';
import api from "../../api"; // Ensure this is your axios instance
import Header from "./Header";
import PlaceHolderContainer from '../ui/PlaceHolderContainer';
import Error from '../ui/Error';
import { randomValue } from '../../GenerateCartCode';
import Footer from '../ui/Footer';
import mockProducts from '../../products_data.json';


// issue in project 

// 1.number of items is not show
// 2. navbar is not show at cart page
// 3. update alter masage is not show




const HomePage = () => {
  const [products, setProducts] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState(""); // Initialize error state

   useEffect(function(){
    if(localStorage.getItem("cart_code") === null){
      localStorage.setItem("cart_code", randomValue); // Generate a random cart code if none exists
    }
   },[])





  useEffect(() => {
    api.get("products/")
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
        setError("");
      })
      .catch(err => {
        console.warn("Using offline catalog fallback:", err.message);
        setProducts(mockProducts);
        setLoading(false);
        setError("");
      });
  }, []);  // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <Header />
      {error && <Error error={error} />}
      {loading ? <PlaceHolderContainer /> : <CardContainer products={products} />}
      <Footer/>
    </>
  );
};

export default HomePage;
