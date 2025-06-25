# Todo App (MERN Stack)

A full-featured Todo App built using the **MERN stack (MongoDB, Express, React, Node.js)**. Users can create, update, delete, and filter todos. The app also shows status and creation date for better task tracking.

---

##  Features

- Add new todos with optional due dates
- Mark todos as completed or active
- Edit and delete existing todos
- Filter by All / Active / Completed
- Display creation and due dates
- Responsive UI built with SCSS

---

## Tech Stack

- **Frontend**: React + Vite + SCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **API Tool**: Axios

---

## ⚙️ Getting Started

### 1. Clone the Repository

git clone https://github.com/your-username/todo-app.git
cd todo-app

**2. Setup the Backend**
cd server
npm install

**Create a .env file in the server/ directory with the following content:**
PORT=8000
DB_URL=mongodb://localhost:27017/todoapp

**▶️ Start the Backend Server**
npm run dev

Make sure MongoDB is installed and running on your system.

**3. Setup the Frontend**
cd ../ui
npm install
npm run dev
Your frontend should now be live at: http://localhost:5173
