import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Log in to continue your journey of reflection and growth."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;