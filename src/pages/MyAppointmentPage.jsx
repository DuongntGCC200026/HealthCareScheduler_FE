import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import appointmentApi from "../api/appointment";
import NoData from "/gif/no_data.gif";
import formatDateTime from "../services/FormatDateTime";
import { useEffect, useState } from "react";
import FullLayout from "../components/layouts/User/Full";
import swalService from "../services/SwalService";
import handleError from "../services/HandleErrors";
import authService from "../services/AuthService";

const MyAppointmentPage = () => {
  const row = [
    "#",
    "Patient Name",
    "Doctor Name",
    "Service Name",
    "Date",
    "Branch Name",
    "Note",
    "Status",
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modelTitle, setModelTitle] = useState("Add new Service");
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState({});

  const [formData, setFormData] = useState({
    serviceId: "",
    serviceName: "",
    serviceDescription: "",
  });

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      appointmentId: "",
      dianosis: "",
      treatment: "",
      note: "",
      prescription: "",
    });
    setShowConfirmButton(true);
  };

  const showMedicalRecord = async (id) => {
    const medical = await appointmentApi.getMedicalRecordByAppointmentId(id);
    console.log(medical);

    setFormData((previousState) => ({
      ...previousState,
      dianosis: medical.dianosis,
      treatment: medical.treatment,
      note: medical.note,
      prescription: medical.prescription,
    }));

    setShow(true);
    setShowConfirmButton(false);
  };

  // Remove
  const handleCanelled = (id) => {
    swalService.confirmChangeStatus(async () => {
      try {
        const appointment = await appointmentApi.getAppointments({
          appointmentId: id,
        });

        const appointmentToUpdate = {
          appointmentId: id,
          dateTime: appointment[0].dateTime,
          noted: appointment[0].noted,
          status: "Cancelled",
          patientId: appointment[0].patientId,
          doctorId: appointment[0].doctorId,
          serviceId: appointment[0].serviceId,
          branchId: appointment[0].branchId,
          createdDate: appointment[0].createdDate,
        };

        await appointmentApi.Update(id, appointmentToUpdate);

        const appointments = await appointmentApi.getAppointments({
          patientId: appointment[0].patientId,
        });
        setAppointments(appointments);
      } catch (error) {
        console.log(error);
        handleError.showError(error);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patient = await authService.getUserData();

        const appointments = await appointmentApi.getAppointments({
          patientId: patient.userId,
        });
        setAppointments(appointments);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  const getStatusButtonClass = (status) => {
    switch (status) {
      case "Pending":
        return "btn btn-warning";
      case "Approved":
        return "btn btn-primary";
      case "Completed":
        return "btn btn-success";
      case "Cancelled":
        return "btn btn-danger";
      default:
        return "btn btn-secondary";
    }
  };

  return (
    <FullLayout>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <form>
          <Modal.Header closeButton>
            <Modal.Title>Perform Medical Examination</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label>Dianosis</label>
              <input
                className={`form-control ${error.dianosis ? "is-invalid" : ""}`}
                aria-label="Default select example"
                name="dianosis"
                value={formData.dianosis}
              />
              <div className="invalid-feedback">{error.dianosis}</div>
            </div>

            <div className="mb-3">
              <label>Treatment</label>
              <input
                className={`form-control ${
                  error.treatment ? "is-invalid" : ""
                }`}
                aria-label="Default select example"
                name="treatment"
                value={formData.treatment}
              />
              <div className="invalid-feedback">{error.treatment}</div>
            </div>

            <div className="mb-3">
              <label>Note</label>
              <textarea
                className={`form-control ${error.note ? "is-invalid" : ""}`}
                aria-label="Default select example"
                name="note"
                rows={2}
                value={formData.note}
              />
              <div className="invalid-feedback">{error.note}</div>
            </div>

            <div className="mb-3">
              <label>Prescription</label>
              <textarea
                className={`form-control ${
                  error.prescription ? "is-invalid" : ""
                }`}
                aria-label="Default select example"
                name="prescription"
                rows={5}
                value={formData.prescription}
              />
              <div className="invalid-feedback">{error.prescription}</div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <h3 className="text-center mt-5">My Appointment</h3>

        <div className="row mt-3">
          <div className="card rounded shadow border-0">
            <div className="card-body p-4 bg-white rounded">
              <div className="table-responsive">
                <table
                  id="example"
                  className="table table-striped table-bordered"
                >
                  <thead>
                    <tr>
                      {row.map((item, index) => (
                        <th key={index}>{item}</th>
                      ))}
                      <td className="text-center fw-bold">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length === 0 && (
                      <tr>
                        <td colSpan={row.length} className="text-center py-4">
                          <Image
                            src={NoData}
                            alt="No data"
                            width={300}
                            className="my-5 py-5"
                          />
                        </td>
                      </tr>
                    )}
                    {appointments.map((appointment, index) => (
                      <tr key={index}>
                        <td className="col">{index + 1}</td>
                        <td className="col-2">
                          {appointment.patient.firstName}{" "}
                          {appointment.patient.lastName}
                        </td>
                        <td className="col-2">
                          {appointment.doctorId
                            ? `Dr. ${appointment.doctor.firstName}`
                            : "--"}
                        </td>
                        <td className="col-2">
                          {appointment.service.serviceName}
                        </td>
                        <td className="col-2">
                          {formatDateTime.toDateTimeString(
                            appointment.dateTime
                          )}
                        </td>
                        <td className="col-2">{appointment.branch.name}</td>
                        <td className="col-4">{appointment.noted}</td>
                        <td>
                          <button
                            type="button"
                            className={getStatusButtonClass(appointment.status)}
                          >
                            {appointment.status}
                          </button>
                        </td>
                        <td className="fit-content">
                          <div className="d-flex justify-content-center align-items-center">
                            {(() => {
                              if (
                                appointment.status === "Pending" ||
                                appointment.status === "Approved"
                              ) {
                                return (
                                  <Button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleCanelled(appointment.appointmentId)
                                    }
                                  >
                                    <i className="bi bi-x-lg"></i>
                                  </Button>
                                );
                              } else if (appointment.status === "Completed") {
                                return (
                                  <Button
                                    className="btn btn-warning"
                                    onClick={() =>
                                      showMedicalRecord(
                                        appointment.appointmentId
                                      )
                                    }
                                  >
                                    <i className="bi bi-eye"></i>
                                  </Button>
                                );
                              }
                            })()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullLayout>
  );
};

export default MyAppointmentPage;
