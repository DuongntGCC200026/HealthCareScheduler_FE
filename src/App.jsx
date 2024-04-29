// src/App.js (or src/App.jsx)

import React from "react";
import HomePage from "./pages/HomePage";
import { useRoutes } from "react-router-dom";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPgae";
import AdminPage from "./pages/AdminPage";
import BranchPage from "./pages/BranchPage";
import AccountPage from "./pages/AccountPage";
import DoctorPage from "./pages/DoctorPage";
import ManagePage from "./pages/ManagePage";
import AppointmentPage from "./pages/ApponintmentPage";
import PatientPage from "./pages/PatientPage";
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/ProfilePage";

// import FeedbackPage from './pages/FeedbackPage';

function App() {
  const router = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/services",
      element: <ServicesPage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/admin",
      children: [
        {
          path: "dashboard",
          element: <AdminPage />,
        },
        {
          path: "branch",
          element: <BranchPage />,
        },
        {
          path: "account",
          element: <AccountPage />,
        },
        {
          path: "manager",
          element: <ManagePage />,
        },
        {
          path: "appointment",
          element: <AppointmentPage />,
        },
        {
          path: "doctor",
          element: <DoctorPage />,
        },
        {
          path: "patient",
          element: <PatientPage />,
        },
        {
          path: "feedback",
          element: <FeedbackPage />,
        },
      ],
    },
  ]);
  return router;
}

export default App;
