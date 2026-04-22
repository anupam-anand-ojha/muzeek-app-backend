🎵 Muzeek Backend

Muzeek Backend is a scalable Node.js + Express server for a music streaming platform. It handles authentication, songs, playlists, and media storage.

⸻

🚀 Features
	•	JWT Authentication
	•	Music & Playlist APIs
	•	Like/Favorite Songs
	•	Search Functionality
	•	Cloud Storage (Audio + Images)
	•	REST API Architecture

⸻

🛠️ Tech Stack

Node.js, Express.js, MongoDB (Mongoose), JWT, Cloudinary/AWS S3, dotenv

⸻

📁 Structure

backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
├── app.js
├── server.js
└── .env

⚙️ Setup

git clone https://github.com/your-username/muzeek-backend.git
cd muzeek-backend
npm install
npm run dev

🔑 .env

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

📡 API (Sample)

Auth → POST /api/auth/register, POST /api/auth/login
Songs → GET /api/songs, POST /api/songs
Playlist → POST /api/playlists, GET /api/playlists/:userId

🔒 Auth Header

Authorization: Bearer <token>

▶️ Run

npm start

👨‍💻 Author

Anupam Anand Ojha
