import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redirect ke komponen Login yang baru
const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect ke halaman login baru
    navigate('/login');
  }, [navigate]);

  return null;
};

export default LoginPage;
