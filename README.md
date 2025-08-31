# Blog App with React and Appwrite

This is a modern blog application built with React, Vite, and Appwrite. It provides a simple and clean interface for reading and writing blog posts.

## Features

*   **User Authentication:** Secure user registration and login.
*   **Create, Read, Update, Delete (CRUD) Posts:** Authenticated users can create, edit, and delete their own blog posts.
*   **Rich Text Editor:** A full-featured rich text editor for writing and formatting posts.
*   **Responsive Design:** The application is fully responsive and works on all screen sizes.
*   **Appwrite Integration:** Utilizes Appwrite for backend services like authentication and database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or higher)
*   npm
*   An Appwrite account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/blog-app.git
    cd blog-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Appwrite:**
    *   Create a new project on your Appwrite console.
    *   Create a new database and a collection for your posts.
    *   You will need the following environment variables. Create a `.env` file in the root of the project and add the following:

    ```env
    VITE_APPWRITE_URL="<your-appwrite-url>"
    VITE_APPWRITE_PROJECT_ID="<your-appwrite-project-id>"
    VITE_APPWRITE_DATABASE_ID="<your-appwrite-database-id>"
    VITE_APPWRITE_COLLECTION_ID="<your-appwrite-collection-id>"
    VITE_APPWRITE_BUCKET_ID="<your-appwrite-bucket-id>"
    ```

### Running the Application

Once you have completed the installation steps, you can start the development server:

```bash
npm run dev
```

This will run the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Available Scripts

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production.
*   `npm run lint`: Lints the code using ESLint.
*   `npm run preview`: Serves the production build locally.

## Technologies Used

*   **Frontend:**
    *   React
    *   Vite
    *   Redux Toolkit
    *   React Router DOM
    *   Tailwind CSS
*   **Backend:**
    *   Appwrite
*   **Form Handling:**
    *   React Hook Form
*   **Rich Text Editor:**
    *   TinyMCE
