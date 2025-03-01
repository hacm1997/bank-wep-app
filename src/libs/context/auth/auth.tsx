'use client';

import React from 'react';
import { AuthContextModel } from './auth.model';

export const AuthContext = React.createContext<AuthContextModel | null>(null);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a LaunchProvider');
  }
  return context;
}
