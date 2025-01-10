/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold mb-8 text-black ">Welcome to Assistance</h1>
      <p className="text-xl mb-8 text-gray-600">Choose your role to get started:</p>
      <div className="space-x-4">
        <Button asChild variant="outline" className="mr-2">
          <Link href="/register?role=youtuber">I'm a YouTube Creator</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register?role=editor">I'm an Editor</Link>
        </Button>
      </div>
    </div>
  )
}

