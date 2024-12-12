'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/Store';
import { addProductToTemp, resetError, updateProduct } from '@/redux/WareHouseManagement/WareHouseMannagementSlice';
import { useRouter } from 'next/navigation';

interface EditProduct {
    selectedProduct: any
    handleCloseModal: any
}


interface FormInputs {
    productName: string;
    productPrice: number;
    quantity: number;
    supplier_id: string;
    childCategory_id: string;
    description: string;
    brand: string;
  }
  
  // Mapping server-side validation errors to form fields
  const errorMapping: { [key: string]: keyof FormInputs } = {
    productName: 'productName',
    productPrice: 'productPrice',
    quantity: 'quantity',
    supplier_id: 'supplier_id',
    description: 'description',
    brand: 'brand',
    childCategory_id: 'childCategory_id',
  };

  // Validation schema using Yup
  const schema = yup.object({
    productName: yup.string().required('Tên hàng là bắt buộc'),
    description: yup.string().required('Mô tả là bắt buộc'),
    brand: yup.string().required('Thương hiệu là bắt buộc'),
    productPrice: yup
      .number()
      .typeError('Giá phải là số')
      .required('Giá là bắt buộc')
      .min(0, 'Giá phải lớn hơn hoặc bằng 0'),
    quantity: yup
      .number()
      .typeError('Số lượng phải là số')
      .required('Số lượng là bắt buộc')
      .min(1, 'Số lượng phải ít nhất là 1'),
    supplier_id: yup.string().required('Nhà cung cấp là bắt buộc'),
    childCategory_id: yup.string().required('ChildCategory là bắt buộc'),
  });

const EditProduct = (props: EditProduct) => {
    const {selectedProduct, handleCloseModal}  = props
    const dispatch = useDispatch<AppDispatch>();
    const {  isError: isErrorStore, wareHouseMannagementItems } = useSelector((state: RootState) => state.wareHouseMannagement);
    const firstRender = useRef(true)

    const router = useRouter()
    const {
      register,
      handleSubmit,
      reset,
      setError,
      setValue,
      formState: { errors },
    } = useForm<FormInputs>({
      resolver: yupResolver(schema),
    });

    const handleClose = () => {
        dispatch(resetError())
        handleCloseModal()
    }
  
    // Fetch suppliers using React Query
    const { data: suppliers, isLoading: isLoadingSuppliers, isError: isErrorSuppliers } = useQuery(
      ['suppliers'],
      async () => {
        const response = await axios.get('http://localhost:3200/api/suppliers?limit=100&offset=0');
        return response.data;
      }
    );
  
    // Fetch child categories using React Query
    const {
      data: childCategories,
      isLoading: isLoadingCategories,
      isError: isErrorCategories,
    } = useQuery(['childCategories'], async () => {
      const response = await axios.get('http://localhost:3200/api/childcategories?limit=100&page=1');
      return response.data;
    });
  
    // Set default values for supplier and child category fields when data is loaded
    useEffect(() => {
      if (suppliers && suppliers.data.length > 0) {
        setValue('supplier_id', suppliers.data[0].id);
      }
      if (childCategories && childCategories.data.length > 0) {
        setValue('childCategory_id', childCategories.data[0].id);
      }
    }, [suppliers, childCategories, setValue]);
  
    // Form submission handler
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        firstRender.current = false
      try {
        const response = await axios.get('http://localhost:3200/api/product/validate', {
          params: data,
        });
  
        if (response.data.errors) {
          Object.entries(response.data.errors).forEach(([key, message]) => {
            const formKey = errorMapping[key];
            if (formKey) {
              setError(formKey, { type: 'server', message: message as string });
            }
          });
        } else {
          dispatch(updateProduct({data: data, id: selectedProduct.id }))
        }
      } catch (error) {
        console.error('Error validating product:', error);
      }
    };
    
    useEffect(() => {
       
        if (selectedProduct) {
            Object.entries(selectedProduct).map(([key,value]) => {
                const formKey = errorMapping[key];
                if (formKey) {
                  setValue(formKey, value as any);
                }
            })
        }
    }, [selectedProduct])

    useEffect(() => {
        console.log(firstRender.current, isErrorStore, 'hr')
        if (isErrorStore) {
            setError('productName',{ type: 'store', message: 'Sản phẩm đã tồn tại'})
        } else {
            if (!firstRender.current) {
                handleCloseModal()
            }
        }
    }, [isErrorStore, wareHouseMannagementItems])
  
    return <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-[100%] max-w-md">
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-[600px] p-8 bg-white shadow-lg rounded border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-6">Chỉnh sửa sản phẩm</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Tên hàng</label>
            <input
              {...register('productName')}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Mô tả</label>
            <input
              {...register('description')}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-semibold mb-2">Thương hiệu</label>
            <input
              {...register('brand')}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-sm font-semibold mb-2">Giá</label>
            <input
              {...register('productPrice')}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.productPrice && <p className="text-red-500 text-sm mt-1">{errors.productPrice.message}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold mb-2">Số lượng</label>
            <input
              type="number"
              {...register('quantity')}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
          </div>

          {/* Supplier */}
          <div>
            <label className="block text-sm font-semibold mb-2">Nhà cung cấp</label>
            <select
              {...register('supplier_id')}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoadingSuppliers && <option>Đang tải...</option>}
              {isErrorSuppliers && <option>Không thể tải danh sách</option>}
              {suppliers &&
                suppliers.data.map((supplier: any) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.supplierName}
                  </option>
                ))}
            </select>
            {errors.supplier_id && <p className="text-red-500 text-sm mt-1">{errors.supplier_id.message}</p>}
          </div>

          {/* Child Categories */}
          <div>
            <label className="block text-sm font-semibold mb-2">Child Categories</label>
            <select
              {...register('childCategory_id')}
              className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoadingCategories && <option>Đang tải...</option>}
              {isErrorCategories && <option>Không thể tải danh sách</option>}
              {childCategories &&
                childCategories.data.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.childCateName}
                  </option>
                ))}
            </select>
            {errors.childCategory_id && <p className="text-red-500 text-sm mt-1">{errors.childCategory_id.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button type="submit" className="w-[33%] bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Cập nhật
            </button>
            <button
              type="button"
              onClick={handleClose}
            //   onClick={() => reset()}
              className="w-[33%] bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
             Đóng
            </button>
          </div>
        </form>
                </div>
             </div>
          </div>
        </div></>
}

export default EditProduct