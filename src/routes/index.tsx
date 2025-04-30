import { BrowserRouter, Route, Routes } from 'react-router';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/dashboard/Home';
import Members from '../pages/members';
import Loans from '../pages/loans';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard routes with layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="members" element={<Members />} />
          <Route path="loans" element={<Loans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
