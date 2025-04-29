import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


const apiUrl = 'http://localhost:8000'; 


const createDisplay = async (display: {     
    id: string;
    title: any;
    description: any;
    keywords: any;
    categoryId: any;
    displayType: any;
    brand: any;
    serialNumber: any;
    sound: any;
    createDate: Date;
    displaySize: any;
    horizontalNumber: any;
    verticalNumber: any;
    aspectRatio: any; }) => {
  const response = await axios.post(`${apiUrl}/displays`, display);
  return response.data; 
};


export const useCreateDisplay = () => {
  return useMutation({
    mutationFn: createDisplay, 
    onSuccess: (data) => {
      console.log('Display created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating display:', error);
    }
  });
};
