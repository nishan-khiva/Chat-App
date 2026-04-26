QuickChat is a full-stack real-time chat application inspired by WhatsApp.
It supports instant messaging, online users, image sharing, emojis, notifications, group chats, and video calling using sockets and WebRTC.

Built with modern web technologies for learning real-time systems and showcasing full-stack development skills.

 Features
 Authentication
User Registration
User Login
JWT Authentication
Protected Routes

Real-Time Chat
Instant Messaging using Socket.IO
Online/Offline Status
Typing Indicator
Seen Status
Persistent Chat History

Media Features
Emoji Picker
Image Upload
Voice Messages
Notifications

Group Features
Group Chat
Socket Rooms

Video Calling
Peer-to-peer video calling using WebRTC


Tech Stack
Frontend
React
Tailwind CSS
Axios
Socket.IO

Backend
Node.js
Express
MongoDB
Mongoose

Cloud & Deployment
Cloudinary
Vercel
Render
MongoDB Atlas


    Installation
    git clone https://github.com/nishan-khiva/Chat-App.git

    Backend Setup
    cd backend
    npm install

    .env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_secret
    CLOUD_NAME=your_cloudinary_name
    CLOUD_API_KEY=your_cloudinary_key
    CLOUD_API_SECRET=your_cloudinary_secret

    Frontend Setup
    cd frontend
    npm install
    npm run dev

    API Endpoints:-
    POST /api/auth/register
    POST /api/auth/login

    Message Routes:-
    GET /api/messages/users
    GET /api/messages/:id
    POST /api/messages

    Socket Events:-
   
    Client → Server

    sendMessage
    typing
    markSeen
    joinGroup
    groupMessage

    Server → Client

    receiveMessage

    onlineUsers
    typing
    receiveGroupMessage

    Future Improvements
    Message reactions
    Reply to message
    Delete for everyone
    Stories/Status
    End-to-end encryption
    Push notifications
    Mobile app using React Native
    Redis socket scaling    

    Deployment

    Frontend:-
    Deploy frontend on Vercel

    Backend:-
    Deploy backend on Render

    Database:-
    Use MongoDB Atlas

    Author:-
    NISHAN SINGH KHIVA

    Support:-
    If you like this project, give it a ⭐ on GitHub 😎
