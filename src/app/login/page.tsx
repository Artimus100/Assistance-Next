'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login() {
  const router = useRouter()
const searchParams = useSearchParams()
const role = searchParams.get('role') || ''
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle authentication
    // For now, we'll just redirect to the appropriate dashboard
    if (role === 'youtuber') {
      router.push('/dashboard/youtuber')
    } else {
      router.push('/dashboard/editor')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Log in as {role === 'youtuber' ? 'YouTube Creator' : 'Editor'}
        </h1>
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
        <Button  type="submit" className="w-full text-white" variant="outline">
          Log In
        </Button>
      </form>
    </div>
  )
}

