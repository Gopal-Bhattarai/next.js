import { Container } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { SingleProduct } from '../APIs/SingleProduct';

const ProductDetail = ({products}) => {
console.log(products);
  return (
    <Container>
      {products && products.map(product=>{
        return (

          <div key={product._id}>
          <h1>Product Name: {product.productName}</h1>
          <h3>Description: <div dangerouslySetInnerHTML={{__html: product.description}} /></h3>
          </div>
          )
      })}
    </Container>
  )
}

export default ProductDetail

export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_SERVER_URL}/api/products/public`)
  const json = await response.json()

  return {
    props: {
      products: json
    }
  }
}
