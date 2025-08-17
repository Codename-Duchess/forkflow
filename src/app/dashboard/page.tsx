import React from 'react';
import AppPageLayout from '@/components/layout/AppPageLayout';
import Dashboard from '@/components/dashboard/dashboard';
import { getCurrentUser } from '@/lib/auth';

interface DashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {

  const user = await getCurrentUser();
  const params = await searchParams
  const newUser = params.newUser === 'true'
  const userName = typeof params.name === 'string' ? params.name : undefined

  if (!user) {
    // This shouldn't happen if requireAuth is used, but good fallback
    return <div>Please log in</div>
  }

  return (
    <AppPageLayout user={user}>
      <Dashboard user={user} />
    </AppPageLayout>
  );
}