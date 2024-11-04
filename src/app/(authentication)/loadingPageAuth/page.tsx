'use client'

import dynamic from 'next/dynamic';

const LoadingPage = dynamic(() => import('@/components/pages/LoadingPage'), {
  ssr: false,
});

const LoadingPageAuth = () => {
  return (
    <LoadingPage />
  );
};

export default LoadingPageAuth;
