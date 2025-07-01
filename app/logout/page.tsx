'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react'; // Lucide icons are integrated with ShadCN

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: '/login' });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Signing Out...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center space-x-2 py-6">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Please wait</span>
        </CardContent>
      </Card>
    </div>
  );
}
