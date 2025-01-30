# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Car Rental Website :
## Overview

This project is a full-stack web application built with *React* for the frontend and *Node.js* for the backend. The app allows users to sign in, log in, search cars and location based information receiving. The tasks are stored in a MySQL database.

**Frontend (React):**
  - The React application handles the user interface and communicates with the backend.
  - It uses **React Router** for navigation and **Axios** for making HTTP requests to the backend.

- **Backend (Node.js & Express):**
  - The backend serves as the API layer, handling requests from the frontend.
  - It is built using **Node.js** and **Express.js**.
  - The backend manages user authentication, CRUD operations for tasks, and integrates by using  **MySQL** .

- **Database (MySQL):**
  - A **MySQL** database stores user and task data.

### Some few assumption for current website are listed below:
* This website is only available for Türkiye, thus the cities list is limited with Türkiye cities.
* After logged in, site again displays log in page in some browsers, go back if that occurs, you will be logged in.

  
