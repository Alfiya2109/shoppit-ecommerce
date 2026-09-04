import React from 'react';
import HomeCard from '../Home/HomeCard';

const RelatedProducts = ({ products }) => {
    // console.log(products);
    
    return (
        <section className="py-3 bg-light">
            <div className="container px-4 px-lg-5 mt-3">
                <h2 className="fw-bolder mb-4">Related Products</h2>
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <HomeCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No related products found</p>  // Fallback message
                    )}
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;