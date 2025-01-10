/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

export default function CheckWorkspace() {
    const [workspaceId, setWorkspaceId] = useState('');
    const [workspace, setWorkspace] = useState<any>(null);
    const [message, setMessage] = useState('');

    const handleCheck = async () => {
        try {
            const response = await fetch(`/api/editor/checkWorkspace?workspaceId=${workspaceId}`);
            const result = await response.json();

            if (response.ok) {
                setWorkspace(result.workspace);
                setMessage('Workspace found.');
            } else {
                setMessage(result.error || 'Workspace not found.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Workspace ID"
                value={workspaceId}
                onChange={(e) => setWorkspaceId(e.target.value)}
            />
            <button onClick={handleCheck}>Check Workspace</button>
            {message && <p>{message}</p>}
            {workspace && <pre>{JSON.stringify(workspace, null, 2)}</pre>}
        </div>
    );
}
