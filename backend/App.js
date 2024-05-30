require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cacheManager = require("cache-manager");
const memoryCache = cacheManager.caching({
  store: "memory",
  max: 1000,
  ttl: 60,
});
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDc0MzMzLCJpYXQiOjE3MTcwNzQwMzMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjRjMDg3NmVlLTE3MWEtNDZmZC04Y2Q3LTczNjFjMmNmNWIwMCIsInN1YiI6InNyaW5pdmFza29ybmkyNEBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJETWFydCIsImNsaWVudElEIjoiNGMwODc2ZWUtMTcxYS00NmZkLThjZDctNzM2MWMyY2Y1YjAwIiwiY2xpZW50U2VjcmV0IjoieGtUZk1Dak53ZEltSkxudyIsIm93bmVyTmFtZSI6IlNyaW5pdmFzIiwib3duZXJFbWFpbCI6InNyaW5pdmFza29ybmkyNEBnbWFpbC5jb20iLCJyb2xsTm8iOiIxIn0.PpjJCbPxjaccMFccNB6g-2Go_TI1Hu2E7oECjMtvXdE";
const app = express();
const port = 8000;

async function register() {
  try {
    const response = await axios.post(
      "http://20.244.56.144/test/register",
      {
        CompanyName: "DMart",
        OwnerName: "Srinivas",
        RollNo: "1",
        OwnerEmail: "rahul@abc.edu",
        accessCode: "EKDLjg",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    // Handle the response here
  } catch (error) {
    console.error("Error registering with test server:", error);
  }
}

register();

const fetchProductData = async (
  category,
  company,
  accessToken,
  minPrice,
  maxPrice
) => {
  const cacheKey = `${category}-${company}-${minPrice}-${maxPrice}`;
  const cachedData = await memoryCache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(
      `https://20.244.56.144/test/companies/${companyname}/categories/${category}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        params: {
          minPrice,
          maxPrice,
        },
      }
    );
    const productData = response.data;
    await memoryCache.set(cacheKey, productData, { ttl: 300 });
    return productData;
  } catch (error) {
    console.error(
      `Error fetching product data for ${category} from ${company}`,
      error
    );
    throw error;
  }
};

app.get(
  "/companies/:companyname/categories/:categoryname/products",
  async (req, res) => {
    const companyName = req.params.companyname;
    const category = req.params.categoryname;
    const n = req.query.top || 10;
    const minPrice = req.query.minPrice || 0;
    const maxPrice = req.query.maxPrice || Infinity;

    try {
      const companyIndex = accessTokens.findIndex((token) =>
        token.startsWith(`${companyName}_`)
      );
      if (companyIndex === -1) {
        return res.status(404).json({ error: "Company not found" });
      }

      const accessToken = accessTokens[companyIndex].split("_")[1];
      const productData = await fetchProductData(
        category,
        companyName,
        accessToken,
        minPrice,
        maxPrice
      );

      const sortedProducts = productData.sort((a, b) => b.price - a.price);
      const topProducts = sortedProducts.slice(0, n);

      res.json(topProducts);
    } catch (error) {
      console.error("Error fetching product data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
