'use client';

import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          fontSize: '1.5rem',
          color: 'var(--color-dark)',
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
