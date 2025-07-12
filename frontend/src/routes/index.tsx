import { BrowserRouter, Route, Routes } from 'react-router';
import DashboardLayout from '../layouts/dashboard';
import DashboardHome from '../pages/dashboard/Home';
import Members from '../pages/members';
import PriceLists from '../pages/pricelists';
import Loans from '../pages/loans';
import { ClerkProvider } from '@clerk/react-router';
import configs from '../config';
import Auth from '../pages/auth';
import {} from '@clerk/themes';
import { PRIMARY_COLOR } from '../constants/colors';
import WorkspaceOnboarding from '../pages/workspaces/onboarding/onboard';
import MainLayout from '../layouts/main';
import ProtectRoutes from './ProtectRoute';
import QueryProvider from '../providers/QueryProvider';
import Tiles from '../pages/tiles';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ClerkProvider
        publishableKey={configs.clerkPublishableKey.value}
        appearance={{
          signIn: { variables: { colorPrimary: PRIMARY_COLOR } },
        }}>
        <QueryProvider>
          <Routes>
            <Route path="/signin/*" element={<Auth />} />

            <Route element={<ProtectRoutes />}>
              <Route path="/workspaces/onboarding" element={<MainLayout />}>
                <Route index element={<WorkspaceOnboarding />} />
              </Route>

              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="members" element={<Members />} />
                <Route path="pricelists" element={<PriceLists />} />
                <Route path="loans" element={<Loans />} />
                <Route path="tiles" element={<Tiles />} />
              </Route>
            </Route>
          </Routes>
        </QueryProvider>
      </ClerkProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
