import React from 'react';
import { Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const GeneralForm: React.FC = () => {
  const handleFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <Form layout="vertical" onFinish={handleFinish}>
      <div className="border-b-4 border-b-gray-300 mb-6">
        <h3 className='text-blue-600 font-semibold text-xl mb-2'>Information about your digital signage device (your dispay)</h3>
        <p>Your digital signage device can be an LCD screen, floor stand screen, tablet, LED video wall, LCD panel, smartphone, orany other digital display device. select your device type on the next page.</p>
        <div className=' w-3/5 m-auto my-5'>
            <Form.Item
                label="Display Title"
                name="title"
                rules={[{ required: true, message: 'Please enter a title for the display' }]}
            >
                <Input placeholder="Enter display title" />
            </Form.Item>
        </div>
      </div>
      <div className="border-b-4 border-b-gray-300 mb-6">
        <h3 className='text-blue-600 font-semibold text-xl mb-2'>Create / select category</h3>
        <p>Create a category. Assign a category to your digital signage device.</p>
        {/* نوع نمایش */}
        <div className=' w-3/5 m-auto my-5'>
            <Form.Item
                label="Choose category"
                name="type"
                rules={[{ message: 'Please select a display type' }]}
                
            >
                <Select placeholder="Select display type">
                <Option value="led">LED Display</Option>
                <Option value="lcd">LCD Display</Option>
                <Option value="projector">Projector</Option>
                </Select>
            </Form.Item>
            <div className='flex justify-between items-center gap-3'>
                <Button type="primary" className='w-1/2 inline-block ' onClick={() => {}}>Create New Category</Button>
                <Button type="primary" className='w-1/2 inline-block ' onClick={() => {}}>Edit Category</Button>

            </div>
        </div>
      </div>

      <div className="border-b-4 border-b-gray-300 mb-6">
        <h3 className='text-blue-600 font-semibold text-xl mb-2'>Uplaod placeholder images (max. 5)</h3>
        <p>uplaod 1 to 5 images that will be displayed by KiData on When there are no ads or other content.</p>
        <div className=' w-3/5 m-auto my-5'>
            <Form.Item
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                label=""
                name="thumbnail"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
                <Upload name="logo" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />} className='bg-blue-600 text-white font-semibold min-w-64'>Upload Image</Button>
                </Upload>
            </Form.Item>

        </div>
        {/* آپلود تصویر */}
      </div>



      {/* دکمه ارسال */}
      <Form.Item>
        {/* <Button type="primary" htmlType="submit">
          Save & Continue
        </Button> */}
      </Form.Item>
    </Form>
  );
};

export default GeneralForm;
