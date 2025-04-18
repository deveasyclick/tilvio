import { BrowserRouter, Route, Routes } from 'react-router';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/dashboard/Home';
import Users from '../pages/users';
import Products from '../pages/products';
import Settings from '../pages/settings';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard routes with layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
