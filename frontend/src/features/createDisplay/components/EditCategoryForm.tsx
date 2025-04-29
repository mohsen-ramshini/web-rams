import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Popconfirm, message } from 'antd';
import { useEditCategory } from '../api/useEditCategory';
import { useDeleteCategory } from '../api/useDeleteCategory';
import { useCategories } from '../api/useFetchCategories';
import { SketchPicker } from 'react-color'; 

interface EditCategoryFormProps {
  categoryId: string;
  onSuccess: () => void;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ categoryId, onSuccess }) => {
  const [form] = Form.useForm();
  const { data: categories } = useCategories();
  const { mutate: updateCategory } = useEditCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const [categoryColor, setCategoryColor] = useState<string>(''); 

  useEffect(() => {
    if (categoryId && categories) {
      const category = categories.find((cat: any) => cat.id === categoryId);
      if (category) {
        form.setFieldsValue({
          name: category.name || '',
          description: category.description || '',
          keyword: category.keyword || '',
        });
        setCategoryColor(category.categoryColor || ''); 
      }
    }
  }, [categoryId, categories, form]);

  const handleColorChange = (color: any) => {
    setCategoryColor(color.hex); 
    form.setFieldsValue({ categoryColor: color.hex }); 
  };

  const handleFinish = (values: any) => {
    updateCategory(
      { id: categoryId, category: { ...values, categoryColor } }, 
      {
        onSuccess: () => {
          message.success('Category updated successfully');
          onSuccess();
        },
        onError: () => {
          message.error('Failed to update category');
        },
      }
    );
  };

  const handleDelete = () => {
    deleteCategory(
      { id: categoryId },
      {
        onSuccess: () => {
          message.success('Category deleted successfully');
          onSuccess();
        },
        onError: () => {
          message.error('Failed to delete category');
        },
      }
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Category Name"
        name="name"
        rules={[{ required: true, message: 'Please enter a category name' }]}
      >
        <Input placeholder="Enter category name" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter a description' }]}
      >
        <Input.TextArea placeholder="Enter description" />
      </Form.Item>

      <Form.Item
        label="Keyword"
        name="keyword"
        rules={[{ required: true, message: 'Please enter a keyword' }]}
      >
        <Input placeholder="Enter keyword" />
      </Form.Item>

      <Form.Item
        label="Category Color"
        name="categoryColor"
        rules={[{ required: true, message: 'Please select a category color' }]}
      >
        <SketchPicker color={categoryColor} onChange={handleColorChange} /> 
      </Form.Item>

      <div className="flex justify-between gap-4 mt-6">
        <Button type="primary" htmlType="submit" className="w-1/2">
          Save Changes
        </Button>

        <Popconfirm
          title="Are you sure to delete this category?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger className="w-1/2">
            Delete Category
          </Button>
        </Popconfirm>
      </div>
    </Form>
  );
};

export default EditCategoryForm;
