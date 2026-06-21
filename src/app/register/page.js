import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Start preserving your wisdom and learning from the community."
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;