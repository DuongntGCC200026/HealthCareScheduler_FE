// src/pages/AboutPage.jsx

import React from "react";
import FullLayout from "../components/layouts/User/Full";
import { Container } from "react-bootstrap";

function AboutPage() {
  return (
    <FullLayout>
      <Container className="mt-5">
        <div className="text-center mt-5">
          <h1 className="fw-bold">About Us</h1>
        </div>
        <div className="video-container mt-5">
          <video src="video/AboutVideo.mp4" controls autoPlay muted></video>
        </div>
        <div className="mt-5 d-flex justify-content-center align-items-center">
          <h5>
            The Health Center Scheduler is a sophisticated software system
            designed to optimize the management of appointments, resources, and
            patient data within healthcare facilities. Leveraging cutting-edge
            technology, it offers a range of features including appointment
            scheduling, patient registration, electronic medical records
            management, and automated reminders. This comprehensive solution
            streamlines administrative tasks, reduces wait times, and enhances
            patient satisfaction by ensuring efficient coordination of medical
            services. Its intuitive interface and customizable functionality
            make it an invaluable tool for healthcare providers seeking to
            improve operational efficiency and deliver high-quality care to
            patients.
          </h5>
        </div>
      </Container>
    </FullLayout>
  );
}

export default AboutPage;
