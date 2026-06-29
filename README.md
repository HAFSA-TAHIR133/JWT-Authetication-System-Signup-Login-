# SignUpLogin Project (JWT Authentication System)

A full-stack authentication system built with **Node.js, Express, JWT, and React**.  
It supports user signup, login, protected routes, refresh tokens, and logout functionality.

---

##  Features

- User Signup (Register new users)
- User Login (JWT authentication)
- Access Token (short-lived security token)
- Refresh Token (httpOnly cookie-based)
- Protected Routes (Profile / Admin access)
- Auto token refresh system
- Logout (clears session securely)
- Role-based access (User / Admin)
- Secure authentication flow

---

##  Tech Stack

### Backend
- Node.js
- Express.js
- Postgres
- JSON Web Token (JWT)
- Cookies (httpOnly)

### Frontend
- React.js
- Fetch API
- LocalStorage (access token handling)

---

##  Project Structure

```

backend/
│
├── controllers/
├── services/
├── routes/
├── middleware/
├── TokensGenerated/
├── logs/
└── server.js

frontend/
│
├── App.js
├── components/
└── App.css

````

---

##  Authentication Flow

1. User signs up → stored in database
2. User logs in →
   - Access Token (short-lived)
   - Refresh Token (stored in httpOnly cookie)
3. Access Token is used for protected routes
4. If Access Token expires:
   - Refresh Token is used to generate a new Access Token
5. User logs out → refresh token cleared

---

##  API Endpoints

###  Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users/signup` | Register user |
| POST | `/api/v1/users/login` | Login user |
| POST | `/api/v1/users/refresh` | Get new access token |
| POST | `/api/v1/users/logout` | Logout user |

---

###  Protected Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users/profile` | User profile (requires login) |
| GET | `/api/v1/users/admin` | Admin only route |

---

##  How to Run Project

###  Backend Setup

```bash
cd backendpp
pnpm install
pnpm run dev
````

Create `.env` file:

```env
ACCESS_TOKEN_SECRET=your_secret_key
REFRESH_TOKEN_SECRET=your_secret_key
DB_Password=password
```

---

###  Frontend Setup

```bash
cd frontend
pnpm install
pnpm run dev
```

---

##  Token System

### Access Token

* Stored in localStorage
* Expires in short time (15s)
* Used for API requests

### Refresh Token

* Stored in httpOnly cookie
* Expires in longer time (7 days)
* Used to generate new access tokens

---

##  Security Features

* HTTP-only cookies (prevents XSS theft)
* JWT authentication
* Token expiration handling
* Protected middleware for routes

---

##  Future Improvements

* Email verification
* OAuth login (Google/GitHub)
* Role-based dashboard UI
* Production logging (Winston + monitoring)

---
## Screenhsots

* SignUp/Login Page

<img width="1920" height="827" alt="image" src="https://github.com/user-attachments/assets/483efca4-b079-4309-abf0-da1b37383f88" />

* Signup

<img width="1920" height="827" alt="image" src="https://github.com/user-attachments/assets/caa0ff6b-f111-4c98-b4c0-226916f04fa6" />

* Login (Access user profile)

<img width="1920" height="827" alt="image" src="https://github.com/user-attachments/assets/09a9ae66-5f9a-4ca1-bc7e-5f06e7c5409c" />

* Access Admin Panel

<img width="1920" height="827" alt="image" src="https://github.com/user-attachments/assets/acecaff1-2d58-4ee2-8a2f-42b419526b54" />

* Logout

<img width="1920" height="827" alt="image" src="https://github.com/user-attachments/assets/bfcdd4c1-627e-4e2a-af30-5a9c764728e3" />

# Admin

<img width="1920" height="827" alt="image" src="https://github.com/user-attachments/assets/7e71b6e0-1f9e-42fb-95e8-fd0d11a9e78c" />

