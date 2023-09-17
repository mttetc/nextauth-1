import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className='bg-base-100 p-10 rounded-md'>{children}</div>;
};

export default AuthLayout;