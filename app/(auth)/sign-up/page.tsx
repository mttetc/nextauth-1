import SignUpForm from '@/components/form/SignUpForm';

const page = () => {
  return (
    <>
      <h1 className="text-5xl md:text-6xl">Sign up</h1>
      <div className=" bg-base-100 p-10 rounded-md">
        <SignUpForm />
      </div>
    </>
  );
};

export default page;