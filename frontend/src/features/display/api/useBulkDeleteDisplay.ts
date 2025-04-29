import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = 'http://localhost:8000';


const bulkDeleteDisplays = async ({ ids }: { ids: string[] }) => {
    const response = await axios.delete(`${apiUrl}/displays/bulk`, {
      data: { ids }, 
    });
    return response.data;
  };
  
  export const useBulkDeleteDisplays = () => {
    return useMutation({
      mutationFn: bulkDeleteDisplays,
      onSuccess: (data) => {
        console.log('Displays deleted successfully:', data);
      },
      onError: (error) => {
        console.error('Error in bulk delete:', error);
      },
    });
  };
  