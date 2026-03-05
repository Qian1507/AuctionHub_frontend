import UpdatePasswordForm from "../components/UpdatePasswordForm";

const UpdatePassword: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Update password</h1>
      <UpdatePasswordForm />
    </div>
  );
};

export default UpdatePassword;
