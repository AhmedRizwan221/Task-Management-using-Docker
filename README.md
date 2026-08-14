# Task Management App (MERN + Docker)

A simple task management application built with the MERN stack (MongoDB, Express, React, Node.js) and fully containerized using Docker and Docker Compose. This project was built primarily to practice and implement core Docker concepts — multi-container orchestration, inter-container networking, environment variable management, and image distribution via Docker Hub.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose
- **Image Registry:** Docker Hub

## Features

- Create, view, and manage tasks
- RESTful API backend connected to MongoDB
- Fully containerized frontend, backend, and database
- Persistent data storage using Docker volumes
- Environment-based configuration (no secrets baked into images)

## Project Architecture

The application runs as three separate containers on a shared Docker network, created automatically by Docker Compose:

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│  Frontend   │──────▶│   Backend   │──────▶│   MongoDB   │
│  (React)    │       │  (Express)  │       │             │
│  :5173      │       │   :8000     │       │   :27017    │
└─────────────┘       └─────────────┘       └─────────────┘
```

- **Frontend ↔ Backend:** communicates over the host network via the exposed backend port (the browser reaches the backend through `localhost:8000`, not the Docker service name).
- **Backend ↔ MongoDB:** communicates internally over the Docker Compose network using the service name (`mongo`) as the hostname.
- **Data persistence:** MongoDB data is stored in a named Docker volume, so task data survives container restarts and rebuilds.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose installed

### Run with Docker Compose

Clone the repository and start all services:

```bash
git clone <your-repo-url>
cd Task-Management-using-Docker
docker-compose up --build
```

This will:
1. Build the frontend and backend images from their respective Dockerfiles
2. Pull the official MongoDB image
3. Start all three containers on a shared Docker network
4. Expose the frontend at `http://localhost:5173` and the backend API at `http://localhost:8000`

To stop the containers:

```bash
docker-compose down
```

To stop and also remove the persisted database volume:

```bash
docker-compose down -v
```

### Environment Variables

Environment variables are passed directly through `docker-compose.yml` rather than a `.env` file baked into the images, to keep configuration outside the image build:

| Variable     | Service  | Description                              |
|--------------|----------|-------------------------------------------|
| `MONGO_URI`  | backend  | MongoDB connection string (`mongodb://mongo:27017/taskapp`) |
| `PORT`       | backend  | Port the Express server listens on        |
| `VITE_URL`   | frontend | Backend API URL as reached by the browser (`http://localhost:8000`) |

## Docker Images

Images for this project have been built and pushed to Docker Hub:

- **Backend:** `https://hub.docker.com/repository/docker/ahmedrizwan221/backend-task-management/general`
- **Frontend:** `https://hub.docker.com/repository/docker/ahmedrizwan221/frontend-task_management`

Pull them directly:

```bash
docker pull https://hub.docker.com/repository/docker/ahmedrizwan221/backend-task-management/general
docker pull https://hub.docker.com/repository/docker/ahmedrizwan221/frontend-task_management
```

## Docker Concepts Practiced

- Writing Dockerfiles for a Node.js backend and a React (Vite) frontend
- Multi-container orchestration with Docker Compose
- Container-to-container networking via Docker Compose's default network and service-name resolution
- Managing environment-specific configuration via Compose instead of hardcoding or bundling `.env` files into images
- Persistent storage using named Docker volumes
- Building and pushing custom images to Docker Hub

## Project Structure

```
Task-Management-using-Docker/
├── backend/
│   ├── Dockerfile
│   ├── src/
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Future Improvements

- Add authentication
- Switch frontend to a multi-stage build served with Nginx for production
- Add healthchecks so the backend waits for MongoDB to be ready before connecting
- Split into separate dev/prod Compose files
