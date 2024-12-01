# Eventify 

## Overview

Eventify is a platform designed to create, manage, and participate in various sports events. This application allows event organizers to manage events effectively and attendees to view details, register, and participate.

## Demo Live 
(Needs the server's responses)
[Eventify](https://eventify.vlpha.tech)

## Features 

- **JWT Authentication**: Secure authentication system using JSONWebToken
- **Email Verification**: A rebust notification system, to confirm *register* in the application
- **Event Creation**: Organizers can create events with details like title, description, date, location, and capacity.
- **Event Management**: Includes features to edit or delete events as needed.
- **Participants Management**: View and download participant details for specific events.
- **Sorting and Filtering**: Sort events by date, capacity, or title for better organization.
- **Responsive Design**: Optimized for use on both desktop and mobile devices.

## Tech Stack 

- **Frontend**: React.js, TypeScript , Tailwind CSS 
- **Backend**: Node.js, Nest.js
- **Database**: MongoDB
- **DevOps** : Docker, DockerHub, GithubAction CI/CD, Vercel, EC2
- **Libraries**:
  - `redux redux/toolkit` for global state management.
  - `react-hook-form` for form management.
  - `react-hot-toast` for notifications.
  - `react-spinners` for loading indicators.
  - `lucide-react` for icons.
  - `jspdf` for generating downloadable participant lists.

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB instance running locally or remotely.
- [API Project](https://www.github.com/Zaiidmo/Eventify-API)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Zaiid/eventify-ui.git
   ```
2. Navigate to the project's directory
   ```bash
   cd eventify-ui.git
   ```
3. Install Dependencies
   ```bash
   npm install 
   ```
5. Start the developement 
   ```bash
   npm run dev
   ```

### Usage 

1. Create Events
  - Log in as an `Organizer` and navigate to the dashboard.
  - Use the `Create Event` button to display the form modal and add a new evemt.
2. Manage Events
  - View events in a sortable table in the dashboard
  - Click the event to display the participated users and two buttons to edit or delete the event.
3. Participate to an event
  - Log in as a `user` and navigate to the events page.
  - Click on any event's card you like and scroll down and click in the participate button, notice that the event should not be organizer by the same user who wanna participate
