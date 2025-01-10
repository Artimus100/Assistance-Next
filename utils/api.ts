export const fetchWorkspaces = async () => {
    const response = await fetch('/api/workspaces');
    if (!response.ok) {
      throw new Error('Failed to fetch workspaces');
    }
    return response.json();
  };
  
  export const uploadVideo = async (videoData: FormData) => {
    const response = await fetch('/api/videos', {
      method: 'POST',
      body: videoData,
    });
    if (!response.ok) {
      throw new Error('Failed to upload video');
    }
    return response.json();
  };
  