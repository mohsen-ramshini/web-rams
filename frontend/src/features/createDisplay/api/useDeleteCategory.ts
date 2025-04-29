import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


const apiUrl = 'http://localhost:8000'; 


const deleteCategory = async (data: { id: string }) => {
  const { id } = data;
  const response = await axios.delete(`${apiUrl}/categories/${id}`);
  return response.data;
};


export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory, 
    onSuccess: (data) => {
      
      console.log("Category deleted successfully:", data);
    },
    onError: (error) => {
      
      console.error("Error deleting category:", error);
    }
  });
};
