import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface VideoCardProps {
  title: string
  onApprove: () => void
  onReject: () => void
}

export function VideoCard({ title, onApprove, onReject }: VideoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Here you would typically add a video player or thumbnail */}
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          Video Player Placeholder
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onApprove} variant="outline">Approve</Button>
        <Button onClick={onReject} variant="destructive">Reject</Button>
      </CardFooter>
    </Card>
  )
}

