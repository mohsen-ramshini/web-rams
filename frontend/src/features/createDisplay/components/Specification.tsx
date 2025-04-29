import React, { useRef, useState } from 'react';
import { Form, Input, Select, Button, Carousel, Alert, Slider, Space } from 'antd';
import { LeftOutlined, RightOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useGetBrands } from '../api/useGetBrands';

const { Option } = Select;

interface SpecificationsProps {
  onFormSubmit: (data: any) => void;
  handleFinalSubmit: (data:any) => void;
  goToPrevStep: () => void;
}

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

const CustomForm: React.FC<SpecificationsProps> = ({ onFormSubmit, handleFinalSubmit, goToPrevStep }) => {
  const [form] = Form.useForm();
  const [selectedMonitor, setSelectedMonitor] = useState<string>('');
  const carouselRef = useRef<any>(null);
  const { data: brands, isLoading: brandsLoading } = useGetBrands();

  const [monitorSize, setMonitorSize] = useState<number>(32);
  const [sizeUnit, setSizeUnit] = useState<'inch' | 'cm'>('inch');
  const [horizontalMonitors, setHorizontalMonitors] = useState<number>(1);
  const [verticalMonitors, setVerticalMonitors] = useState<number>(1);

  const monitorChunks = chunkArray(monitorOptions, 4);

  const handleFinish = (values: any) => {
    const result = {
      ...values,
      displayType: selectedMonitor,
      displaySize: `${monitorSize} ${sizeUnit}`,
      horizontalNumber: horizontalMonitors,
      verticalNumber: verticalMonitors,
    };

    console.log('✅ Final Form Values:', result);

    onFormSubmit(result);
    handleFinalSubmit(result);
  };

  const handleMonitorSelect = (value: string) => {
    setSelectedMonitor(value);
  };

  const next = () => carouselRef.current.next();
  const prev = () => carouselRef.current.prev();

  const increase = (setter: (v: number) => void, value: number) => setter(value + 1);
  const decrease = (setter: (v: number) => void, value: number) => {
    if (value > 1) setter(value - 1);
  };

  const handleSubmit = () => {
    form.submit(); 
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleFinish}>
      
      <div className="border-b-4 border-b-gray-300 mb-6">
        <h3 className="text-blue-600 font-semibold text-xl mb-2">Information about your digital signage device</h3>
        <p>Select your digital signage device.</p>

        <div className="relative w-full sm:w-4/5 m-auto my-5">
          <Carousel ref={carouselRef} dots={true}>
            {monitorChunks.map((chunk, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 sm:px-8">
                  {chunk.map((monitor) => (
                    <div
                      key={monitor.value}
                      onClick={() => handleMonitorSelect(monitor.value)}
                      className={`border rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        selectedMonitor === monitor.value ? 'bg-blue-500 text-white border-blue-700' : 'bg-gray-100 hover:bg-blue-100'
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

          {selectedMonitor && (
            <div className="mt-6 text-left">
              <Alert
                message={`"${monitorOptions.find(item => item.value === selectedMonitor)?.label}" selected.`}
                type="info"
                showIcon
              />
            </div>
          )}
        </div>
      </div>

      {/* برند مانیتور */}
      <div className="border-b-4 border-b-gray-300 mb-6">
        <h3 className="text-blue-600 font-semibold text-xl mb-2">Select your display brand</h3>

        <div className="w-full sm:w-3/5 m-auto my-5">
          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: 'Please select a brand' }]}
          >
            <Select
              placeholder="Select a brand"
              loading={brandsLoading}
              onChange={(value) => form.setFieldsValue({ brand: value })}
            >
              {brands?.map((brand: any) => (
                <Option key={brand.id} value={brand.name}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>

      
      <div className="border-b-4 border-b-gray-300 mb-6">
        <h3 className="text-blue-600 font-semibold text-xl mb-2">Monitor number and size</h3>

        <div className="w-full sm:w-3/5 m-auto my-5 space-y-8">
          <Form.Item label="Size of each monitor">
            <Space direction="vertical" className="w-full">
              <Slider
                min={10}
                max={100}
                value={monitorSize}
                onChange={(value) => setMonitorSize(value)}
              />
              <Space>
                <Input
                  type="number"
                  value={monitorSize}
                  onChange={(e) => setMonitorSize(Number(e.target.value))}
                  min={1}
                  max={200}
                  className="w-32"
                />
                <Select
                  value={sizeUnit}
                  onChange={(value) => setSizeUnit(value)}
                  className="w-32"
                >
                  <Option value="inch">Inch</Option>
                  <Option value="cm">Centimeter</Option>
                </Select>
              </Space>
            </Space>
          </Form.Item>

          <Form.Item label="Number of horizontal monitors">
            <Space>
              <Button icon={<MinusOutlined />} onClick={() => decrease(setHorizontalMonitors, horizontalMonitors)} />
              <Input value={horizontalMonitors} readOnly className="w-20 text-center" />
              <Button icon={<PlusOutlined />} onClick={() => increase(setHorizontalMonitors, horizontalMonitors)} />
            </Space>
          </Form.Item>

          <Form.Item label="Number of vertical monitors">
            <Space>
              <Button icon={<MinusOutlined />} onClick={() => decrease(setVerticalMonitors, verticalMonitors)} />
              <Input value={verticalMonitors} readOnly className="w-20 text-center" />
              <Button icon={<PlusOutlined />} onClick={() => increase(setVerticalMonitors, verticalMonitors)} />
            </Space>
          </Form.Item>

          <Form.Item
            label="Aspect Ratio"
            name="aspectRatio"
            rules={[{ required: true, message: 'Please select aspect ratio' }]}
          >
            <Select placeholder="Select aspect ratio">
              <Option value="16:9">16:9 (Widescreen)</Option>
              <Option value="4:3">4:3 (Standard)</Option>
              <Option value="21:9">21:9 (UltraWide)</Option>
              <Option value="1:1">1:1 (Square)</Option>
              <Option value="9:16">9:16 (Vertical Screen)</Option>
            </Select>
          </Form.Item>
        </div>
      </div>

      
      <Form.Item className="text-center mt-8">
        <Button type="primary" className="bg-blue-600 font-semibold px-10" onClick={goToPrevStep}>
          Back
        </Button>
        <Button type="default" onClick={handleSubmit} className="ml-4">
          Final Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
