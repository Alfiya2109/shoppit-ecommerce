import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeCard.module.css'; // Ensure the correct CSS module import
import { BASE_URL } from '../../api';
import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';

const HomeCard = ({ product }) => {
  
  // Ensure product is passed and contains the necessary fields
  if (!product) {
    return null; // or some fallback UI if product is not provided
  } 

  return (
    <>
    {/* <NavBar/> */}
    <div className={`col-md-3 ${styles.col}`}>
      <Link to={`/products/${product.slug }`} className={styles.link}>
        <div className={styles.card}>
          <div className={styles.cardImgWrapper}>
            {/* Ensure that product.imageUrl or similar prop exists */}
            <img
              src={product.image ? (product.image.startsWith('http') ? product.image : `${BASE_URL}/${product.image}`) : '/default-image.jpg'} // Support both http and local urls
              className={styles.cardImgTop}
              alt={product.name}
            />
          </div>
          <div className={styles.cardBody}>
            <h5 className={`${styles.cardTitle} mb-1`}>{product.name}</h5>
            <h6 className={styles.cardText}>${product.price}</h6> {/* Dynamically display the price */}
          </div>
        </div>
      </Link>
    </div>
    {/* <Footer/> */}
    </>
  );
};

export default HomeCard;
