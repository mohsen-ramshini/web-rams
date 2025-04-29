import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = 'http://localhost:8000';

const deleteDisplay = async ({ id }: { id: string }) => {
  const response = await axios.delete(`${apiUrl}/displays/${id}`);
  return response.data;
};

export const useDeleteDisplay = () => {
  return useMutation({
    mutationFn: deleteDisplay,
    onSuccess: (data) => {
      console.log('Display deleted successfully:', data);
    },
    onError: (error) => {
      console.error('Error deleting display:', error);
    },
  });
};
