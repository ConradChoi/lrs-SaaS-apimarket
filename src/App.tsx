import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AuthProvider } from './hooks/useAuth';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import About from './pages/About';
import Plans from './pages/Plans';
import ApiMarket from './pages/ApiMarket';
import MyPage from './pages/user/MyPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import MyPageLayout from './pages/user/MyPageLayout';
import Dashboard from './pages/user/Dashboard';
import SubscriptionHistory from './pages/user/SubscriptionHistory';
import ApiHistory from './pages/user/ApiHistory';
import Payments from './pages/user/Payments';
import ProfileEdit from './pages/user/ProfileEdit';
import Logout from './pages/user/Logout';
import Withdraw from './pages/user/Withdraw';
import PasswordChange from './pages/user/PasswordChange';
import Inquiry from './pages/user/Inquiry';
import Notice from './pages/user/Notice';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<LandingPage />} />
              <Route path="about" element={<About />} />
              <Route path="plans" element={<Plans />} />
              <Route path="market" element={<ApiMarket />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route
                path="mypage"
                element={
                  <PrivateRoute>
                    <MyPage />
                  </PrivateRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="subscription" element={<SubscriptionHistory />} />
                <Route path="api" element={<ApiHistory />} />
                <Route path="payments" element={<Payments />} />
                <Route path="profile" element={<ProfileEdit />} />
                <Route path="logout" element={<Logout />} />
                <Route path="withdraw" element={<Withdraw />} />
                <Route path="password" element={<PasswordChange />} />
                <Route path="inquiry" element={<Inquiry />} />
                <Route path="notice" element={<Notice />} />
              </Route>
            </Route>
            {/* 관리자 라우트 */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 