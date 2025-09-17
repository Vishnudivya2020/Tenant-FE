📒 Multi-Tenant Notes Application
🚀 Project Overview

This is a Multi-Tenant SaaS Notes Application built with Next.js (frontend) and Node.js + Express (backend).
The app allows multiple tenants (companies) to securely manage their users and notes with role-based access control and subscription limits.

✨ Features Completed

🔑 Authentication: Login with predefined user/admin accounts

🏢 Multi-Tenancy: Each tenant’s data is isolated

📝 Notes Management: Create, list, and delete notes

📊 Plans:

Free Plan → limited notes (5 notes)

Pro Plan → unlimited notes

⬆️ Upgrade to Pro:

“Upgrade to Pro” button visible only when Free tenant reaches the limit

Only Admins can access the Upgrade page.

🛠️ Tech Stack

* Frontend: Next.js (React), Bootstrap for styling

* Backend: Node.js, Express.js

* Database: MongoDB (Mongoose)

* Authentication: JWT + bcrypt

* Hosting: Vercel (frontend + backend)

Deployment

✅ Backend and frontend hosted on Vercel

✅ CORS enabled

✅ Health endpoint available:

GET /health
{ "status": "ok" }

Frontend:-
✅ Minimal frontend with login and notes management

✅ Supports:

Login using predefined accounts

List / create / delete notes

Shows “Upgrade to Pro” when Free tenant reaches note limit.

📘 Approach

Used JWT-based authentication for login

Implemented multi-tenancy by linking users with tenant objects

Role-based access: only Admins can upgrade tenants to Pro

/health endpoint added for monitoring

Deployed on Vercel for both backend and frontend.

🔗 API Endpoints

| Method | Endpoint | Description                      |
| ------ | -------- | -------------------------------- |
| POST   | `/login` | Authenticate user and return JWT |


Notes
| Method | Endpoint     | Description                      |
| ------ | ------------ | -------------------------------- |
| GET    | `/notes`     | Get all notes for logged-in user |
| POST   | `/notes`     | Create a new note                |
| DELETE | `/notes/:id` | Delete a note by ID              |

Tanent/Upgrade

| Method | Endpoint           | Description                                 |
| ------ | ------------------ | ------------------------------------------- |
| POST   | `/tenants/upgrade` | Upgrade tenant from Free → Pro (Admin only) |


Health
| Method | Endpoint  | Description                  |
| ------ | --------- | ---------------------------- |
| GET    | `/health` | Returns `{ "status": "ok" }` |

📦 Predefined Accounts
Acme Inc (Free Plan)

Admin → admin@acme.test / password

User → user@acme.test / password

Globex Corp (Free Plan)

Admin → admin@globex.test / password

User → user@globex.test / password


