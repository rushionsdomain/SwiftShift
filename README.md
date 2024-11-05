SwiftShift
==========

SwiftShift is a comprehensive web application designed to make moving house easier and more organized. From finding reputable moving companies to organizing your belongings, managing time effectively, and tracking the entire moving process, SwiftShift is here to streamline the experience and relieve the stress associated with relocation.

Table of Contents
-----------------

*   [Project Overview](#project-overview)
*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Getting Started](#getting-started)
*   [API Endpoints](#api-endpoints)
*   [Testing](#testing)
*   [Contributing](#contributing)
*   [License](#license)

* * *

Project Overview
----------------

Moving to a new home can be overwhelming and challenging, often involving the coordination of multiple tasks and services. SwiftShift simplifies the entire moving process by allowing users to quickly find trusted movers, manage household inventory, schedule services, and track their movers in real-time. It’s built to ensure that all moving-related tasks are in one place, making moving day as smooth as possible.

Features
--------

SwiftShift offers a robust set of features tailored to assist users at every stage of their move:

1.  **User Authentication** - Secure sign-up and login functionality for personalized service.
2.  **Moving Inventory** - Choose from predefined checklists (Bedsitter, Studio, One Bedroom, Two Bedroom) or customize your own inventory to keep track of items.
3.  **Instant Quote Calculator** - Users can get an instant and accurate quote by specifying their inventory and other details.
4.  **Booking and Scheduling** - Book movers based on location and preferred moving date. Includes approval of the calculated quote before scheduling.
5.  **Real-Time Tracking** - Monitor the status and location of movers in real-time and communicate with them directly within the app.
6.  **Push Notifications** - Receive timely updates and notifications on confirmations, status changes, and arrival times.
7.  **Moving Tips and Resources** - Helpful tips and checklists to help users stay organized and prepared for moving day.

Technologies Used
-----------------

### Frontend

*   **ReactJS** - Provides an interactive, responsive, and dynamic user experience.
*   **Redux Toolkit** - Manages application state, ensuring data consistency across the app.

### Backend

*   **Flask** - Powers the API for handling requests, data processing, and business logic.
*   **PostgreSQL** - Reliable database for storing user and inventory data, booking details, and mover information.

### Testing

*   **Jest** - For unit and UI tests on the frontend.
*   **MiniTest** - Ensures robustness of backend logic in Flask.

### Design and Wireframes

*   **Figma** - Mobile-friendly wireframes and prototypes to guide the frontend design.

Getting Started
---------------

### Prerequisites

To run SwiftShift locally, ensure you have:

*   Node.js (for frontend)
*   Python (for backend)
*   PostgreSQL (for database)

### Installation

1.  **Clone the Repository**
    
    ```bash
    git clone https://github.com/rushionsdomain/SwiftShift.git
    cd SwiftShift
    ```
    
2.  **Backend Setup**
    
    *   Navigate to the backend directory:
        
        ```bash
        cd backend
        ```
        
    *   Install Python dependencies:
        
        ```bash
        pip install -r requirements.txt
        ```
        
    *   Configure the PostgreSQL database and apply migrations.
    *   Start the Flask server:
        
        ```bash
        flask run
        ```
        
3.  **Frontend Setup**
    
    *   Navigate to the frontend directory:
        
        ```bash
        cd ../frontend
        ```
        
    *   Install Node dependencies:
        
        ```bash
        npm install
        ```
        
    *   Start the React development server:
        
        ```bash
        npm start
        ```
        
4.  **Database Setup**
    
    *   Ensure PostgreSQL is running and configured correctly.
    *   Run database migrations to set up the required tables and initial data.
5.  **Environment Variables**
    
    *   Set up environment variables (e.g., API keys, database URIs) in `.env` files as specified in both frontend and backend setup instructions.
6.  **Access the Application**
    
    *   Open your browser and go to `http://localhost:3000` to use SwiftShift locally.

API Endpoints
-------------

The backend provides a set of RESTful API endpoints that the frontend interacts with:

1.  **Authentication**
    
    *   `POST /api/auth/register` - Register a new user.
    *   `POST /api/auth/login` - User login.
2.  **Inventory Management**
    
    *   `GET /api/inventory` - Retrieve default inventory items by room type.
    *   `POST /api/inventory/custom` - Add custom items to the inventory.
3.  **Booking and Scheduling**
    
    *   `POST /api/booking/quote` - Calculate and retrieve a quote based on inventory and details.
    *   `POST /api/booking/schedule` - Schedule a move after approving the quote.
4.  **Real-Time Tracking**
    
    *   `GET /api/tracking/status` - Get the current status and location of a mover.
    *   `POST /api/tracking/update` - Update mover status (admin only).
5.  **Notifications**
    
    *   `POST /api/notifications/send` - Push notifications for status updates.

Testing
-------

SwiftShift includes comprehensive testing to ensure reliability and performance:

1.  **Frontend Tests**:
    
    *   Run Jest for frontend unit and integration tests:
        
        ```bash
        npm test
        ```
        
2.  **Backend Tests**:
    
    *   Run Minitests in the backend:
        
        ```bash
        python -m unittest discover
        ```
        

Contributing
------------

We welcome contributions to SwiftShift! To contribute, please follow these steps:

1.  **Fork the Repository**
2.  **Create a Branch**: `git checkout -b feature/new-feature`
3.  **Commit Changes**: `git commit -m 'Add new feature'`
4.  **Push to Branch**: `git push origin feature/new-feature`
5.  **Open a Pull Request**

Please ensure all contributions are reviewed by two team members before merging.

License
-------

This project is licensed under the MIT License. See the LICENSE file for details. 🏠🚚
