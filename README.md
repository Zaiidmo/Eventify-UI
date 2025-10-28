# 🎟️ Eventify — Frontend (React + TypeScript)

Eventify is a platform to **create, manage, and participate** in sports events. This frontend provides the user-facing
experience for organizers and attendees: authentication, event creation/management, participation, filtering, and more.

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-18.x-61dafb">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6">
  <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4">
  <img alt="Redux Toolkit" src="https://img.shields.io/badge/Redux%20Toolkit-State%20Management-764ABC">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green">
</p>

---

## Overview

Eventify is a platform designed to **create, manage, and participate** in various sports events. Organizers can publish and
manage events; attendees can browse details, register, and participate.

---

## Demo Live

<!-- > _Needs the server's responses enabled_   -->

> Server responses for some functionalities are desabled by default (e.g. Authentication, Registration ..)
> **Live Demo:** https://eventify.moumni.uk

---

## Features

- 🔐 **JWT Authentication:** Secure authentication via JSON Web Token.
- 📧 **Email Verification:** Robust email flow to confirm registration.
- 🗓️ **Event Creation:** Create events with title, description, date, location, and capacity.
- 🧭 **Event Management:** Edit or delete events as needed.
- 👥 **Participants Management:** View & download participant lists per event.
- 🔎 **Sorting & Filtering:** Sort by date, capacity, or title.
- 📱 **Responsive Design:** Optimized UX for desktop and mobile devices.

---

## Tech Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, NestJS
- **Database:** MongoDB
- **DevOps:** Docker, Docker Hub, GitHub Actions CI/CD, Vercel, EC2
- **Libraries:**
  - `@reduxjs/toolkit` + `react-redux` — global state management
  - `react-hook-form` — forms & validation
  - `react-hot-toast` — notifications
  - `react-spinners` — loading indicators
  - `lucide-react` — icons
  - `jspdf` — generate downloadable participant lists

---

## Installation

### Prerequisites

- Node.js and npm installed
- A running **Eventify API** (NestJS) instance
- MongoDB instance (used by the backend)

### Steps

**1) Clone the repository**

```bash
git clone https://github.com/Zaiid/eventify-ui.git
```

**2) Navigate to the project**

```bash
cd eventify-ui
```

**3) Install dependencies**

```bash
npm install
```

**4) Start the development server**

```bash
npm run dev
```

> The app will run locally (Vite default) — e.g., `http://localhost:5173`.  
> Ensure the API base URL points to your backend.

---

## Usage

### Create Events

1. Log in as an **Organizer** and open the dashboard.
2. Click **Create Event** to open the form modal and add a new event.

### Manage Events

- Browse the sortable dashboard table.
- Click an event to view participants, then use **Edit** or **Delete** actions.

### Participate in an Event

1. Log in as a regular **User** and open the events page.
2. Select an event card, scroll to the details, and click **Participate**.
3. Note: Users cannot participate in events they organize.

---

## Contributing

We welcome contributions!

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push & open a Pull Request 🚀

See **CONTRIBUTING.md** for guidelines.

---

## License

This project is licensed under the **MIT License** — see **LICENSE**.

---

## Contact

Maintainer: **Zaiid Moumni**  
📧 **vlphadev@gmail.com**
