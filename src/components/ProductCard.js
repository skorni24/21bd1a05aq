import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.productName}</Typography>
        <Typography variant="body2" color="textSecondary">{product.company}</Typography>
        <Typography variant="body2">{`$${product.price}`}</Typography>
        <Typography variant="body2">{`Rating: ${product.rating}`}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/product/${product.id}`}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
