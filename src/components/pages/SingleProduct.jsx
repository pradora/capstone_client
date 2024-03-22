import React ,{ useState,useEffect } from 'react';
import { useGetSingleProductQuery } from '../../app/api';
import { useParams } from 'react-router-dom';
import "./SingleProduct.css";
import { Helmet } from 'react-helmet';
function SingleProduct() {
  const { id } = useParams();
  console.log('ID from URL:', id); // Log the id value to the console

  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
  } = useGetSingleProductQuery(id);
  console.log(productData)

  const [productName, setProductName] = useState('');

  useEffect(() => {
    if (productData) {
      setProductName(productData.name);
    }
  }, [productData]);
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>{productName}</title>
        <link rel="icon" type="image/png" href="/path/to/your/favicon.png" />
      </Helmet>
      <section className='SingleProduct'>
        {productLoading && <p>Loading product data...</p>}
        {productError && <p>Error loading product data.</p>}
        {productData && (
          <article className="SingleProduct-container" key={productData.id}>
            <br />
            <h1>{productData.name}</h1>
            <img
                className='ProductsImg'
                src={`data:image/png;base64, ${productData.image}`}
                alt="Product Image"
              />
            <br />
            <br />
            <p>Price: ${productData.price}</p>
            <br />
            <p>Description: <br /> {productData.description}</p>
            <br />
            <br />
            <p>Class: <br />{productData.class}</p>
            <br />
            <p>Stock: <br /> {productData.stock}</p>
            <br />
            <button>Add to Cart</button>
          </article>
        )}
      </section>
    </>
  );
}

export default SingleProduct;
