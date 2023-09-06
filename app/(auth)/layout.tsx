import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className='bg-gray-900 p-10 rounded-md'>{children}</div>;
};

export default AuthLayout;