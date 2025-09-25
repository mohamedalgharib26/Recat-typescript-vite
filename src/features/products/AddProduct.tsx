/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
// import { useMutate } from "./CustomMutation";
import type { Product } from "./ProductsList";
// import { useState } from "react";
import { useSelector } from "react-redux";
// import RootState from your store
import type { RootState } from "../../store";
import { useAppDispatch } from "../../store";
import { useAddProductMutation } from "../../store/Api";
import { setLoading, setError } from "../../store/ui/UiSlice";

// define form data type
type AddProductFormData = {
  id: string;
  title: string;
};
interface AddProductProps {
  onAddProduct: (product: Product) => void;
}
const AddProduct: React.FC<AddProductProps> = ({ onAddProduct }) => {
  // Initialize form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductFormData>();

  // const { mutate, loading, error, data } = useMutate<
  //   AddProductFormData,
  //   AddProductFormData
  // >("http://localhost:3000/products", {
  //   onSuccess: () => {
  //     console.log("تم إضافة المنتج بنجاح");
  //     reset(); // Reset form after success
  //   },
  //   onError: (err) => {
  //     console.error("حصل خطأ:", err);
  //   },
  // });
  const dispatch = useAppDispatch();
  const error = useSelector((s: RootState) => s.ui.error);
  const [addProduct, { isLoading: loading, data }] = useAddProductMutation();
  // handle form submit
  const onSubmit: SubmitHandler<AddProductFormData> = async (formData) => {
    const dataObject = { ...formData, id: Date.now().toString() } as Product;
    try {
      dispatch(setLoading(true));

      await addProduct(dataObject).unwrap();
      console.log("done ", data);
      onAddProduct(data);
    } catch (err: any) {
      // setError(err.data);
      console.log(err.error);
      dispatch(setError(err.error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 rounded-4xl mt-2.5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Product Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm/6 font-semibold text-white"
            >
              Product Title
            </label>
            <div className="mt-2.5">
              <input
                id="title"
                type="text"
                placeholder="Enter product title"
                {...register("title", {
                  required: "Product title is required",
                })}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500 text-sm mt-3">Error: {error}</p>}

        {/* Success Data */}
        {data && (
          <p className="text-green-500 text-sm mt-3">
            Product added: {data.title}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
