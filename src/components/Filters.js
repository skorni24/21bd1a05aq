import React, { useState } from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";

const Filters = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleApplyFilters = () => {
    onFilter({ category, company, rating, minPrice, maxPrice });
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      >
        <MenuItem value="Laptop">Laptop</MenuItem>
        <MenuItem value="Phone">Phone</MenuItem>
        <MenuItem value="Tablet">Tablet</MenuItem>
      </TextField>
      <TextField
        select
        label="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      >
        <MenuItem value="ANZ">ANZ</MenuItem>
        <MenuItem value="FLP">FLP</MenuItem>
        <MenuItem value="SNP">SNP</MenuItem>
      </TextField>
      <TextField
        label="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filters;
