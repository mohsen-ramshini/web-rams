// CreateCategoryForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { SketchPicker } from 'react-color'; 
import { useCreateCategory } from '../api/useCreateCategory';

interface CreateCategoryFormProps {
  onSuccess?: () => void; 
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [categoryColor, setCategoryColor] = useState<string>("#FFFFFF");
  const { mutate: addCategory } = useCreateCategory();

  const handleColorChange = (color: any) => {
    setCategoryColor(color.hex);
  };

  const handleFinish = (values: { title: string; description: string; keyword: string }) => {
    addCategory(
      {
        name: values.title,
        description: values.description,
        categoryColor,
        keyword: values.keyword,
      },
      {
        onSuccess: () => {
          form.resetFields();
          if (onSuccess) onSuccess(); 
        },
      }
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Category Title"
        name="title"
        rules={[{ required: true, message: 'Please enter a category title' }]}
      >
        <Input placeholder="Enter category title" />
      </Form.Item>

      <Form.Item
        label="Category Description"
        name="description"
        rules={[{ required: true, message: 'Please enter a category description' }]}
      >
        <Input.TextArea placeholder="Enter category description" />
      </Form.Item>

      <Form.Item
        label="Category Keyword"
        name="keyword"
        rules={[{ required: true, message: 'Please enter category keyword' }]}
      >
        <Input placeholder="Enter category keyword" />
      </Form.Item>

      <Form.Item label="Category Color">
        <SketchPicker color={categoryColor} onChange={handleColorChange} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Save Category
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateCategoryForm;
