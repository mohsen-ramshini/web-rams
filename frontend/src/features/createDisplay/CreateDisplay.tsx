import React, { useEffect, useState } from 'react';
import { Layout, Select,  message } from 'antd';
import Flag from 'react-world-flags'; 
import StepProgress from './components/StepProgress';
import GeneralForm from './components/GeneralForm';
import Specifications from './components/Specification';
import { Link } from 'react-router-dom';
import { useCreateDisplay } from './api/useCreateDisplay'; 
import { useCategories } from './api/useFetchCategories'; 
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Option } = Select;

const CreateDisplay: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [generalFormData, setGeneralFormData] = useState<any>(null);
  const [specificationData, setSpecificationData] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]); 

  
  const { mutate } = useCreateDisplay();
  const { data: categoriesData } = useCategories();

  const navigate = useNavigate();

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const goToNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  
  useEffect(() => {
    if (generalFormData && generalFormData.category) {
      
      if (categoriesData) {
        const selectedCategory = categoriesData.find(
          (cat: any) => cat.id === generalFormData.category
        );
        if (selectedCategory) {
          setCategories([selectedCategory]); 
        }
      }
    }
  }, [generalFormData, categoriesData]);

  const handleFinalSubmit = async (specData?: any) => {
    const finalSpecData = specData || specificationData;
  
    console.log("Using specification data:", finalSpecData);
  
    const displayData = {
      id: `display${Date.now()}`,
      title: generalFormData?.name || "",
      description: categories?.[0]?.description || "",
      keywords: categories?.[0]?.keyword || "",
      categoryId: generalFormData?.category || null,
      displayType: finalSpecData?.displayType || "",
      brand: finalSpecData?.brand || null,
      serialNumber: finalSpecData?.serialNumber || "",
      sound: finalSpecData?.sound || null,
      createDate: new Date(),
      displaySize: finalSpecData?.displaySize || "",
      horizontalNumber: finalSpecData?.horizontalNumber || 1,
      verticalNumber: finalSpecData?.verticalNumber || 1,
      aspectRatio: finalSpecData?.aspectRatio || "",
      thumbnail: generalFormData?.thumbnail || "",
    };
  
    console.log('Submitting display data:', displayData);
    try {
      mutate(displayData);
      navigate('/display-overview');
    } catch (err) {
      console.error(err);
      message.error('Failed to create display. Please try again.');
    }
  };
  

  useEffect(() => {
    console.log("Current Step:", currentStep); 
    console.log("General Form Data:", generalFormData); 
    console.log("Specification Data:", specificationData); 

    if (specificationData) {
      console.log("Specification Data exists:", specificationData);
    } else {
      console.log("No specification data yet.");
    }
  }, [currentStep, generalFormData, specificationData]);

  return (
    <Layout className="h-full min-h-screen">
      <Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="text-white text-lg font-semibold">Dashboard</Link>
          <div style={{ color: 'white', fontSize: '18px' }}>Create Display</div>
          <Select
            value={language}
            onChange={handleLanguageChange}
            style={{ width: 150 }}
          >
            <Option value="en">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Flag code="GB" style={{ width: 20, height: 15, marginRight: 8 }} />
                English
              </div>
            </Option>
            <Option value="de">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Flag code="DE" style={{ width: 20, height: 15, marginRight: 8 }} />
                Deutsch (German)
              </div>
            </Option>
          </Select>
        </div>
      </Header>

      <Layout>
        <Content style={{ padding: '20px' }}>
          
          <StepProgress currentStep={currentStep} />

          
          <div className="my-10">
            {currentStep === 0 && (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Welcome to Create Display</h2>
                <p className="text-gray-600">Click "Next" to begin setting up your display.</p>
              </div>
            )}

            {currentStep === 1 && (
              <GeneralForm
                onFormSubmit={(data) => {
                  console.log("General Form Data received:", data); 
                  setGeneralFormData(data);
                }}
                goToNextStep={goToNextStep}
              />
            )}

            {currentStep === 2 && (
              <Specifications
                onFormSubmit={(data) => {
                  console.log("Specification Data received:", data); 
                  setSpecificationData(data);
                }}
                handleFinalSubmit={handleFinalSubmit}
                goToPrevStep={goToPrevStep}
              />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CreateDisplay;
