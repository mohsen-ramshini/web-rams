import React, { useState } from 'react';
import { Layout, Select, Button } from 'antd';
import StepProgress from './components/StepProgress';
import GeneralForm from './components/GeneralForm';
import Specifications from './components/Specification';

const { Header, Content } = Layout;
const { Option } = Select;

const CreateDisplay: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const [currentStep, setCurrentStep] = useState<number>(0);

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

  return (
    <Layout className="h-full min-h-screen">
      <Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'white', fontSize: '18px' }}>Create Display</div>
          <Select
            value={language}
            onChange={handleLanguageChange}
            style={{ width: 120 }}
            dropdownStyle={{ backgroundColor: '#001529' }}
          >
            <Option value="en">English</Option>
            <Option value="de">Deutsch</Option>
          </Select>
        </div>
      </Header>

      <Layout>
        <Content style={{ padding: '20px' }}>
          {/* Progress Step UI */}
          <StepProgress currentStep={currentStep} />

          {/* Conditional Step Content */}
          <div className="my-10">
            {currentStep === 0 && (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Welcome to Create Display</h2>
                <p className="text-gray-600">Click "Next" to begin setting up your display.</p>
              </div>
            )}
            {currentStep === 1 && <GeneralForm />}
            {currentStep === 2 && <Specifications />}
          </div>

          {/* Step Control Buttons */}
          <div className='w-full md:w-1/3 m-auto flex justify-between gap-4'>
            <Button onClick={goToPrevStep} disabled={currentStep === 0} className='w-1/2'>
              Back
            </Button>
            <Button type="primary" onClick={goToNextStep} disabled={currentStep >= 2} className='w-1/2'>
              Next
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CreateDisplay;
