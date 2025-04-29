import React from 'react';
import { Progress, Row, Col, Checkbox } from 'antd';

interface StepProgressProps {
  currentStep: number; 
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  
  const steps = ['Start', 'General Information', 'Specifications'];

  
  const progressPercent = (currentStep / (steps.length - 1)) * 100; 

  return (
    <div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {steps.map((step, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            
            {currentStep > index ? (
              <Checkbox checked disabled>{step}</Checkbox>
            ) : (
              <span>{index === 0 ? '0. ' : `${index}. `}{step}</span>
            )}
          </div>
        ))}
      </div>

      
      <Progress
        percent={progressPercent}
        status="active"
        showInfo={false}
        strokeWidth={20}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default StepProgress;
