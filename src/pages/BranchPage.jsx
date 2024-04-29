import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../components/layouts/Admin/Admin";
import React, { useState } from "react";

const BranchPage = () => {
  const [show, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(!show);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <AdminLayout>
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
            Perform Medical Examination
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            <div className="mb-3">
              <label>Diagnosis</label>
              <input type="email" name="email" className="form-control" />
              <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
              <label>Treatment</label>
              <input type="email" name="email" className="form-control" />
              <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
              <label>Note</label>
              <textarea className="form-control" rows={2}></textarea>
              <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
              <label>Prescription</label>
              <textarea className="form-control" rows={4}></textarea>
              <div className="invalid-feedback"></div>
            </div>

            <div className="mb-3">
              <input
                type="checkbox"
                id="myCheckbox"
                name="myCheckbox"
                value="yes"
              ></input>
              <label className="ms-2">
                Please bring your medical history (if any) and arrive 15 minutes
                early.
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>

      <h3 className="text-center">Service Management</h3>
      <div className="d-flex justify-content-end">
        <Button className="btn btn-info mb-3">
          Add
          <i className="bi bi-plus-circle ms-2"></i>
        </Button>
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
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Specialization </th>
                    <th>Branch</th>
                    <th>Date of Birth</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>example1@example.com</td>
                    <td>John</td>
                    <td>Patient</td>
                    <td>-</td>
                    <td>123 Main Street, City A</td>
                    <td>1990-01-01</td>
                    <td>123-456-7890</td>
                    <td>City A, Country</td>
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
                  {/* Repeat the above structure 9 more times */}
                  {/* Row 2 */}
                  <tr>
                    <td>2</td>
                    <td>example2@example.com</td>
                    <td>Jane</td>
                    <td>Doctor</td>
                    <td>Cardiology</td>
                    <td>456 Oak Avenue, City B</td>
                    <td>1985-05-15</td>
                    <td>234-567-8901</td>
                    <td>City B, Country</td>
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
                  {/* Row 3 */}
                  <tr>
                    <td>3</td>
                    <td>example3@example.com</td>
                    <td>Michael</td>
                    <td>Branch Manager</td>
                    <td>-</td>
                    <td>789 Pine Street, City C</td>
                    <td>1978-09-20</td>
                    <td>345-678-9012</td>
                    <td>City C, Country</td>
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
                  {/* Rows 4-10 (similar structure with different data) */}
                  <tr>
                    <td>4</td>
                    <td>example4@example.com</td>
                    <td>Emily</td>
                    <td>Doctor</td>
                    <td>Neurology</td>
                    <td>101 Elm Street, City D</td>
                    <td>1982-03-10</td>
                    <td>456-789-0123</td>
                    <td>City D, Country</td>
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

                  {/* Row 5 */}
                  <tr>
                    <td>5</td>
                    <td>example5@example.com</td>
                    <td>William</td>
                    <td>Patient</td>
                    <td>-</td>
                    <td>202 Maple Avenue, City E</td>
                    <td>1975-07-25</td>
                    <td>567-890-1234</td>
                    <td>City E, Country</td>
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

                  {/* Row 6 */}
                  <tr>
                    <td>6</td>
                    <td>example6@example.com</td>
                    <td>Sarah</td>
                    <td>Doctor</td>
                    <td>Pediatrics</td>
                    <td>303 Pine Street, City F</td>
                    <td>1988-12-05</td>
                    <td>678-901-2345</td>
                    <td>City F, Country</td>
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

                  {/* Row 7 */}
                  <tr>
                    <td>7</td>
                    <td>example7@example.com</td>
                    <td>David</td>
                    <td>Patient</td>
                    <td>-</td>
                    <td>404 Oak Avenue, City G</td>
                    <td>1983-09-15</td>
                    <td>789-012-3456</td>
                    <td>City G, Country</td>
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

                  {/* Row 8 */}
                  <tr>
                    <td>8</td>
                    <td>example8@example.com</td>
                    <td>Olivia</td>
                    <td>Doctor</td>
                    <td>Orthopedics</td>
                    <td>505 Elm Street, City H</td>
                    <td>1976-11-20</td>
                    <td>890-123-4567</td>
                    <td>City H, Country</td>
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

                  {/* Row 9 */}
                  <tr>
                    <td>9</td>
                    <td>example9@example.com</td>
                    <td>Ethan</td>
                    <td>Branch Manager</td>
                    <td>-</td>
                    <td>606 Maple Avenue, City I</td>
                    <td>1979-06-30</td>
                    <td>901-234-5678</td>
                    <td>City I, Country</td>
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

                  {/* Row 10 */}
                  <tr>
                    <td>10</td>
                    <td>example10@example.com</td>
                    <td>Isabella</td>
                    <td>Patient</td>
                    <td>-</td>
                    <td>707 Pine Street, City J</td>
                    <td>1984-04-05</td>
                    <td>012-345-6789</td>
                    <td>City J, Country</td>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BranchPage;
