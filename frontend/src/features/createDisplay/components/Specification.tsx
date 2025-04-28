import React, { useRef, useState } from 'react';
import { Form, Input, Select, Button, Carousel, Alert } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Option } = Select;

// مانیتورها با عکس
const monitorOptions = [
  { label: 'LCD Screen', value: 'lcd', img: '/images/lcd.jpg' },
  { label: 'Floor Stand', value: 'floor', img: '/images/floor-stand-screen.jpg' },
  { label: 'Tablet', value: 'tablet', img: '/images/tablet.jpg' },
  { label: 'LED video wall', value: 'led-video-wall', img: '/images/led-video-wall.jpg' },
  { label: 'LCD video wall', value: 'lcd-video-wall', img: '/images/lcd-video-wall.jpg' },
  { label: 'Smartphone', value: 'smartphone', img: '/images/smart-phone.jpg' },
];

const chunkArray = (arr: any[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const CustomForm: React.FC = () => {
  const [selectedMonitor, setSelectedMonitor] = useState<string>('');
  const carouselRef = useRef<any>(null);

  const handleFinish = (values: any) => {
    console.log('Form values:', { ...values, selectedMonitor });
  };

  const handleMonitorSelect = (value: string) => {
    setSelectedMonitor(value);
  };

  const monitorChunks = chunkArray(monitorOptions, 4);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <Form layout="vertical" onFinish={handleFinish}>
      {/* --- Monitor Selection with Images --- */}
      <div className="border-b-4 border-b-gray-300 mb-6">
        <h3 className="text-blue-600 font-semibold text-xl mb-2">Information about your digital signage device (your display)</h3>
        <p>Select your digital signage device. In KiData we now call all digital signage devices Display.</p>
        <div className="relative w-4/5 m-auto my-5">
          <Carousel ref={carouselRef} dots={true}>
            {monitorChunks.map((chunk, index) => (
              <div key={index}>
                <div className="grid grid-cols-4 gap-4 px-8">
                  {chunk.map((monitor) => (
                    <div
                      key={monitor.value}
                      onClick={() => handleMonitorSelect(monitor.value)}
                      className={`border rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        selectedMonitor === monitor.value
                          ? 'bg-blue-500 text-white border-blue-700'
                          : 'bg-gray-100 hover:bg-blue-100'
                      } h-72 flex flex-col justify-center`}
                    >
                      <img
                        src={monitor.img}
                        alt={monitor.label}
                        className="h-32 mx-auto mb-4 object-contain"
                      />
                      <h4 className="font-semibold text-lg">{monitor.label}</h4>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Carousel>

          {/* Navigation Buttons */}
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={prev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-white shadow"
          />
          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={next}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-white shadow"
          />

          {/* Selected Monitor Message */}
          {selectedMonitor && (
            <div className="mt-6 text-left">
              <Alert
                message={`"${monitorOptions.find(item => item.value === selectedMonitor)?.label}" selected as the display. Choosing the right display is important for KiData to work properly.`}
                type="info"
                showIcon
              />
            </div>
          )}
        </div>
      </div>

      {/* --- Dropdown List --- */}
      <div className="border-b-4 border-b-gray-300 mb-6">
        <h3 className="text-blue-600 font-semibold text-xl mb-2">Create / Select Category</h3>
        <p>Create a category. Assign a category to your digital signage device.</p>
        <div className="w-3/5 m-auto my-5">
          <Form.Item
            label="Choose Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select a category">
              <Option value="advertising">Advertising</Option>
              <Option value="informational">Informational</Option>
              <Option value="entertainment">Entertainment</Option>
            </Select>
          </Form.Item>
        </div>
      </div>

      {/* --- Input Field --- */}
      <div className="border-b-4 border-b-gray-300 mb-6">
        <h3 className="text-blue-600 font-semibold text-xl mb-2">Monitor number and size</h3>
        <p>Define your LCD video wall</p>
        <div className="w-3/5 m-auto my-5">
          <Form.Item
            label="Additional Notes"
            name="notes"
          >
            <Input placeholder="Enter any additional information..." />
          </Form.Item>
        </div>
      </div>

      {/* --- Submit Button --- */}
      <Form.Item className="text-center">
        {/* <Button type="primary" htmlType="submit" className="bg-blue-600 font-semibold">
          Submit
        </Button> */}
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
