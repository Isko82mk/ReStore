import { Button } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductLIst";

interface Props {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog({ products }: Props) {
  return (
    <>
      <ProductList products={products} />
      <Button fullWidth variant="contained">
        Add Product
      </Button>
    </>
  );
}
