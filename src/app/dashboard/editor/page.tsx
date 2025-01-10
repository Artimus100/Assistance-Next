'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function EditorDashboard() {
  const [sharedWorkspaces] = useState(['Workspace 1', 'Workspace 2', 'Workspace 3'])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editor Dashboard</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Shared Workspaces</h2>
        {sharedWorkspaces.length > 0 ? (
          <ul className="space-y-2">
            {sharedWorkspaces.map((workspace, index) => (
              <li key={index}>
                <Link href={`/workspace/${workspace}`} className="text-blue-600 hover:underline">
                  {workspace}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No workspaces have been shared with you yet.</p>
        )}
      </div>
    </div>
  )
}

