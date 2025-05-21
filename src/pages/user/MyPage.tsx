import React from 'react';
import { Outlet } from 'react-router-dom';
import MyPageLayout from './MyPageLayout';

const MyPage: React.FC = () => {
  return (
    <MyPageLayout>
      <Outlet />
    </MyPageLayout>
  );
};

export default MyPage; 