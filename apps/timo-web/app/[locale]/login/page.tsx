import { LoginContainer } from "@/app/[locale]/login/_containers/LoginContainer";
import { GuestGuardProvider } from "@/providers/auth/GuestGuardProvider";

export default function LoginPage() {
  return (
    <GuestGuardProvider>
      <LoginContainer />
    </GuestGuardProvider>
  );
}
