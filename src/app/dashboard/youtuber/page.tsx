/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function YouTuberDashboard() {
  const [workspaceName, setWorkspaceName] = useState('')
  const [workspaces, setWorkspaces] = useState<string[]>([])

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault()
    if (workspaceName) {
      setWorkspaces([...workspaces, workspaceName])
      setWorkspaceName('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Creator Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Create a Workspace</h2>
          <form onSubmit={handleCreateWorkspace} className="space-y-4">
            <div>
              <Label htmlFor="workspaceName">Workspace Name</Label>
              <Input
                id="workspaceName"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="Enter workspace name"
                required
              />
            </div>
            <Button type="submit">Create Workspace</Button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Workspaces</h2>
          {workspaces.length > 0 ? (
            <ul className="space-y-2">
              {workspaces.map((workspace, index) => (
                <li key={index}>
                  <Link href={`/workspace/${workspace}`} className="text-blue-600 hover:underline">
                    {workspace}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't created any workspaces yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

