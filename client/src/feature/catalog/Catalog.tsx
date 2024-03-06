import { Product } from "../../app/models/product";
import ProductList from "./ProductLIst";
import { useEffect, useState } from "react";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/Products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return "L O A D I N G . . . ";
  if (!products) return "No products are found";
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
