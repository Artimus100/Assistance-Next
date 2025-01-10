'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Workspace() {
  const params = useParams()
  const workspaceName = params.name
  const [videos, setVideos] = useState<string[]>([])
  const [newVideo, setNewVideo] = useState('')

  const handleUploadVideo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newVideo) {
      setVideos([...videos, newVideo])
      setNewVideo('')
    }
  }

  const handleApproveVideo = (video: string) => {
    // Here you would typically handle the YouTube API upload
    console.log(`Approving and uploading video: ${video}`)
    setVideos(videos.filter(v => v !== video))
  }

  const handleRejectVideo = (video: string) => {
    console.log(`Rejecting video: ${video}`)
    setVideos(videos.filter(v => v !== video))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Workspace: {workspaceName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
          <form onSubmit={handleUploadVideo} className="space-y-4">
            <div>
              <Label htmlFor="videoUpload">Video File</Label>
              <Input
                id="videoUpload"
                type="file"
                accept="video/*"
                onChange={(e) => setNewVideo(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Upload Video</Button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Uploaded Videos</h2>
          {videos.length > 0 ? (
            <ul className="space-y-4">
              {videos.map((video, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{video}</span>
                  <div className="space-x-2">
                    <Button onClick={() => handleApproveVideo(video)} variant="outline">
                      Approve
                    </Button>
                    <Button onClick={() => handleRejectVideo(video)} variant="destructive">
                      Reject
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No videos have been uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

