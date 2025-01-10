# Assistance

**Assistance** is a collaborative platform designed for YouTubers and Editors to streamline the video editing and publishing workflow. The platform allows YouTubers to create workspaces, where Editors can upload videos, and YouTubers can review, approve, or reject them. Once approved, the video can be uploaded directly to YouTube via the YouTube API.

---

## Features

### For YouTubers:
- **Workspace Management**: Create and manage multiple workspaces for collaboration.
- **Video Review**: Stream videos uploaded by Editors directly from AWS S3 buckets.
- **Approval Workflow**: Approve or reject videos with ease.
- **YouTube Integration**: Automatically upload approved videos to YouTube.

### For Editors:
- **Seamless Collaboration**: Access shared workspaces created by YouTubers.
- **Video Uploads**: Upload videos directly to the YouTuber’s workspace (securely stored in AWS S3).
- **Real-Time Feedback**: Work efficiently with the YouTuber’s review process.

---

## Workflow Overview

1. **User Selection**:
   - Users start by selecting their role: YouTuber or Editor.
   - Redirected to the appropriate dashboard upon login.

2. **YouTuber Flow**:
   - Create a new workspace or enter an existing one.
   - Review videos uploaded by Editors.
   - Approve or reject videos:
     - Approved videos are uploaded to YouTube using the YouTube API.

3. **Editor Flow**:
   - Enter workspaces shared by YouTubers.
   - Upload videos for review.

4. **Video Management**:
   - All uploaded videos are stored securely in AWS S3.
   - YouTubers can stream videos for review and trigger YouTube uploads.

---

## Tech Stack

- **Frontend**: Built with modern frameworks (e.g., React, TailwindCSS).
- **Backend**: Node.js for API integration and workflow management.
- **Cloud Storage**: AWS S3 for secure video storage.
- **YouTube Integration**: YouTube API for video uploads.

---

## Setup Instructions

### Prerequisites
1. Node.js installed.
2. AWS credentials with permissions for S3.
3. YouTube API credentials.

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/assistance.git
   cd assistance
