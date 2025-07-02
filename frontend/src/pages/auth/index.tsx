import { SignIn } from '@clerk/react-router';

export default function Auth() {
  return (
    <main className="flex justify-center items-center h-screen">
      <SignIn
        fallbackRedirectUrl="/"
        withSignUp={false}
        appearance={
          {
            /*elements: { footerAction: '!hidden' } */
          }
        }
      />
    </main>
  );
}
