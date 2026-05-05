This project is a backend focused, full-stack blockchain application, built with Node.js and React. 

The project simulates a cryptocurrency network where multiple peer nodes run simultaneously, synchronize their chains via PubNub, authenticate users with JWT, and persist data to MongoDB.

The frontend is simple and created using React and Vite.


The backend follows a strict MVC pattern and is using the following dependencies: 

#express - HTTP server and routing

#jsonwebtoken - JWT creation and verification

#bcryptjs - Password hashing and comparison

#mongoose - MongoDB ODM and schema definition

#pubnub - Real-time peer-to-peer chain/transaction broadcast

#elliptic - secp256k1 key pairs and digital signatures

#uuid - Unique transaction IDs

#dotenv - Environment variable 

#validator - Email format validation

#helmet - HTTP security headers

#cors - Cross-origin resource sharing

#express-mongo-sanitize - NoSQL injection prevention

#hpp - HTTP parameter pollution prevention

#express-rate-limit - Request rate limiting

#nodemon - Dev auto server restart

#cross-env - Cross-platform environment variables



#How to run

Backend:

add file: config/config.env in back-end root: 

PORT=3000

NODE_ENV=development

MONGODB_URI=<mongodb+srv://...>

JWT_SECRET=<secret>

JWT_EXPIRES=7d

PUB_KEY=<pubnub publish key>

SUB_KEY=<pubnub subscribe key>

SEC_KEY=<pubnub secret key>

USER_ID=<pubnub user id>

// install dependencies

npm install

// run

npm run dev

// run nodes

npm run dev-node
npm run dev-node
npm run dev-node


Frontend: 

npm install 

npm run dev 



