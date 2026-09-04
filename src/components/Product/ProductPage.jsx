import React, { useEffect, useState } from 'react';
import ProductPagePlaceHolder from './ProductPagePlaceHolder'; // Assuming this is the correct import
import RelatedProducts from './RelatedProducts'; // Assuming this is the correct import
import { useParams } from 'react-router-dom';
import api from '../../api'; // Importing the api module
import { BASE_URL } from '../../api';
import { toast } from 'react-toastify';
import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';

const ProductPage = ({ setNumCartItems }) => {
    // console.log(setNumCartItems)
    const { slug } = useParams();
    const [product, setProduct] = useState(null); // Initialize as null to check for loading state
    const [similarProducts, setSimilarProducts] = useState([]); // State to hold similar products
    const [loading, setLoading] = useState(true); // Set loading state to true initially
    const[inCart, setInCart] = useState(false); // Set loading state to false
    const cart_code = localStorage.getItem('cart_code');


    useEffect(() => {
        if (product && product.id) {
            api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
                .then(res => {
                    console.log(res.data);
                    setInCart(res.data.product_in_cart);
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }, [cart_code, product]);








    const newItem = { cart_code: cart_code, product_id: product ? product.id : null };
    function add_item(){
        api.post("add_item/",newItem)
        .then(res =>{
            console.log(res.data)
            setInCart(true);
            toast.success("Product added to card successfully!")
            setNumCartItems(curr => curr + 1)
        })
       .catch(err =>{
           console.log(err.message)
       })
    }




    






  useEffect(() => {
    api.get(`product_detail/${slug}`)
        .then(res => {
            // Check the response structure
            // console.log(res.data.similar_products);  // Ensure that similarProducts is present in the response
            setProduct(res.data);  // Set the product data
            setSimilarProducts(res.data.similar_products || []);  // Set the similar products
            setLoading(false);  // Once data is fetched, set loading to false
        })
        .catch(err => {
            console.log(err.message);  // Log any errors during the API call
            setLoading(false);  // Set loading to false even if there's an error
        });
}, [slug]);

    

    if (loading || !product) {
        return <ProductPagePlaceHolder />; // Show placeholder while loading or if product is not available
    }

    return (
        <>
        <NavBar/>
        <div>
            <section className="py-3">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                        <img
                            className="card-img-top mb-5 mb-md-0"
                            src={product.image} // Correctly concatenate the base URL and image path
                            alt={product.name || 'Product Image'}
                            style={{ width: '80%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} // Adjusted size, added shadow for better styling
                        />
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1 text-muted">SKU: {product.sku || 'N/A'}</div> {/* Display SKU if available */}
                            <h1 className="display-5 fw-bolder text-black" style={{ fontSize: '32px', marginBottom: '15px' }}>{product.name || 'Product Name'}</h1> {/* Fallback for name */}
                            <div className="mb-3">
                                <span className="fw-bold text-dark" style={{ fontSize: '1.75rem', marginRight: '10px' }}>Price: {`$${product.price || '0.00'}`}</span> {/* Fallback for price */}
                            </div>
                            <p className="lead" style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555' }}>
                                <span style={{ fontWeight: 'bold', color: '#333' }}>Product Description:</span>
                                <br />
                                <span style={{ fontStyle: 'italic' }}>{product.description || 'No description available.'}</span> {/* Fallback for description */}
                            </p>
                            <div className="d-flex">
                                <input
                                    className="form-control text-center me-3"
                                    id="inputQuantity"
                                    type="number"
                                    defaultValue="1"
                                    style={{ maxWidth: "3rem" }}
                                />
                                <button
                                    className="btn btn-outline-dark flex-shrink-0"
                                    type="button"
                                    onClick={()=>{
                                        add_item();
                                        alert("Your item has been added successfully!")
                                    }}
                                    disabled={inCart} // Disable add to cart button if in cart
                                >
                                    <i className="bi-cart-fill me-1"></i>
                                    {inCart ? "Product added to cart" : "Add to cart"}
                                </button> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RelatedProducts products={similarProducts} />
        </div>
        <Footer/>
        </>
    );
};

export default ProductPage;