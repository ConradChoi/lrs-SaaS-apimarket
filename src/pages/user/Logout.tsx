import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout().then(() => navigate('/'));
  }, [logout, navigate]);

  return <div>로그아웃 중...</div>;
};

export default Logout; 