# Expense Tracker Backend
## Project Overview
**This project is a backend API for an Expense Tracker website built using Node.js, Express.js, MongoDB and Firebase Authentication**

**It provides secure user authentication, expense management and reporting features. All API endpoints are tested using Postman and documented for easy integration with frontend application.** 

## Features:
- User registration, login and logout using Firebase Authentication (Email/Password).
- Add update, delete and fetch user-specific expenses.
- Generate monthly and category-wise expense reports.
- Authentication middleware and input validation.
- Tested with Postman (Collection included).
---
## Tech Stack
**- Language:** Javascript (Node.js)

**- Framework:** Express.js

**- Authentication:** Firebase Authentication (Email/Password)

**- Database:** MongoDB (Mongoose)

**- Testing Tool:** Postman

---
## Repository Structure
```
ExpenseTrackerBackend_<YourName>/
├── src/
│   ├── controllers/        # Route controllers
│   ├── firebase/           # Firebase configuration
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── utils/              # MongoDB connection
│   └── server.js           # Entry point
├── package.json
├── .env                    # Environment variables
├── postman_collection.json # Postman collection
└── API_Documentation.pdf   # API documentation
```

## Setup Instructions
**1. Clone the repository**
```
git clone https://github.com/Praveen16-afk/ExpenseTrackerBackend_PraveenKumarRM
cd ExpenseTrackerBackend_PraveenKumarRM
```
**2. Install dependencies**
```
npm install
```

**3. Create a .env file in the root directory with the following format:**
```
PORT=4000
MONGODB_URL=<mongodb-connection-string>
FIREBASE_SERVICE_ACCOUNT={"type": "<type>","project_id": "<project_id>","private_key_id": "<private_key_id>","private_key": "<private_key","client_email": "<client_email>","client_id": "<client_id>","auth_uri": <auth_uri>","token_uri": "<token_uri>","auth_provider_x509_cert_url": "<auth_provider_x509_cert_url>","client_x509_cert_url": "<client_x509_cert_url>","universe_domain": "<universe_domain>"}
FIREBASE_API_KEY=<firebase-api-key>
```

**4. Start the server**
```
node src/server.js     # using Node
nodemon src/server.js  # using Nodemon
```

**5. Server will run at**
```
http://localhost:4000
```

## API Endpoints
**1. User Authentication**
| Endpoint |	Method |	Description |	Auth Required
|----------|---------|--------------|--------------|
| /api/register |	POST |	Register a new user |	No
| /api/login |	POST |	Login user and get Firebase token |	No
| /api/logout |	POST |	Logout user |	Yes

**Example Request - Registration**
```
{
  "email": "test@gmail.com",
  "password": "test123"
}
```
**Example Response**
```
{
  "message": "User registered successfully",
  "uid": "firebase-uid"
}
```

**Example Request - Login**
```
{
  "email": "test@gmail.com",
  "password": "test123"
}
```
**Example Response**
```
{
  "token": "<firebase-token>",
  "message": "Login successful"
}
```

**Example Request - Logout**
```
Headers => Authorization -> Bearer <firebase-token>
```
**Example Response**
```
{ 
  "message": "Logout successfully" 
}
```
---

**2. Expense Management**
| Endpoint |	Method |	Description |	Auth Required
|----------|---------|--------------|--------------|
| /api/expenses |	GET |	Get all user expenses |	Yes
| /api/expenses/:id |	GET |	Get expense by ID |	Yes
| /api/expenses |	POST |	Add a new expense |	Yes
| /api/expenses/:id | PUT | Update an expense | Yes
| /api/expenses/:id | DELETE | Delete an expense | Yes

**Example Add Expense Request**
```
{ 
  "title": "Lunch", 
  "amount": 250, 
  "category": "Food", 
  "date": "2025-10-12" 
}
```
**Example Response**
```
{ 
  "message": "Expense added successfully", 
"  id": "68f65b7e8583de88c184a6c2"
}
```
**Example - Update Expense Request**
```
{ 
  "title": "Lunch", 
  "amount": 250, 
  "category": "Food", 
  "date": "2025-10-10" 
}
```
**Example Response**
```
{ 
  "message": "Expense updated successfully" 
}
```

**Example - Delete expense**
```
Headers => Authorization -> Bearer <firebase-token>
```
**Example Response**
```
{ 
  "message": "Expense deleted successfully" 
}
```

**Example - Get Expense By ID**
```
Headers => Authorization -> Bearer <firebase-token>
```
**Example Response**
```
{ 
  "id": "68f663c48583de88c184a6c7", 
  "title": "Lunch", 
  "amount": 250, 
  "category": "Food", 
  "date": "2025-10-12T00:00:00.000Z" 
}
```

**Example - Get All Expense of Logged In User**
```
Headers => Authorization -> Bearer <firebase-token>
```
**Example Response**
```
[

  { 
    "id": "68f663c48583de88c184a6c7", 
    "title": "Lunch", 
    "amount": 250, 
    "category": "Food", 
    "date": "2025-10-12T00:00:00.000Z" 
  }, 
  { 
    "id": "68f6690b2af870673106c44d", 
    "title": "Dinnerh", 
    "amount": 550, 
    "category": "Food", 
    "date": "2025-10-20T00:00:00.000Z" 
  } 
]
```
---
**3. Reports**
| Endpoint |	Method |	Description |	Auth Required | Query Params |
|----------|---------|--------------|---------------|--------------|
| /api/reports/monthly |	GET |	Get monthly summary |	Yes | month=MM&&year=YY |
| /api/reports/category |	GET |	Get expenses filtered by category |	Yes | category=Food |

**Example Monthly Report Query params**
```
Query Params (month=MM&&year=YYYY) 
http://localhost:4000/api/reports/monthly/?month=10&&year=2025
```
**Example Monthly Report Response**
```
{ 
  "total": 1550, 
  "categories": { 
    "Food": 900, 
    "Snacks": 450, 
    "Beverages": 200 
  }
}
```

**Example Category Report Query param**
```
Query param (category=Food)
http://localhost:4000/api/reports/category/?category=Food
```
**Example Category Report Response**
```
[

  {
    "_id": "68f66fa51d19ff298e40ae63",
    "title": "Dinnerh", 
    "amount": 550, 
    "date": "2025-10-20T00:00:00.000Z" 
  },
  {
    "_id": "68f66fa51d19ff298e40ae63", 
    "title": "Lunch", 
    "amount": 350, 
    "date": "2025-10-12T00:00:00.000Z" 
  }
]
```
---
## Testing
**- All API routes are tested using Postman.**

**- The Postman Collection (```postman_collection.json```) is included in the repository.**

**- Both success and failure scenarios are validated:**
    - Invalid/Missing token
    - Missing fields
    - ALready registered email

---
## Additional Features
**- Middleware for authentication validation (req.user.uid)**

**- Input validation using express-validator**

**- Custom error-handling middleware**

**- Clean and modular folder structure**

**- Meaningful variable names and comments**

**- Optional filtering/sorting routes**

**- Aggregation-based monthly reports**

---
## Brownies
**- Secure backend with Firebase Authentication**

**- Proper HTTP status codes (400, 401, 404, 409 (For duplicate), 500)**

**- Easy-to-understand API documentation (```API_Documentation.pdf```)**

---
# Author: PRAVEEN KUMAR R M
