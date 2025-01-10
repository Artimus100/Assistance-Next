import Link from 'next/link'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Assistance
        </Link>
        <div>
          <Button asChild variant="ghost" className="mr-2">
            <Link href="/dashboard/youtuber">YouTuber Dashboard</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/dashboard/editor">Editor Dashboard</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

