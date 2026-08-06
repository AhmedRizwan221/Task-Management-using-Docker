# Task Management App — Project Health Report

**Project:** Task Management App (frontend + backend)
**Purpose:** Docker learning project — final goal is to containerize the app, build images, and deploy to Docker Hub
**Date of review:** 06 Aug 2026
**Location:** `Desktop/dev/task_management`

---

## 1. Tech Stack

| Layer     | Technology                                 |
| --------- | ------------------------------------------ |
| Backend   | Node.js, Express 5, Mongoose 9             |
| Database  | MongoDB (external connection via URI)      |
| Frontend  | React 19, Vite 8, Redux Toolkit, Axios     |
| Styling   | Tailwind CSS 4 (via Vite plugin)           |
| Tooling   | oxlint (frontend lint), nodemon (backend)  |

---

## 2. Work Completed

### Backend
- [x] Express app scaffolded with middleware (cors, cookie-parser, json, static) — `src/app.js`
- [x] MongoDB connection module with connection caching — `src/db/index.js`
- [x] Task model (task, description, status `pending`/`completed`, timestamps) — `src/models/task.models.js`
- [x] Utility classes: `ApiError`, `ApiRespond`, `asyncHandler`
- [x] Error-handling middleware
- [x] Routes mounted at `/api/v1/task`
- [x] **Add task** — `POST /api/v1/task/add` (fully working, tested)
- [x] **Get single task** — `GET /api/v1/task/:taskId` (fully working)
- [x] **Delete task** — `DELETE /api/v1/task/delete/:taskId` (fully working)
- [x] **Update task** — `PATCH /api/v1/task/update/:taskId` (route exists, logic has bugs — see below)

### Frontend
- [x] Project scaffolded (Vite + React + Tailwind + Redux + React Router)
- [x] Redux store configured with a `task` slice
- [x] Redux thunks: `addTask`, `getSingleTask`, `updateTask`, `deleteTask`
- [x] `TaskForm` component — **Add Task** form (working, tested, navigates home on success)
- [x] `TaskCard` component — **Edit Task** form UI (UI built, not functional)
- [x] Routing set up: `/`, `/addTask`, `/editTask`
- [x] Git history — 5 commits, working tree clean

### Git
- [x] Repository initialized and committed (initial commit → task model/controller → components → error middleware → forms)
- [x] No uncommitted changes

---

## 3. Work Remaining

### 3.1 Backend Fixes Required
- [ ] **Broken `start` script** — `package.json` runs `node server.js`, but the entry file is `src/index.js`. Fix script to `node src/index.js` (or add `server.js`).
- [ ] **`GET all tasks` is missing** — only the controller comment `// get all tasks` exists; no route/controller. The frontend has nothing to list without it.
- [ ] **`updateTask` controller is buggy**:
  - `findByIdAndUpdate` wraps fields in `{ taskValues }` instead of passing values directly (update will not persist).
  - Checks `if (!updateTask)` after assigning `upatedTask` (typo), and returns the wrong variable.
  - No partial-update / status-toggle support.
- [ ] **`.env_sample` is empty** — should document `PORT`, `MONGO_URI`, `CORS_ORIGIN` so the project is runnable by others (and required for Docker).
- [ ] **`status` field is never used** — no way to mark a task `completed`.
- [ ] **Typo** in `error.middleware.js`: `"Somethinfg went wrong"`.
- [ ] No validation library / input sanitization (currently only manual checks).
- [ ] No tests for API endpoints.

### 3.2 Frontend Work Remaining
- [ ] **`Home.jsx` is a placeholder** — it only renders a heading; the dashboard is not built.
- [ ] **`TaskList.jsx` is a placeholder** — no task-list UI, no fetch of all tasks, no delete UI, no status toggle.
- [ ] **`TaskCard` is not functional**:
  - Route `/editTask` has no `:taskId` param, but the component reads `useParams().taskId` → always `undefined`.
  - Form never loads the existing task before editing.
- [ ] **`taskSlice.js` bugs**:
  - `addTask.fulfilled` does `state.tasks = state.tasks.push(...)` — `push` returns a length (number), so `tasks` becomes a number. Must be `[...state.tasks, payload.task]`.
  - `updateTask` thunk never sends the `data` body — axios PATCH is called with no payload.
  - `updateTask.fulfilled` compares `task === updatedTask` by reference — never matches, list won't refresh.
- [ ] No loading/empty/error UI states wired to Redux `loading`/`status`/`error`.
- [ ] `TaskForm` imports unused `useEffect`; `TaskCard` has unused imports/states.
- [ ] Naming mismatch: `TaskCard` is actually an edit form, not a card.

### 3.3 Docker & Deployment (main goal — not started)
- [ ] `Dockerfile` for backend (node image, install deps, run app).
- [ ] `Dockerfile` for frontend (multi-stage: build with Vite → serve static / nginx).
- [ ] `docker-compose.yml` to run backend + frontend (+ MongoDB) together.
- [ ] `.dockerignore` files to exclude `node_modules`, `.git`, `.env`.
- [ ] Nginx config (or similar) to serve the built frontend and proxy `/api` to backend.
- [ ] Environment-variable strategy for containers (`MONGO_URI`, `CORS_ORIGIN`, `VITE_API_URL`).
- [ ] Build and push images to Docker Hub.
- [ ] README with setup/run instructions and Docker commands.

---

## 4. Project Health Summary

| Area          | Status  | Notes                                                              |
| ------------- | ------- | ------------------------------------------------------------------ |
| Backend API   | ~70%    | Add/get/delete work; update broken; list missing; start script broken |
| Frontend UI   | ~40%    | Add form works; list/edit/delete/home are placeholders or broken     |
| State (Redux) | ~60%    | Thunks wired but have logic bugs (push, update payload/compare)       |
| Docker        | 0%      | Nothing containerized yet                                            |

**Blocking issues before Docker step:**
1. Backend `start` script broken (app cannot be started via `npm start`).
2. `GET all tasks` endpoint missing (frontend list cannot work without it).
3. Frontend list + delete + working edit are incomplete.

**Quick win before Docker:** fix the backend `start` script and the `updateTask`/`addTask.fulfilled` slice bugs, then fill `.env_sample`.

---

## 5. Suggested Order of Work
1. Backend: fix start script, implement `getAllTasks`, fix `updateTask`, document `.env_sample`.
2. Frontend: fix slice bugs, build `TaskList` + `Home`, fix `TaskCard` edit flow + route param.
3. Test full CRUD end-to-end.
4. Docker: Dockerfiles → compose → nginx proxy → push to Docker Hub.
