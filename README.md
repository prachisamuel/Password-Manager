# Password Manager Website

## Overview
This is a simple Password Manager website that allows users to store and manage their passwords securely. The backend is built with Node.js and Express, and it uses MongoDB for the database. The frontend is created using React and styled with Tailwind CSS.

## Features
- Store passwords securely
- Retrieve and manage saved passwords
- Simple and intuitive user interface

## Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB

### Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/prachisamuel/Password-Manager.git
    cd Password-Manager
    ```

2. **Backend Setup:**
    ```sh
    cd passop/backend
    npm install
    ```

3. **Create a `.env` file in the backend directory and add your MongoDB URI:**
    ```env
    MONGODB_URI=mongodb://localhost:27017
    ```

4. **Start the backend server:**
    ```sh
    npm start
    ```

5. **Frontend Setup:**
    ```sh
    cd ..
    npm install
    ```

6. **Start the frontend development server:**
    ```sh
    npm run dev
    ```

## Usage
- Open your browser and go to `http://localhost:3000`
- Use the interface to add, view, and manage your passwords

