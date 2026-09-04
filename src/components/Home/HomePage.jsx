import React, { useState, useEffect } from 'react';
import CardContainer from './CardContainer';
import api from "../../api"; // Ensure this is your axios instance
import Header from "./Header";
import PlaceHolderContainer from '../ui/PlaceHolderContainer';
import Error from '../ui/Error';
import { randomValue } from '../../GenerateCartCode';
import Footer from '../ui/Footer';


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
        setProducts(res.data); // Set the data when the API call is successful
        setLoading(false); // Set loading to false when the API call is successful
        setError(""); // Clear the error message when the API call is successful
      })
      .catch(err => {
        console.error(err.message); // Handle any errors here
        setLoading(false); // Set loading to false when the API call fails
        setError(err.message); // Set the error message when the API call fails
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
