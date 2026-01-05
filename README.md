# MediMart: Your One-Stop Online Pharmacy 

![MediMart Banner](https://user-images.githubusercontent.com/12583719/208121952-45219159-25cb-485a-8b48-350284f1659c.png) 

![MediMart Home Page](https://user-images.githubusercontent.com/12583719/208123894-6291c070-6921-4467-9958-3f535359a60e.png) 

##  фармацевтическая революция началась! 

Welcome to **MediMart**, a cutting-edge, full-stack MERN e-commerce platform designed to revolutionize the way you access pharmaceutical products. Our mission is to provide a seamless, secure, and user-friendly experience for all your healthcare needs. 

---

### ✨ Features 

*   **Secure User Authentication:** Robust and secure user registration and login system using JSON Web Tokens (JWT) and bcrypt for password hashing. 
*   **Dynamic Product Catalog:** Browse a comprehensive range of medical products, complete with detailed descriptions, images, and pricing. 
*   **RESTful API:** A powerful and well-structured backend API built with Express and Mongoose for efficient data management. 
*   **Modern Frontend:** A sleek and responsive user interface crafted with React and Vite for a lightning-fast user experience. 
*   **Scalable Architecture:** A clean and organized codebase that is easy to maintain and scale. 

---

### 🛠️ Tech Stack 

| Category      | Technology                                                                                             |
| :------------ | :----------------------------------------------------------------------------------------------------- |
| **Frontend**  | [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [React Router](https://reactrouter.com/)      |
| **Backend**   | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/)    |
| **Database**  | [Mongoose](https://mongoosejs.com/)                                                                    |
| **Security**  | [JSON Web Tokens (JWT)](https://jwt.io/), [bcrypt](https://www.npmjs.com/package/bcrypt)                |

---

### 🚀 Getting Started 

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes. 

#### Prerequisites 

*   [Node.js](https://nodejs.org/en/download/) (v14 or newer) 
*   [npm](https://www.npmjs.com/get-npm) 
*   [MongoDB](https://www.mongodb.com/try/download/community) 

#### Installation & Setup 

1.  **Clone the repository:** 
    ```bash
    git clone https://github.com/ahmad12583719/MediMart.git
    cd medimart
    ```

2.  **Backend Setup:** 
    *   Navigate to the `backend` directory: 
        ```bash
        cd backend
        ```
    *   Install dependencies: 
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `backend` directory and add the following: 
        ```
        MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
        ```
    *   Start the backend server: 
        ```bash
        npm start
        ```
    Your backend will be running at `http://localhost:5000`. 

3.  **Frontend Setup:** 
    *   Open a new terminal and navigate to the `frontend` directory: 
        ```bash
        cd frontend
        ```
    *   Install dependencies: 
        ```bash
        npm install
        ```
    *   Start the frontend development server: 
        ```bash
        npm run dev
        ```
    Your frontend will be running at `http://localhost:3000`. 

---

### 📜 Available Scripts 

#### Backend (`/backend`) 

| Script      | Description                               |
| :---------- | :---------------------------------------- |
| `npm start` | Starts the backend server using `node`.   |
| `npm test`  | (To be configured) Runs tests.            |

#### Frontend (`/frontend`) 

| Script        | Description                                       |
| :------------ | :------------------------------------------------ |
| `npm run dev` | Starts the development server with Vite.          |
| `npm run build` | Builds the React app for production.              |
| `npm run lint`  | Lints the code using ESLint.                      |
| `npm preview` | Serves the production build locally for preview.  |

---

### 📁 Project Structure 

```
/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── LICENSE
└── README.md
```

---

### 🤝 Contributing 

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ahmad12583719/MediMart/issues). 

### 📝 License 

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details. 

---

Made with ❤️ by [ahmad12583719](https://github.com/ahmad12583719) 
