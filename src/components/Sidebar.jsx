import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  FileAddOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <Menu mode="inline" style={{ height: '100%', borderRight: 0 }} selectedKeys={[location.pathname]}>
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/user" icon={<FileAddOutlined />}>
        <Link to="/user">User Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="/admin" icon={<AppstoreAddOutlined />}>
        <Link to="/admin">Admin Dashboard</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
