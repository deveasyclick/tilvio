import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet, useLocation } from 'react-router';

const ProtectRoutes = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const location = useLocation();

  const onboardingPath = '/workspaces/onboarding';
  const isOnOnboardingPage = location.pathname.startsWith(onboardingPath);

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  const onboarded = user?.publicMetadata?.onboarded;

  // 👇 Don't redirect if we're already on the onboarding page
  if (!onboarded && !isOnOnboardingPage) {
    return <Navigate to={onboardingPath} replace />;
  }

  // 👇 Prevent onboarded users from seeing the onboarding form
  if (onboarded && isOnOnboardingPage) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectRoutes;
