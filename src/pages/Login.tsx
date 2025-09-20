import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthDialog } from '@/components/auth/AuthDialog';

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  // If user is already authenticated, redirect to intended page
  if (user) {
    return <Navigate to={from} replace />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="w-full max-w-md">
        <AuthDialog open={true} onOpenChange={() => {}} defaultTab="login" />
      </div>
    </div>
  );
};

export default Login;
