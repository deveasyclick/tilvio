import { BrowserRouter, Route, Routes } from 'react-router';
import DashboardLayout from '../layouts/dashboard';
import DashboardHome from '../pages/dashboard/Home';
import Members from '../pages/members';
import Loans from '../pages/loans';
import Products from '../pages/products';
import { ClerkProvider } from '@clerk/react-router';
import configs from '../config';
import Auth from '../pages/auth';
import {} from '@clerk/themes';
import { PRIMARY_COLOR } from '../constants/colors';
import WorkspaceOnboarding from '../pages/workspaces/onboarding/onboard';
import MainLayout from '../layouts/main';
import ProtectRoutes from './ProtectRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ClerkProvider
        publishableKey={configs.clerkPublishableKey.value}
        appearance={{
          signIn: { variables: { colorPrimary: PRIMARY_COLOR } },
        }}>
        <Routes>
          <Route path="/signin" element={<Auth />} />

          <Route element={<ProtectRoutes />}>
            <Route path="/workspaces/onboarding" element={<MainLayout />}>
              <Route index element={<WorkspaceOnboarding />} />
            </Route>

            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="members" element={<Members />} />
              <Route path="loans" element={<Loans />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Route>
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
