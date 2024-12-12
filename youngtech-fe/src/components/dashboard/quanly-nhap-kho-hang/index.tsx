'use client'
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Schema với Yup
const schema = yup.object({
  productName: yup.string().required("Tên hàng là bắt buộc"),
  description: yup.string().required("Mô tả là bắt buộc"),
  brand: yup.string().required("Thương hiệu là bắt buộc"),
  productPrice: yup
    .number()
    .typeError("Giá phải là số")
    .required("Giá là bắt buộc")
    .min(0, "Giá phải lớn hơn hoặc bằng 0"),
  quantity: yup
    .number()
    .typeError("Số lượng phải là số")
    .required("Số lượng là bắt buộc")
    .min(1, "Số lượng phải ít nhất là 1"),
  supplier_id: yup.string().required("Nhà cung cấp là bắt buộc"),
  childCategory_id: yup.string().required("ChildCategory là bắt buộc"),
});

// Kiểu dữ liệu cho form
interface FormInputs {
  productName: string;
  productPrice: number;
  quantity: number;
  supplier_id: string;
  childCategory_id:string;
  description: string
  brand: string
}

const errorMapping: { [key: string]: keyof FormInputs } = {
  productName: "productName",
  productPrice: "productPrice",
  quantity: "quantity",
  supplier_id: "supplier_id",
  description: "description",
  brand: "brand",
  childCategory_id: "childCategory_id"
};

export default function WarehouseManagement() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue, // Để đặt giá trị mặc định
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  // React Query để fetch danh sách nhà cung cấp
  const { data: suppliers, isLoading, isError } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3200/api/suppliers?limit=100&offset=0");
      return response.data;
    },
  });

  // React Query để fetch danh sách nhà cung cấp
  const { data: childCategories, isLoading  : isLoading_childCategory, isError: isError_childCategory } = useQuery({
    queryKey: ["childCategories"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3200/api/childcategories?limit=100&page=1");
      return response.data;
    },
  });

  // Đặt giá trị mặc định khi danh sách nhà cung cấp được tải
  useEffect(() => {
    if (suppliers && suppliers.data.length > 0) {
      setValue("supplier_id", suppliers.data[0].id); // Đặt giá trị mặc định
    }
    if (childCategories && childCategories.data.length > 0) {
      setValue("childCategory_id", childCategories.data[0].id); // Đặt giá trị mặc định
    }
  }, [suppliers, setValue]);

  // Xử lý khi submit form
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log("Submitted data:", data);
    const {   productName,
      productPrice,
      description,
      quantity,
      brand,
      childCategory_id,
      supplier_id} = data
      console.log(productName,
        productPrice,
        description,
        quantity,
        brand,
        childCategory_id,
        supplier_id)
        // const param = new URLSearchParams(data)
        
    const response = await axios.get(`http://localhost:3200/api/product/validate`, {
      params: {
        productName,
        productPrice,
        description,
        quantity,
        brand,
        childCategory_id,
        supplier_id
      }
    });
    console.log('data',response.data.errors)
    if (response.data.errors) {
      (Object.entries(response.data.errors).map(([key, message]) => {
        const formKey = errorMapping[key]; // Lấy khóa form từ ánh xạ
         if (formKey) {
         setError(formKey, {
        type: "server",
        message: message as string,
           });
        }
      }
      ))
    }
    else {
    // return response.data;
    alert("Nhập kho thành công!");
    reset();
    }
    

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[600px] p-8 bg-white shadow-lg rounded border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-6">NHẬP KHO</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tên hàng */}
          <div>
            <label className="block text-sm font-semibold mb-2">Tên hàng</label>
            <input
              {...register("productName")}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>
            )}
          </div>

          {/* mo ta */}
          <div>
            <label className="block text-sm font-semibold mb-2">Mô tả</label>
            <input
              {...register("description")}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

               {/* thuong hieu */}
               <div>
            <label className="block text-sm font-semibold mb-2">Thương hiệu</label>
            <input
              {...register("brand")}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
            )}
          </div>

          {/* Giá */}
          <div>
            <label className="block text-sm font-semibold mb-2">Giá</label>
            <input
              {...register("productPrice")}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.productPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.productPrice.message}</p>
            )}
          </div>

          {/* Số lượng */}
          <div>
            <label className="block text-sm font-semibold mb-2">Số lượng</label>
            <input
              type="number"
              {...register("quantity")}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
            )}
          </div>

          {/* Nhà cung cấp */}
          <div>
            <label className="block text-sm font-semibold mb-2">Nhà cung cấp</label>
            <select
              {...register("supplier_id")}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoading && <option>Đang tải...</option>}
              {isError && <option>Không thể tải danh sách</option>}
              {suppliers &&
                suppliers.data.map((supplier: any) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.supplierName}
                  </option>
                ))}
            </select>
            {errors.supplier_id && (
              <p className="text-red-500 text-sm mt-1">{errors.supplier_id.message}</p>
            )}
          </div>

          {/*childCategories */}
          <div>
            <label className="block text-sm font-semibold mb-2">Child Categories</label>
            <select
              {...register("childCategory_id")}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoading_childCategory && <option>Đang tải...</option>}
              {isError_childCategory && <option>Không thể tải danh sách</option>}
              {childCategories &&
                childCategories.data.map((supplier: any) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.childCateName}
                  </option>
                ))}
            </select>
            {errors.childCategory_id && (
              <p className="text-red-500 text-sm mt-1">{errors.childCategory_id.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button className="w-[33%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Xem lại
            </button>
            <button type="submit" className="w-[33%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Nhập thêm
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="w-[33%] bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
