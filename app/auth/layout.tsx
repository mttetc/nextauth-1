import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className='bg-slate-200 p-10 rounded-md'>{children}</div>;
};

export default AuthLayout;