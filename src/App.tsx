// import { useState, useEffect } from "react";
// import ProductList, { type Product } from "./ProductsList";
// import AddProduct from "./AddProduct";
// import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Layout from "./Layout";
import Posts from "./Posts";
import Navbar from "./Components/Navbar";
import ProductList from "./features/products/ProductsList";
import TodoList from "./features/todos/TodoList";
import Users from "./features/users/Users";
// import ErrorBoundary from "./ErrorBoundary";
// import Posts from "./Posts";
// import Loader from "./Loader";
// import AddProduct from "./AddProduct";
// import Products from "./Products";
// import TodoList from "./todos/TodoList";
// import Users from "./Users";

function App() {
  // // 1️⃣ state موحد للـ products
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // // 2️⃣ fetch مرة واحدة
  // useEffect(() => {
  //   fetch("http://localhost:3000/products")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("خطأ في التحميل");
  //       return res.json();
  //     })
  //     .then((data: Product[]) => {
  //       setProducts(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  // 3️⃣ لما يضيف منتج جديد
  // const handleAddProduct = (newProduct: Product) => {
  //   setProducts((prev) => [...prev, newProduct]);
  // };
  // const log = () => console.log("doneee");
  return (
    // <div>
    //   <ProductList products={products} loading={loading} error={error} />
    //   <AddProduct onAddProduct={handleAddProduct} />
    // </div>

    <>
      {/* <Products />
      <AddProduct onAddProduct={log} />
       */}
      <Layout>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/posts" element={<Posts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/" element={<Users />} />
          </Routes>
        </BrowserRouter>{" "}
      </Layout>
    </>
  );
}

export default App;
