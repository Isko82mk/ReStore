import { useEffect, useState } from "react";
import "../../app/layout/styles.css";
import { Product } from "../models/product";
import Catalog from "../../feature/catalog/Catalog";
import { Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/Products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {}

  return (
    <div>
      <Typography variant="h1">Re-Store</Typography>
      <Catalog products={products} addProduct={addProduct} />
    </div>
  );
}

export default App;
