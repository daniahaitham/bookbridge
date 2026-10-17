# BookBridge-BackEnd


# API
**Base URL:** http://localhost:5000
**Headers used:**
- `Content-Type: application/json`
- `X-Role: admin` (only for admin-only endpoints)


### Auth
**POST /api/auth/signup**
  - Create a new user.
  - Body: { "name": "Sara", "email": "sara@mail.com", "phonenum": "0790000000", "password": "secret" } 
  - Responses: 201 Created, 400 User already exists

**POST /api/auth/login**
  - Login with email & password.
  - Body: { "email": "sara@mail.com", "password": "secret" }
  - Responses: 200 OK, 401 Invalid credentials


 
### Users
**GET /api/users** (admin only)
  - Get all users.
  - Responses: 200 OK, 500 Internal server error

**GET /api/users/:id**
  - Get a single user by id.
  - Responses: 200 OK, 404 User not found

**POST /api/users**
  - Create a user.
  - Body: { "name": "Omar", "email": "omar@mail.com", "phonenum": "079...", "password": "secret", "is_admin": false }
  - Responses: 200 OK, 500 Internal server error

**PUT /api/users/:id**
  - Update a user by id.
  - Body: { "name": "Omar Updated", "email": "omar@mail.com", "phonenum": "079...", "password": "secret", "is_admin": false }
  - Responses: 200 OK, 404 User not found

**DELETE /api/users/:id**
  - Delete a user.
  - Responses: 200 OK, 404 User not found

    

### Books
**GET /api/books/all**
  - List all books.
  - Responses: 200 OK, 500 Internal server error

**GET /api/books?userid=123**
  - List books by a specific user.
  - Responses: 200 OK, 400 userid is required

**GET /api/books/:id**
  - Get a single book.
  - Responses: 200 OK, 404 Book not found

**POST /api/books**
  - Create a book.
  - Body: { "userid": 1, "title": "Clean Code", "author": "Robert C. Martin", "price": 12.5, "category": "sell", "description": "...", "cover": "/img/clean-code.jpg", "availability": true }
  - Responses: 201 Created, 500 Internal server error

**PUT /api/books/:id?userid=1**
  - Update a book (owner only).
  - Body: { "title": "Clean Code (2nd Ed.)", "availability": false }
  - Responses: 200 OK, 404 Book not found or not owned by user

**DELETE /api/books/:id?userid=1**
  - Delete a book (owner only).
  - Responses: 200 OK, 404 Book not found or not owned by user


### Requests
**POST /api/req/:bookid**
  - Send a request for a book.
  - Body: { "requesterid": 5, "ownerid": 1 }
  - Responses: 201 Created, 400 Bad Request, 404 Book not found

**GET /api/req**
  - List all requests.
  - Responses: 200 OK, 500 Internal server error

**GET /api/req/incoming?ownerid=1**
  - List incoming requests for a specific owner.
  - Responses: 200 OK, 500 Internal server error

**GET /api/req/mine?requesterid=5**
  - List your own outgoing requests.
  - Responses: 200 OK, 400 requesterid is required

**PATCH /api/req/:id**
  - Update a request status.
  - Body: { "status": "accepted" }
  - Responses: 200 OK, 500 Internal server error

### Complaints
**POST /api/complaints**
  - Submit a complaint.
  - Body: { "userid": 5, "subject": "Damaged cover", "description": "The cover is torn.", "priority": "high" }
  - Responses: 201 Created, 400 subject and description are required

**GET /api/complaints**
  - List all complaints (admin can resolve).
  - Responses: 200 OK, 500 Internal server error



# ⚙️ Status Codes
200 OK – Successful fetch/update

201 Created – Resource created

400 Bad Request – Missing/invalid params (e.g., userid required)

401 Unauthorized – Invalid credentials

404 Not Found – Resource not found or not owned by user

500 Internal Server Error – Unexpected error



# 📌 Notes
Some endpoints require query params:

GET /api/books?userid=...

PUT /api/books/:id?userid=...

GET /api/req/incoming?ownerid=...

GET /api/req/mine?requesterid=...

GET /api/req/got?requesterid=...
