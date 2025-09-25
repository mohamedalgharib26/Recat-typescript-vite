/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useState, useCallback, memo } from "react";
import { fetchProducts } from "./store/Api/ReactQuery";
import AddProduct from "./AddProduct";
import toast from "react-hot-toast";

export interface Product {
  id: string;
  title: string;
}

interface ProductItemProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  DeleteProduct: (productId: string) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onAddToCart,
  DeleteProduct,
}) => {
  return (
    <div className="p-3 border border-gray-300 m-2 rounded">
      <h4 className="mb-2 font-semibold">{product.title}</h4>
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
        onClick={() => onAddToCart(product.id)}
      >
        Add to Cart
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={() => {
          console.log(
            "Button clicked, DeleteProduct:",
            DeleteProduct,
            typeof DeleteProduct
          );
          DeleteProduct(product.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export const MemoizedProductItem = memo(ProductItem);

const ProductList: React.FC<{}> = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  const handleAddToCart = useCallback((productId: string) => {
    console.log(`Adding product ${productId} to cart.`);
    setCartCount((prevCount) => prevCount + 1);
  }, []);

  const handleDeleteProduct = useCallback((productId: string) => {
    console.log("delete ", productId);
    // هنا يمكنك إضافة منطق الحذف الفعلي
  }, []);

  console.log(
    "handleDeleteProduct:",
    handleDeleteProduct,
    typeof handleDeleteProduct
  ); // debug
  const { data: products } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Cart Count: {cartCount}</h3>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <MemoizedProductItem
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            DeleteProduct={handleDeleteProduct}
          />
        ))}
      </div>
      <AddProduct
        onAddProduct={(product) =>
          toast.success(`Adding Product ${product.title}`)
        }
      />
    </div>
  );
};

export default ProductList;
