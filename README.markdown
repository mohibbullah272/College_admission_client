# College Booking Web Application

A user-friendly MERN stack web application designed to allow users to explore, book, and review college services and facilities. The application provides an intuitive interface for browsing colleges, viewing details, submitting admission forms, and managing user profiles, with responsive design and secure authentication.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Routes](#routes)
- [Authentication](#authentication)
- [Contributing](#contributing)


## Features
- **Home Page**: 
  - Search bar to find colleges by name, displaying relevant college cards.
  - Three college cards showcasing college images, names, admission dates, events, research history, and sports.
  - College image gallery featuring graduate group pictures.
  - Research paper links from college students.
  - Review section displaying user feedback and ratings for colleges.
- **College Route**: 
  - Displays 5–6 college cards with images, names, ratings, admission dates, research count, and a "Details" button.
  - Detailed college page with admission process, events, research works, and sports categories.
- **Admission Route**: 
  - Lists college names with input fields for candidate details (name, subject, email, phone, address, date of birth, image).
  - Submit button saves data to the "My College" route.
- **My College Route**: 
  - Displays user’s college details and allows adding reviews with ratings.
  - Reviews are reflected in the home page review section.
- **User Profile**: 
  - Displays user details (name, email, university, address).
  - Edit functionality to update profile information.
- **Authentication**: 
  - Registration and login via email/password, Google, and social media accounts.
  - Password reset functionality.
  - Restricted access to college details and reviews for logged-in users only.
- **Responsive Design**: Fully responsive across desktops, tablets, and mobile devices.
- **Custom 404 Page**: Creative design for handling invalid routes.

## Technologies Used
- **Frontend**: 
  - React.js
  - Typescript
  - Tailwind CSS (for styling)
- **Backend**: 
  - Typescript
  - Express.js
- **Database**: 
  - MongoDB
  - Mongoose
- **Authentication**: 
  - JWT (JSON Web Tokens)
- **Others**: 
  - Axios (for API calls)

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/mohibullah207/college-booking-app.git
   cd college-booking-app
   ```

2. **Install dependencies**:
   - For the backend:
     ```bash
     cd server
     npm install
     ```
   - For the frontend:
     ```bash
     cd client
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `server` directory with the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     ```

4. **Run the application**:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend:
     ```bash
     cd client
     npm start
     ```

5. **Access the app**:
   - Open your browser and navigate to `http://localhost:3000`.

## Usage
- **Browse Colleges**: Use the search bar on the home page to find colleges or explore featured colleges.
- **View Details**: Click the "Details" button on a college card to see in-depth information.
- **Apply for Admission**: Navigate to the "Admission" route, select a college, and submit your details.
- **Manage Profile**: Log in to view and edit your profile details or add reviews in the "My College" section.
- **Authentication**: Register or log in using email/password or Google to access restricted features.

## Screenshots
*Coming soon! Screenshots of the home page, college details, admission form, and profile page will be added.*

## Routes
- `/`: Home page with search, college cards, gallery, research links, and reviews.
- `/colleges`: Lists all available colleges with details.
- `/admission`: Form for submitting admission applications.
- `/my-college`: Displays user’s college details and review submission.
- `/profile`: User profile with edit functionality.
- `/*`: Custom 404 page for invalid routes.

## Authentication
- **Login/Registration**: Supports email/password, Google, and social media authentication.
- **Access Control**: College details and review submission require user login.
- **Password Reset**: Available via email for account recovery.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

