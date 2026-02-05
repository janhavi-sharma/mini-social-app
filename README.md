Mini Social Post Application 

A simple full-stack social feed application inspired by the TaskPlanet Social Page. Users can sign up, log in, create posts with text and/or images, like posts, and comment on them.

---

Features :

  🔐 Authentication
  - User signup with name, email, and password
  - Secure login using JWT authentication
  - Password hashing with bcrypt
  - User data stored in MongoDB
  
  📝 Posts
  - Create posts with text, image, or both
  - Validation ensures at least one of text or image is provided
  - Public feed displaying posts from all users
  
  ❤️ Social Interactions
  - Like and unlike posts
  - Add comments to posts
  - View total likes and comments count
  - Display usernames and handles for likes and comments

---

🛠 Tech Stack :

  Frontend
  - React.js
  - TypeScript
  - React Router
  - Axios
  - Custom CSS (no UI libraries)
  
  Backend
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - bcrypt for password hashing

---

API Endpoints :

  Authentication
  - POST /api/auth/signup – Register a new user
  - POST /api/auth/login – Login and receive JWT
  
  Posts
  - GET /api/posts – Fetch all public posts
  - POST /api/posts – Create a post (protected)
  - POST /api/posts/:id/like – Like/unlike a post (protected)
  - POST /api/posts/:id/comment – Add a comment (protected)

---

Environment Variables

  An .env file in the backend root :
  
  MONGO_URI=your_mongodb_connection_string
  
  JWT_SECRET=your_jwt_secret
  
  PORT=5000

---

▶️ Running the Project :

  Backend
  - cd backend
  - npm install
  - npm run dev

  Frontend
  - cd frontend
  - npm install
  - npm start

  Frontend: http://localhost:3000    
  
  Backend: http://localhost:5000
