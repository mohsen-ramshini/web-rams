import React, { useState } from 'react';
import { Layout, Select, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Flag from 'react-world-flags'; // استفاده از import

const { Header, Content } = Layout;
const { Option } = Select;

const Dashboard: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <Layout className="h-screen">
      <Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'white', fontSize: '18px' }}>Dashboard</div>
          <Select
            value={language}
            onChange={handleLanguageChange}
            style={{ width: 150 }}
            dropdownStyle={{ backgroundColor: '#001529' }}
          >
            {/* Option with flags */}
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
          {/* تیتری بالای کارت‌ها */}
          <div className="text-center mb-2 lg:mb-20">
            <h1 className="font-extrabold text-xl lg:text-5xl mb-5">Display Management</h1>
            <h2 className="font-semibold text-lg lg:text-2xl">
              Manage and configure your display devices efficiently
            </h2>
          </div>

          {/* ردیف کارت‌ها */}
          <Row gutter={[16, 16]} justify="center" align="top">
            {/* کارت لینک برای Create Display */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Link to="/create-display">
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  cover={
                    <div
                      style={{
                        height: '150px',
                        backgroundColor: '#1890ff',
                        borderRadius: '4px 4px 0 0',
                      }}
                    />
                  }
                >
                  <Card.Meta title="Create Display" description="Create a new display" />
                </Card>
              </Link>
            </Col>

            {/* کارت لینک برای Display Overview */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Link to="/display-overview">
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  cover={
                    <div
                      style={{
                        height: '150px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px 4px 0 0',
                      }}
                    />
                  }
                >
                  <Card.Meta title="Display Overview" description="View the display overview" />
                </Card>
              </Link>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
