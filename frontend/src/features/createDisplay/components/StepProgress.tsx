import React from 'react';
import { Progress, Row, Col, Checkbox } from 'antd';

interface StepProgressProps {
  currentStep: number; // شماره مرحله فعلی (0، 1 یا 2)
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  // لیست قدم‌ها به همراه مرحله صفر
  const steps = ['Start', 'General Information', 'Specifications'];

  // محاسبه درصد پیشرفت بر اساس مرحله فعلی
  const progressPercent = (currentStep / (steps.length - 1)) * 100; // درصد پیشرفت بین 0 تا 100

  return (
    <div>
      {/* نمایش مراحل */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {steps.map((step, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            {/* اگر مرحله تکمیل شده باشد، تیک می‌خورد */}
            {currentStep > index ? (
              <Checkbox checked disabled>{step}</Checkbox>
            ) : (
              <span>{index === 0 ? '0. ' : `${index}. `}{step}</span>
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
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
