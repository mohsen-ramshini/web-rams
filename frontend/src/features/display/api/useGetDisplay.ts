import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = 'http://localhost:8000'; 


const fetchDisplays = async () => {
  const response = await axios.get(`${apiUrl}/displays`);
  return response.data;
};

export const useGetDispllay = () => {
  return useQuery({
    queryKey: ['displays'], 
    queryFn: fetchDisplays, 
  });
};
