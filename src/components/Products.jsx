// GetAllProducts.jsx
import React from 'react';
import { useGetAllProductsQuery, useGetProductQuery} from '../app/jewlApi';
import { useSelector } from 'react-redux';


const GetAllProducts = () => {
  const product = useSelector(state => state.products)
  console.log(product)
  const { data, isLoading } = useGetProductQuery(2);
  // const products = useSelector((state) => state.products);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        data.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))
      )}
    </>
  );
};

export default GetAllProducts;
