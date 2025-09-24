/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { MemoizedProductItem } from "./ProductsList";
import { useDeleteProductMutation, useGetAllProductsQuery } from "./store/Api";
// import { useSelector } from "react-redux";
// import { useAppDispatch, type RootState } from "./store";
// import { fetchProducts } from "./store/Thunks/ProductsThunk";

const Products = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  const handleAddToCart = useCallback((productId: string) => {
    console.log(`Adding product ${productId} to cart.`);
    setCartCount((prevCount) => prevCount + 1);
  }, []);

  // const dispatch = useAppDispatch();
  // const { items } = useSelector((state: RootState) => state.products);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]); // مهم: empty deps except dispatch
  const { data: items } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const handleDeleteProduct = useCallback(async (productId: string) => {
    try {
      const result = await deleteProduct(productId).unwrap();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <>
      {items && (
        <div>
          <h3>Cart Count: {cartCount}</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {items.map((product) => (
              <MemoizedProductItem
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                DeleteProduct={handleDeleteProduct}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
