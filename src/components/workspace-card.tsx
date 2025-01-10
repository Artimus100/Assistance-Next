import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface WorkspaceCardProps {
  name: string
  videoCount: number
}

export function WorkspaceCard({ name, videoCount }: WorkspaceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          {videoCount} video{videoCount !== 1 ? 's' : ''} uploaded
        </p>
        <Button asChild>
          <Link href={`/workspace/${name}`}>Enter Workspace</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

