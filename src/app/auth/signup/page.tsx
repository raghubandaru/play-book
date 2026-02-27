import AuthLayout from "@/features/components/AuthLayout/AuthLayout";
import AuthForm from "@/features/components/AuthForm/AuthForm";
import { signupAction } from "@/actions/auth";
import Link from "next/link";

export default function Register() {
  return (
    <AuthLayout>
      <AuthForm
        title="Create your account"
        submitLabel="Create account"
        action={signupAction}
        fields={[
          {
            name: "name",
            label: "Full name",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
          },
        ]}
        footer={
          <>
            Already have an account? <Link href="/auth/login">Sign in</Link>
          </>
        }
      />
    </AuthLayout>
  );
}
