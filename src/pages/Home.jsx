import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/experience.svg';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
      <div
          className='text-center'
          style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80vh',
              textAlign: 'center',
          }}
      >
          <Title level={1}>Welcome to the Restaurant Management Platform</Title>
          <img
              src={backgroundImage}
              alt="Restaurant Background"
              style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
          />

          <Paragraph>
              This platform helps you streamline your restaurant operations. Manage your menu, track orders, and provide excellent service to your customers.
          </Paragraph>

          <Paragraph>
              Enhance your business with AI-powered insights for menu recommendations and optimize your restaurant's performance!
          </Paragraph>

          <Link to="/user">
              <Button type="primary" size="large">
                  View List Items
              </Button>
          </Link>
      </div>
  );
};

export default Home;
