import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
interface Props {
  products: Product[];
}
export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={3}>
      {products.map((prod: Product) => (
        <Grid key={prod.id} item xs={4}>
          <ProductCard product={prod} />
        </Grid>
      ))}
    </Grid>
  );
}
