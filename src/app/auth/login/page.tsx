import AuthLayout from "@/features/components/AuthLayout/AuthLayout";
import AuthForm from "@/features/components/AuthForm/AuthForm";
import { loginAction } from "@/actions/auth";
import Link from "next/link";

export default function Login() {
  return (
    <AuthLayout>
      <AuthForm
        title="Sign in to PlayBook"
        submitLabel="Sign in"
        action={loginAction}
        fields={[
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
          <p>
            Don't have an account?{" "}
            <Link href="/auth/signup">Create account</Link>
          </p>
        }
      />
    </AuthLayout>
  );
}
