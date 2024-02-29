// GetAllProducts.jsx
// import React from 'react';
import { useGetAllProductsQuery, } from '../app/api';
// import { useSelector } from 'react-redux';


const GetAllProducts = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();

  // Log the API data
  console.log(data); 
  
 

  return (

    <div>
  {isLoading && <p>Loading...</p>}
  {error && <p>Error: {error}</p>}
  {data && (
    <div>
      {data.map((product) => (
        <div key={product.id}>
          {/* <img
            src={`data:image/png;base64, ${product.image}`}
            alt="Product Image"
          /> */}
          <p>{product.name}</p>
          <p>${product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default GetAllProducts;
