import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Upload, message, Modal, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useCategories } from '../api/useFetchCategories';
import CreateCategoryForm from './CreateCategoryForm';
import EditCategoryForm from './EditCategoryForm';

import { useNavigate } from 'react-router-dom';


const { Option } = Select;

interface GeneralFormProps {
  onFormSubmit: (data: any) => void;
  goToNextStep: () => void;
}

const GeneralForm: React.FC<GeneralFormProps> = ({ onFormSubmit, goToNextStep }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const { data: categories, isLoading, refetch } = useCategories();

  
  useEffect(() => {
    if (selectedCategory) {
      const category = categories?.find((cat: any) => cat.id === selectedCategory);
      if (category) {
        form.setFieldsValue({
          name: category.name,
        });
      }
    }
  }, [selectedCategory, categories, form]);

  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/'); 
  };
  

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value);
  };

  const handleCategoryCreate = () => {
    setIsCreateModalVisible(true);
  };

  const handleCategoryEdit = () => {
    if (selectedCategory) {
      setIsEditModalVisible(true);
    } else {
      message.warning('Please select a category to edit');
    }
  };

  const handleCancelCreateModal = () => {
    setIsCreateModalVisible(false);
  };

  const handleCancelEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleCategoryCreatedOrUpdated = () => {
    setIsCreateModalVisible(false);
    setIsEditModalVisible(false);
    refetch(); 
  };

  
  const renderCategoryOption = (category: any) => {
    return (
      <div className="flex items-center">
        <div
          style={{
            width: '16px',
            height: '16px',
            backgroundColor: category.categoryColor,
            marginRight: '8px',
            borderRadius: '2px',
          }}
        ></div>
        {category.name}
      </div>
    );
  };

  const handleFinish = (values: any) => {
    onFormSubmit(values);
    console.log("general form values", values); 
    
    goToNextStep(); 
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <div className="border-b-4 border-b-gray-300 mb-6">
        <h3 className="text-blue-600 font-semibold text-xl mb-2">Information about your digital signage device (your display)</h3>
        <p>Your digital signage device can be an LCD screen, floor stand screen, tablet, LED video wall, LCD panel, smartphone, or any other digital display device. Select your device type on the next page.</p>
        <Row justify="center">
          <Col xs={24} sm={24} md={16}>
            <Form.Item
              label="Title"
              name="name"
              rules={[{ required: true, message: 'Please enter a category name' }]}>
              <Input placeholder="Enter a title for your digital signage device" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className="border-b-4 border-b-gray-300 mb-6 pb-10">
        <h3 className="text-blue-600 font-semibold text-xl mb-2">Create / Select Category</h3>
        <p>Create a category. Assign a category to your digital signage device.</p>
        <Row justify="center">
          <Col xs={24} sm={24} md={16}>
            <Form.Item label="Choose Category" name="category">
              <Select
                placeholder={
                  selectedCategory
                    ? categories?.find((cat: any) => cat.id === selectedCategory)?.name
                    : 'Select a category'
                }
                onChange={handleCategorySelect}
                value={selectedCategory || undefined}
                loading={isLoading}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <div style={{ padding: '8px' }}>
                      <Button type="link" onClick={handleCategoryCreate}>
                        Create New Category
                      </Button>
                    </div>
                  </>
                )}
              >
                {categories?.map((category: any) => (
                  <Option key={category.id} value={category.id}>
                    {renderCategoryOption(category)}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <div className="flex justify-between items-center gap-3">
              <Button type="primary" className="w-1/2" onClick={handleCategoryCreate}>
                Create New Category
              </Button>
              <Button
                className="w-1/2"
                onClick={handleCategoryEdit}
                disabled={!selectedCategory || isLoading}  
              >
                Edit Selected Category
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <div className="border-b-4 border-b-gray-300 mb-6">
        <h3 className="text-blue-600 font-semibold text-xl mb-2">Upload Placeholder Images (max. 5)</h3>
        <p>Upload 1 to 5 images that will be displayed by KiData when there are no ads or other content.</p>
        <Row justify="center">
          <Col xs={24} sm={24} md={16}>
            <div className="text-center">
              <Form.Item
                name="thumbnail"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              >
                <Upload name="thumbnail" listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />} className="bg-blue-600 text-white font-semibold min-w-64">
                    Upload Image
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </div>

      
      <div className="flex justify-center gap-2 items-center mt-6 ">
        <Button type="default" onClick={goToDashboard}>
          Cancle
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </div>

      
      <Modal
        title="Create New Category"
        open={isCreateModalVisible}
        onCancel={handleCancelCreateModal}
        footer={null}
      >
        <CreateCategoryForm onSuccess={handleCategoryCreatedOrUpdated} />
      </Modal>

      
      <Modal
        title="Edit Category"
        open={isEditModalVisible}
        onCancel={handleCancelEditModal}
        footer={null}
      >
        {selectedCategory && (
          <EditCategoryForm
            categoryId={selectedCategory}
            onSuccess={handleCategoryCreatedOrUpdated}
          />
        )}
      </Modal>
    </Form>
  );
};

export default GeneralForm;
