import React from 'react';
import { useGetAllProductsQuery } from '../../app/api';
import "./Products.css";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const handleMoreDetails = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Products</title>
        <link rel="icon" type="image/png" href="/path/to/your/favicon.png" />
      </Helmet>
      <section className='Products'>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <article className='product-container'>
            {data.map((product) => (
              <div className='card' key={product.id}>
                <img
                  className='ProductsImg'
                  src={`data:image/png;base64, ${product.image}`}
                  alt="Product Image"
                />

                <h2>{product.name}</h2>

                <div className="button-container">
                  <button className="add_to_cart_button">Add to Cart</button>
                  <button type="button" className="see_details_button" onClick={() => handleMoreDetails(product.id)}>See Details</button>
                </div>
              </div>
            ))}
          </article>
        )}
      </section>
    </>
  );
};

export default Products;
