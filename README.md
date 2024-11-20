SwiftShift - Movers Management System
=====================================

SwiftShift is a web application built with Flask for managing movers, customers, and admin roles. The system allows users to sign up, log in, and access various functionalities based on their roles (Customer, Mover, Admin). Admins can manage users and movers, while customers can hire movers for their needs.

* * *

Table of Contents
-----------------

*   [Project Overview](#project-overview)
*   [Technologies Used](#technologies-used)
*   [Setup & Installation](#setup--installation)
*   [Configuration](#configuration)
*   [Database Setup](#database-setup)
*   [API Endpoints](#api-endpoints)
*   [Seeding Data](#seeding-data)
*   [Running the App](#running-the-app)
*   [Testing](#testing)
*   [License](#license)

* * *

Project Overview
----------------

SwiftShift provides a platform for managing the entire mover system, including users (customers), movers, and admins. The app supports role-based access, allowing customers to book movers, movers to provide services, and admins to manage the system.

### Key Features:

*   **User Registration & Login:** Customers can sign up, log in, and manage their accounts.
*   **Mover Profile:** Movers can list their services, hourly rates, and experience.
*   **Admin Access:** Admins can manage users, movers, and perform administrative tasks.
*   **JWT Authentication:** Secure user login and registration with JWT tokens.

* * *

Technologies Used
-----------------

*   **Flask:** Python web framework used to build the backend.
*   **Flask-SQLAlchemy:** ORM for database management.
*   **Flask-JWT-Extended:** For secure authentication using JWT.
*   **SQLite:** Lightweight relational database used for development and production.
*   **Flask-Migrate:** Database migration tool to handle schema changes.
*   **Werkzeug:** For secure password handling.

* * *

Setup & Installation
--------------------

### Clone the repository:

```bash
git clone https://github.com/rushionsdomain/SwiftShift.git
cd SwiftShift
```

### Create and activate the virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
```

### Install the dependencies:

```bash
pip install -r requirements.txt
```

* * *

Configuration
-------------

The application is configured via a `Config` class located in `app/config.py`. Some important settings to check or modify:

*   **SQLALCHEMY\_DATABASE\_URI:** Defines the location of your SQLite database (default is `sqlite:///movers.db`).
*   **JWT\_SECRET\_KEY:** A secret key used to sign and verify JWT tokens (you should change it to a secure string in production).

* * *

Database Setup
--------------

The project uses SQLite as the database and Flask-SQLAlchemy for ORM. You need to initialize the database and apply migrations.

### Initialize the database:

1.  Set the `FLASK_APP` environment variable:
    
    ```bash
    export FLASK_APP=app.app:create_app  # On Windows: set FLASK_APP=app.app:create_app
    ```
    
2.  Initialize the migrations folder:
    
    ```bash
    flask db init
    ```
    
3.  Generate the migration scripts:
    
    ```bash
    flask db migrate -m "Initial migration"
    ```
    
4.  Apply the migrations:
    
    ```bash
    flask db upgrade
    ```
    

This will create the `movers.db` file and set up your database schema.

* * *

Seeding Data
------------

You can seed the database with initial user data using the `seeds.py` script. The seed data includes sample users, movers, and admins.

### Run the seed script:

```bash
python3 app/seeds.py
```

This will populate the database with sample data, which can be useful for development and testing.

* * *

API Endpoints
-------------

### 1\. **User Registration (Signup)**

*   **Endpoint:** `POST /auth/signup`
    
*   **Request Body:**
    
    ```json
    {
      "email": "user@example.com",
      "name": "John Doe",
      "password": "password123",
      "role": "customer"
    }
    ```
    
*   **Response:**
    
    *   Success: `{ "message": "User created successfully" }`
    *   Failure: `{ "message": "Email already exists" }`

### 2\. **User Login**

*   **Endpoint:** `POST /auth/login`
    
*   **Request Body:**
    
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
    
*   **Response:**
    
    *   Success: `{ "access_token": "your_jwt_token_here" }`
    *   Failure: `{ "message": "Invalid credentials" }`

* * *

Running the App
---------------

Once the database is set up, you can run the Flask app locally.

1.  Set the `FLASK_APP` environment variable:
    
    ```bash
    export FLASK_APP=app.app:create_app   # On Windows: set FLASK_APP=app.app:create_app
    ```
    
2.  Run the app:
    
    ```bash
    flask run
    ```
    

The app will be available at `http://localhost:5000`.

* * *

Testing
-------

To run tests, you should have test cases created under the `tests/` directory. You can run the tests using `pytest`:

```bash
pytest
```

* * *

License
-------

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

* * *

Final Thoughts
--------------

SwiftShift is a robust system for managing movers, customers, and admins, with secure authentication and role-based access control. It uses Flask to build the backend and SQLite as the database, and it's easy to set up with just a few simple commands.
