# Employee Leave Management

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Employee Leave Management is a full-stack web application built using the MERN stack to facilitate efficient management of employee leave requests and approvals within an organization.

## Features
- **User Authentication**: Secure user authentication using passport.js.
- **Leave Requests**: Employees can submit leave requests with details such as start date, end date, and reason.
- **Leave Approval**: Managers can review and approve/deny leave requests.
- **Dashboard**: Interactive dashboard for employees and managers to track leave history and status.
- **Notifications**: Automatic email notifications for leave request status updates.
- **Admin Panel**: Admins can manage user roles, view logs, and perform administrative tasks.

## Tech Stack
- **Frontend**:
  - React.js
  - Redux for state management
  - Axios for HTTP requests
  - Material-UI for UI components

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB for database
  - passport.js for authentication
  - Nodemailer for email notifications

## Getting Started
To get started with the Employee Leave Management app, follow the steps below:

## Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/kalczugag/Employee-Leave-Management](https://github.com/kalczugag/Employee-Leave-Management.git)
   cd Employee-Leave-Management

2. Install dependencies for the server and client:
   ```bash
   npm install
   npm install --prefix client

3. Set up environment variables:
   - Create a .env file in the server directory and add necessary environment variables (e.g., MongoDB connection string, email configuration).
  
4. Start the development server (both server and client):
   ```bash
   npm run dev

## Contributing
Contributions are welcome! Please follow the [Contributing Guidelines](https://github.com/kalczugag/Employee-Leave-Management).

## License
This project is licensed under the MIT License.
