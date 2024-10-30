// src/router/PublicRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../components/layout/public/PublicLayout';
import { Login } from '../components/user/Login';
import { Register } from '../components/user/Register';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;

