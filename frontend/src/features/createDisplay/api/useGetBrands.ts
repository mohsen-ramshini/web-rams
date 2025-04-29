import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = 'http://localhost:8000'; 


const fetchBrands = async () => {
  const response = await axios.get(`${apiUrl}/brands`);
  return response.data;
};

export const useGetBrands = () => {
  return useQuery({
    queryKey: ['brands'], 
    queryFn: fetchBrands, 
  });
};
