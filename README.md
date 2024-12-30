# Backend API

This project is a backend API for user authentication, project management, and contact form submissions. It includes features for managing users, handling project data, and storing contact form queries in a PostgreSQL database. The API is documented using Swagger.

---

## Features

1. **User Authentication**
   - User signup and login using JWT for authentication.

2. **Project Management**
   - Add new projects.
   - Retrieve all projects with optional filtering by start or end date.
   - Fetch a project by its unique ID.

3. **Contact Form Submission**
   - Submit user queries via an endpoint and store them in the database.

4. **API Documentation**
   - Swagger documentation available at `/api-docs`.

---

## Technologies Used

- **Backend Framework:** Node.js (Express)
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Documentation:** Swagger

---

## Prerequisites

1. [Node.js](https://nodejs.org/) installed on your system.
2. [PostgreSQL](https://www.postgresql.org/download/) installed and configured.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Abhimanyu-Rajput14/backend-api.git
cd backend-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory with the following content:
```plaintext
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=backend_api
JWT_SECRET=your_secret_key
```
Replace `your_postgres_username`, `your_postgres_password`, and `your_secret_key` with your specific values.

### 4. Setup Database
Run the following SQL commands in your PostgreSQL console:
```sql
CREATE DATABASE backend_api;

\c backend_api

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Start the Server
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

---

## API Endpoints

### Authentication
- **POST** `/api/auth/signup`: Register a new user.
- **POST** `/api/auth/login`: Login an existing user.

### Project Management
- **POST** `/api/projects`: Add a new project.
- **GET** `/api/projects`: Fetch all projects (optional filters: `start_date`, `end_date`).
- **GET** `/api/projects/{id}`: Fetch project details by ID.

### Contact Form
- **POST** `/api/contact`: Submit a contact form query.

### Documentation
- Visit `/api-docs` for the complete Swagger documentation.


