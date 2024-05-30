import React from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  return (
    <Container>
      {product ? (
        <>
          <Typography variant="h4">{product.productName}</Typography>
          <Typography variant="h6">{product.company}</Typography>
          <Typography>{`Category: ${product.category}`}</Typography>
          <Typography>{`Price: $${product.price}`}</Typography>
          <Typography>{`Rating: ${product.rating}`}</Typography>
          <Typography>{`Discount: ${product.discount}%`}</Typography>
          <Typography>{`Availability: ${product.availability}`}</Typography>
          <img src={product.image} alt={product.productName} style={{ width: '100%', height: 'auto' }} />
        </>
      ) : (
        <Typography>Product not found</Typography>
      )}
    </Container>
  );
};

export default ProductDetails;
