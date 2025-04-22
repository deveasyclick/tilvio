import { BrowserRouter, Route, Routes } from 'react-router';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/dashboard/Home';
import Members from '../pages/members';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard routes with layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="members" element={<Members />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
