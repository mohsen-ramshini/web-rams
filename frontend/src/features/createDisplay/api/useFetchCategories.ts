import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = 'http://localhost:8000'; 


const fetchCategories = async () => {
  const response = await axios.get(`${apiUrl}/categories`);
  return response.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'], 
    queryFn: fetchCategories, 
  });
};
