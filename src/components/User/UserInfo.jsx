import React, { useContext } from "react";
import styles from "./UserInfo.module.css"; // Ensure CSS exists
import pic from "../../assets/profile.png"; // Check if image is correctly placed
import { AuthContext } from "../../context/AuthContext";

const UserInfo = ({ userInfo }) => {
  console.log(userInfo);
  const { username = "Guest" } = useContext(AuthContext); // Ensure a fallback value

  return (
    <div className="row mb-4">
      {/* User Profile Section */}
      <div className="col-md-3 py-3 card text-center">
        <img
          src={pic}
          alt="User Profile"
          className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`}
        />
        <h4>{username}</h4>
        <p className="text-muted">{userInfo.email}</p>
        <button className="btn mt-2" style={{ backgroundColor: "#6050DC", color: "white" }}>
          Edit Profile
        </button>
      </div>

      {/* User Details Section */}
      <div className="col-md-9">
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "#6050DC", color: "white" }}>
            <h5>Account Overview</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
              <p>
                  <strong>Member Since: </strong> {userInfo.username}
                </p>
                <p>
                  <strong>Username: </strong> {`${userInfo.first_name} ${userInfo.last_name}`}
                </p>
                <p>
                  <strong>Email: </strong> {userInfo.email}
                </p>
                {/* <p>
                  <strong>Phone: </strong> {userInfo.phone}
                </p> */}
              </div>
              <div className="col-md-6">
                {/* <p>
                  <strong>City: </strong> {userInfo.city}
                </p> */}
                {/* <p>
                  <strong>Country: </strong> {userInfo.state}
                </p> */}
                <p>
                  {/* <strong>Member Since: </strong> {userInfo.username} */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
