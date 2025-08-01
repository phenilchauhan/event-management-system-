# event-management-system-
# 🎟️ Advanced Event Management System

A full-stack web app built with **React.js** (frontend) and **Node.js + Express + Sequelize + MySQL** (backend). Users can view and register for events, while admins can manage events, locations, and registrations.

---

## 🛠️ Tech Stack

**Frontend**: React.js, Axios, React Router  
**Backend**: Node.js, Express.js, Sequelize ORM, MySQL  
**Auth**: JWT  
**Env Management**: dotenv

---

## 📁 Folder Structure

event-management-system/
├── backend/
├── frontend/

yaml
Copy
Edit

---

## ⚙️ Backend Setup

1. **Go to Backend Folder**

```bash
cd backend
Install Dependencies

bash
Copy
Edit
npm install
Create .env

env
Copy
Edit
DB_NAME=eventdb
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_DIALECT=mysql
PORT=5000
JWT_SECRET=supersecretkey123
Create MySQL Database

sql
Copy
Edit
CREATE DATABASE eventdb;
Start Server

bash
Copy
Edit
node app.js
# or for auto-reload
npx nodemon app.js
Runs at: http://localhost:5000

💻 Frontend Setup
Go to Frontend Folder

bash
Copy
Edit
cd frontend
Install Dependencies

bash
Copy
Edit
npm install
Create .env

env
Copy
Edit
REACT_APP_API_URL=http://localhost:5000
Start React App

bash
Copy
Edit
npm start
Runs at: http://localhost:3000
