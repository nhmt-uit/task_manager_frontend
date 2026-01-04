📌 Task Management App

A full-stack task management application built to practice real-world CRUD flows, authentication, and user experience optimizations.

## Live Demo
- Frontend: https://taskmanagerfrontend-zeta.vercel.app/login
- Backend API: https://task-manager-backend-0rjk.onrender.com

⸻

🚀 Features
	•	User authentication (JWT-based)
	•	Create / update / delete tasks
	•	Inline task status update (Todo → Doing → Done)
	•	Optimistic UI update with rollback on failure
	•	Pagination, search, and filter by status
	•	Proper loading, empty, and error states
	•	Protected routes with auto logout on 401

⸻

🛠 Tech Stack

Backend
	•	Node.js
	•	Express
	•	MongoDB (Mongoose)
	•	JWT Authentication

Frontend
	•	React
	•	React Router
	•	Ant Design
	•	Axios (with interceptor)

⸻

Demo Flow
	1.	User logs in
	2.	View task list
	3.	Click status tag to update task status
	4.	UI updates instantly (optimistic update)
	5.	Error handling with rollback if API fails

⸻

⚙️ Installation

Backend
    1. git clone https://github.com/nhmt-uit/task-manager-backend.git
    2. cd task-manager-backend
    3. npm install
    4. npm run dev

Create .env file:
    PORT=3001
    MONGO_URI=mongodb://127.0.0.1:27017/task_manager
    JWT_SECRET=your_secret_key

Frontend
    1. npm install
    2. npm start

⸻

💡 Design Decisions
•	PATCH is used for partial updates such as task status
•	Optimistic update is applied to improve UX and reduce unnecessary refetching
•	State is rolled back if API request fails
•	Layout and routing are structured for scalability

⸻

📌 Future Improvements
	•	User roles (Admin / Member)
	•	Task assignment
	•	Admin dashboard
	•	UI enhancements

⸻

👤 Author
	•	GitHub: https://github.com/nhmt-uit
