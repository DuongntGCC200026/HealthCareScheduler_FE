// src/App.js (or src/App.jsx)

import React from "react";
import HomePage from "./pages/HomePage";
import { useRoutes } from "react-router-dom";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPgae";
import AdminPage from "./pages/admin/AdminPage";
import BranchManagementPage from "./pages/admin/BranchManagementPage";
import ServiceManagementPage from "./pages/admin/ServiceManagementPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import DoctorPage from "./pages/branchManger/DoctorPage";
// import ManagePage from "./pages/branchManger/BranchManagerPage";
import AppointmentManagementPage from "./pages/branchManger/ApponintmentManagementPage";
import MyAppointmentPage from "./pages/MyAppointmentPage";
import PatientPage from "./pages/PatientPage";
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/ProfilePage";
import AdminProtected from "../src/components/layouts/Admin/AdminProtected";
import BranchProtected from "../src/components/layouts/Admin/BranhManagerProtected";
import DoctorProtected from "../src/components/layouts/Admin/DoctorProtected";
import PerformMedicalPage from "./pages/doctor/PerformMedicalPage";
import "bootstrap/dist/css/bootstrap.min.css";

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
      path: "/myAppointment",
      element: <MyAppointmentPage />,
    },
    {
      path: "/admin",
      children: [
        {
          path: "dashboard",
          element: (
            <AdminProtected>
              <AdminPage />
            </AdminProtected>
          ),
        },
        {
          path: "branch",
          element: (
            <AdminProtected>
              <BranchManagementPage />
            </AdminProtected>
          ),
        },
        {
          path: "service",
          element: (
            <AdminProtected>
              <ServiceManagementPage />
            </AdminProtected>
          ),
        },
        {
          path: "user",
          element: (
            <AdminProtected>
              <UserManagementPage />
            </AdminProtected>
          ),
        },
        // {
        //   path: "manager",
        //   element: <ManagePage />,
        // },
        {
          path: "appointment",
          element: (
            <BranchProtected>
              <AppointmentManagementPage />
            </BranchProtected>
          ),
        },
        {
          path: "doctor",
          element: (
            <BranchProtected>
              <DoctorPage />
            </BranchProtected>
          ),
        },
        {
          path: "patient",
          element: (
            <BranchProtected>
              <PatientPage />
            </BranchProtected>
          ),
        },
        {
          path: "feedback",
          element: <FeedbackPage />,
        },
        {
          path: "performMedical",
          element: (
            <DoctorProtected>
              <PerformMedicalPage />
            </DoctorProtected>
          ),
        },
      ],
    },
  ]);
  return router;
}

export default App;
