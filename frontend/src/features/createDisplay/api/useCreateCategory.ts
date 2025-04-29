import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// آدرس API
const apiUrl = 'http://localhost:8000'; 

// تابع ایجاد دسته‌بندی
const createCategory = async (category: { name: string,description:string,categoryColor:string,keyword:string }) => {
  const response = await axios.post(`${apiUrl}/categories`, category);
  return response.data;
};


export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory, 
    onSuccess: (data) => {
      
      console.log("Category created successfully:", data);
    },
    onError: (error) => {
      
      console.error("Error creating category:", error);
    }
  });
};
