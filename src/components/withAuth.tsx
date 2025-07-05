'use client';

import { ComponentType } from 'react';
import { ProtectedRoute } from './ProtectedRoute';

/**
 * Higher-order component that wraps a page component with authentication protection
 * @param WrappedComponent - The component to protect
 * @returns Protected component that requires wallet connection
 */
export function withAuth<T extends object>(WrappedComponent: ComponentType<T>) {
  const AuthenticatedComponent = (props: T) => {
    return (
      <ProtectedRoute>
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };

  // Set display name for debugging
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
}
