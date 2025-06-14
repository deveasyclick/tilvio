import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useFetchAuthenticatedDistributor } from '../api/distributor';

const CustomError = ({ refresh }: { refresh: () => void }) => {
  return (
    <div
      role="alert"
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      aria-live="assertive">
      Sorry, we couldn’t load your profile.
      <button
        onClick={() => refresh()}
        className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded cursor-pointer">
        Try again
      </button>
    </div>
  );
};

const ProtectRoutes = () => {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();
  const {
    data: distributor,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchAuthenticatedDistributor();

  if (isError) {
    console.log('error fetching distributor', error);
    return <CustomError refresh={refetch} />;
  }

  if (!isLoaded || isLoading) return <div>Loading...</div>;

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  const onboardingPath = '/workspaces/onboarding';
  const isOnOnboardingPage = location.pathname.startsWith(onboardingPath);

  // Distributor is onboarded if they have a workspace
  const onboarded = !!distributor?.workspace?.name;

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
