'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams ? searchParams.get('role') || '' : '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/editor/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password,
        role,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      if (role === 'youtuber') {
        router.push('/dashboard/youtuber');
      } else {
        router.push('/dashboard/editor');
      }
    } else {
      setErrorMessage(data.error || 'Something went wrong.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Register as {role === 'youtuber' ? 'YouTube Creator' : 'Editor'}
        </h1>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <div className="space-y-2 text-gray-600">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2 text-gray-600">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full text-white" variant="outline">
          Register
        </Button>
      </form>
    </div>
  );
}

export default function RegisterForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterFormContent />
    </Suspense>
  );
}
