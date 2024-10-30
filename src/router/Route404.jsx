// src/router/Error404.jsx
import { Route } from 'react-router-dom';
import { Error404 } from '../components/layout/Error404';

const ErrorRoutes = () => (
  <Route path="*" element={<Error404 />} />
);

export default ErrorRoutes;
