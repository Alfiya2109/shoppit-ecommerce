import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo"; // Ensure correct import
import OrderHistoryItemContainer from "./OrderHistoryItemContainer"; // Ensure correct import
import api from "../../api";
import NavBar from "../ui/NavBar";
import Footer from "../ui/Footer";
import Spinner from "../ui/Spinner";

const UserProfilePage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [orderitems,setOrderitems] = useState([]);
    const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true); // Set loading to true before making API call
    api.get("user_info/")
      .then((res) => {
        setLoading(false); // Once data is fetched, set loading to false
        console.log("all data",res.data);
        setOrderitems(res.data.items)
        console.log(orderitems)

        // console.log(res.data.items)
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false); // Once error occurs, set loading to false
      });
  }, []); // Empty dependency array ensures this runs only once

  if(loading){
    return <Spinner loading={loading}/>
  }




  return (
    <>
    <NavBar/>
    <div className="container my-5">
      {/* Profile Header */}
      <UserInfo userInfo={userInfo}/>

      {/* Order History */}
      {/* <OrderHistoryItemContainer orderitems={orderitems}/> */}
    </div>
    <Footer/>
    </>
  );
};

export default UserProfilePage; 