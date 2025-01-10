'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

export default function Register() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle registration with your backend
    console.log('Registering:', { role, name, email, password })
    // For now, we'll just redirect to the appropriate dashboard
    if (role === 'youtuber') {
      router.push('/dashboard/youtuber')
    } else {
      router.push('/dashboard/editor')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Card className="w-full max-w-md text-black">
        <CardHeader>
          <CardTitle>Register as {role === 'youtuber' ? 'YouTube Creator' : 'Editor'}</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {role === 'youtuber' && (
              <div className="space-y-2">
                <Label htmlFor="channel">YouTube Channel URL</Label>
                <Input
                  id="channel"
                  type="url"
                  placeholder="https://www.youtube.com/channel/..."
                  required
                />
              </div>
            )}
            {role === 'editor' && (
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio URL (optional)</Label>
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="https://your-portfolio.com"
                />
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full text-white" variant={'outline'} >Register</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

