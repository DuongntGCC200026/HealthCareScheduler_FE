// src/pages/AboutPage.jsx

import FullLayout from "../components/layouts/User/Full";
import { Container, Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

function ProfilePage() {
  const [show, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(!show);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <FullLayout>
      <Container>
        {/* <section className="section profile d-flex justify-content-center alignItems-center">
          <div className="card" style={{ width: "700px", height: "600px" }}>
            <div className="card-body pt-3">
              <div className="tab-content pt-2">
                <div
                  className="tab-pane fade show active profile-overview"
                  id="profile-overview"
                >
                  <h3 className="text-center">Edit Profile</h3>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label mt-2">Email</div>
                    <div className="col-lg-9 col-md-8">
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label mt-2">
                      New Password
                    </div>
                    <div className="col-lg-9 col-md-8">
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label mt-2">
                      Confirm Password
                    </div>
                    <div className="col-lg-9 col-md-8">
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label mt-2 ">
                      First Name
                    </div>
                    <div className="col-lg-9 col-md-8">
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label mt-2 ">
                      Last Name
                    </div>
                    <div className="col-lg-9 col-md-8">
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label mt-2">
                      Day of Birth
                    </div>
                    <div className="col-lg-9 col-md-8">
                      <input
                        type="datetime-local"
                        id="meetingDate"
                        name="meetingDate"
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label mt-2">
                      Phone Number
                    </div>
                    <div className="col-lg-9 col-md-8">
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label mt-2">Address</div>
                    <div className="col-lg-9 col-md-8">
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="text-center">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              View Medical Record
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="">
              <div className="mb-3">
                <label>Diagnosis</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={"The patient has been diagnosed with pneumonia based on their symptoms, physical examination, and chest X-ray results."}
                >
                  
                </input>
                <div className="invalid-feedback"></div>
              </div>

              <div className="mb-3">
                <label>Treatment</label>
                <input
                  type="text"
                  className="form-control"
                  value={"The recommended treatment for the patient's pneumonia includes a course of antibiotics (such as amoxicillin) to target the bacterial infection, along with rest and plenty of fluids to aid recovery."}
                  readOnly
                >
                </input>
                <div className="invalid-feedback"></div>
              </div>

              <div className="mb-3">
                <label>Note</label>
                <textarea className="form-control" rows={2} readOnly>
                  During the consultation, it was noted that the patient has a
                  history of asthma and allergies to penicillin. Therefore,
                  alternative antibiotics, such as azithromycin, were prescribed
                  to avoid any adverse reactions.
                </textarea>
                <div className="invalid-feedback"></div>
              </div>

              <div className="mb-3">
                <label>Prescription</label>
                <textarea className="form-control" rows={4} readOnly>
                  The prescription provided to the patient includes a 7-day
                  course of azithromycin (250mg tablets, take one tablet daily),
                  along with instructions to monitor symptoms and follow up with
                  a healthcare provider if there is no improvement or if
                  symptoms worsen.
                </textarea>
                <div className="invalid-feedback"></div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="d-flex justify-content-center align-items-center">
          <h2>My Medical History</h2>
        </div>
        <div className="row">
          <div className="card rounded shadow border-0">
            <div className="card-body p-5 bg-white rounded">
              <div className="table-responsive">
                <table
                  id="example"
                  className="table table-striped table-bordered"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date and Time</th>
                      <th>Service Name</th>
                      <th>Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>20/04/2024 08:50:45</td>
                      <td>General Testing</td>
                      <td className="text-success">Completed</td>
                      <td className="text-center">
                        <Button
                          className="btn btn-success me-3"
                          onClick={handleShow}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Button>
                        <Button className="btn btn-danger">
                          <i className="bi bi-trash2-fill"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>27/04/2024 08:50:45</td>
                      <td>General Testing</td>
                      <td className="text-success">Completed</td>
                      <td className="text-center">
                        <Button className="btn btn-success me-3">
                          <i className="bi bi-pencil-fill"></i>
                        </Button>
                        <Button className="btn btn-danger">
                          <i className="bi bi-trash2-fill"></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullLayout>
  );
}

export default ProfilePage;
