/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

export default function UploadVideo() {
    const [video, setVideo] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!video) {
            setMessage('Please select a video to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('video', video);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('editorId', '1'); // Replace with logged-in editor ID
        formData.append('workspaceId', '1'); // Replace with selected workspace ID

        try {
            const response = await fetch('/api/editor/uploadVideo', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Video uploaded successfully!');
            } else {
                setMessage(result.error || 'Upload failed.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files?.[0] || null)} />
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Upload</button>
            {message && <p>{message}</p>}
        </form>
    );
}
