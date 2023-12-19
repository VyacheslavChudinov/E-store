import { TextField, debounce } from "@mui/material";
import { setProductParams } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useState } from "react";

function ProductSearch() {
  const dispatch = useAppDispatch();
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

  const debouncedSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setProductParams({ searchTerm: e.target.value, pageNumber: 1 }));
  }, 1000);

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e);
      }}
      value={searchTerm || ""}
    />
  );
}

export default ProductSearch;
