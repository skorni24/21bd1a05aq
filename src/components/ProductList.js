import React, { useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import Filters from './Filters';
import { products } from '../data/products';

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  console.log('--filters--',products);
  const handleFilter = (filters) => {
    let filtered = products;
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    if (filters.company) {
      filtered = filtered.filter(product => product.company === filters.company);
    }
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice);
    }
    setFilteredProducts(filtered);
    console.log(filtered);
  };
  console.log('--filtered products--',filteredProducts);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>All Products</Typography>
      <Filters onFilter={handleFilter} />
      <Grid container spacing={2}>
        {filteredProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
