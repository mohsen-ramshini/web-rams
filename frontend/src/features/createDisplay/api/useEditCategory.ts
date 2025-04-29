import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = 'http://localhost:8000'; 


const editCategory = async ({ id, category }: { id: string, category: { name: string, description: string, categoryColor: string, keyword: string } }) => {
  const response = await axios.patch(`${apiUrl}/categories/${id}`, category);
  return response.data;
};


export const useEditCategory = () => {
  return useMutation({
    mutationFn: editCategory,
    onSuccess: (data) => {
      console.log("Category updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating category:", error);
    }
  });
};
