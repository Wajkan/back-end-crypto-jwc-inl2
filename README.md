# Blockchain Crypto

This project is a backend focused, full-stack blockchain application built with Node.js and React.
The project simulates a cryptocurrency network where multiple peer nodes run simultaneously,
synchronize their chains via PubNub, authenticate users with JWT, and persist data to MongoDB.
The frontend is simple and created using React and Vite.

---

## Dependencies

The backend follows a strict MVC pattern and uses the following dependencies:

| Package | Use |
|---|---|
| express | HTTP server and routing |
| jsonwebtoken | JWT creation and verification |
| bcryptjs | Password hashing and comparison |
| mongoose | MongoDB ODM and schema definition |
| pubnub | Real-time peer-to-peer chain/transaction broadcast |
| elliptic | secp256k1 key pairs and digital signatures |
| uuid | Unique transaction IDs |
| dotenv | Environment variable loading |
| validator | Email format validation |
| helmet | HTTP security headers |
| cors | Cross-origin resource sharing |
| express-mongo-sanitize | NoSQL injection prevention |
| hpp | HTTP parameter pollution prevention |
| express-rate-limit | Request rate limiting |
| nodemon | Dev auto server restart |
| cross-env | Cross-platform environment variables |

The frontend uses the following dependencies:

| Package | Use |
|---|---|
| react | UI framework |
| react-dom | Renders React to the browser |
| vite | Build tool and dev server with hot module replacement |

---

## How to Run

### Backend

Create `config/config.env` in the back-end root:

```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
JWT_EXPIRES=7d
PUB_KEY=your_pubnub_publish_key
SUB_KEY=your_pubnub_subscribe_key
SEC_KEY=your_pubnub_secret_key
USER_ID=your_pubnub_user_id
```

Install dependencies:

```
npm install
```

Run the main server:

```
npm run dev
```

Run additional peer nodes, each in a separate terminal:

```
npm run dev-node
```

### Frontend

Install dependencies:

```
npm install
```

Run the dev server:

```
npm run dev
```
