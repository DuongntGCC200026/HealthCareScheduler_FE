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
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ManagerLayout from "../../components/layouts/Admin/Manager";
import appointmentApi from "../../api/appointment";
import userApi from "../../api/user";
import NoData from "/gif/no_data.gif";
import formatDateTime from "../../services/FormatDateTime";
import { useEffect, useState } from "react";
import swalService from "../../services/SwalService";
import handleError from "../../services/HandleErrors";
import * as yup from "yup";
import serviceApi from "../../api/service";
import branchApi from "../../api/branch";
import authService from "../../services/AuthService";

const PerformMedicalPage = () => {
  const row = [
    "#",
    "Patient Name",
    "Doctor Name",
    "Service Name",
    "Date",
    "Note",
    "Status",
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [branches, setBranches] = useState([]);
  const [doctorData, setDoctorData] = useState({});
  const [error, setError] = useState({});
  const [showConfirmButton, setShowConfirmButton] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);

  const [formData, setFormData] = useState({
    appointmentId: "",
    dianosis: "",
    treatment: "",
    note: "",
    prescription: "",
  });

  const [formDataAdd, setFormDataAdd] = useState({
    appointmentId: "",
    userId: "",
    email: "",
    dateTime: "",
    branchId: "",
    noted: "",
    serviceId: "",
    status: "",
    createdDate: "",
  });

  const handleShow = () => {
    setShow(true);
  };

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeAdd = (event) => {
    const { name, value } = event.target;
    setFormDataAdd({
      ...formDataAdd,
      [name]: value,
    });
  };

  const handleShowAdd = () => {
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
    setError({});
    setFormDataAdd({
      appointmentId: "",
      email: "",
      userId: "",
      dateTime: "",
      branchId: "",
      noted: "",
      serviceId: "",
      status: "",
      createdDate: "",
    });
  };

  const showEdit = (id) => {
    const appointmet = appointments.find((appoint) => {
      return appoint.appointmentId === id;
    });
    setFormData((previousState) => {
      return {
        ...previousState,
        appointmentId: appointmet.appointmentId,
      };
    });

    setShow(true);
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

  const schema = yup.object().shape({
    dianosis: yup.string().required("Dianosis name is required"),
    treatment: yup.string().required("Treatment number is required"),
    prescription: yup.string().required("Prescription is required"),
  });
  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      setIsLoading(true);

      const appointment = await appointmentApi.getAppointments({
        appointmentId: formData.appointmentId,
      });
      console.log(appointment);
      const appointmentToUpdate = {
        appointmentId: formData.appointmentId,
        dateTime: appointment[0].dateTime,
        noted: appointment[0].noted,
        status: "Completed",
        patientId: appointment[0].patientId,
        doctorId: appointment[0].doctorId,
        serviceId: appointment[0].serviceId,
        branchId: appointment[0].branchId,
        createdDate: appointment[0].createdDate,
      };
      await appointmentApi.Update(formData.appointmentId, appointmentToUpdate);
      await appointmentApi.AddNewMedicalRecord(formData);

      const appointments = await appointmentApi.getAppointments({
        doctorId: appointment[0].doctorId,
      });
      setAppointments(appointments);

      handleClose();
      swalService.showMessage(
        "Success",
        "Medical Record added successfully",
        "success"
      );
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error.inner);
      const newError = {};
      error.inner.forEach((e) => {
        newError[e.path] = e.message;
      });
      setError(newError);
    } finally {
      setIsLoading(false);
    }
  };

  // Form
  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    try {
      let modifiedSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        dateTime: yup
          .date()
          .required("Date of Birth is required")
          .min(
            new Date(new Date().setDate(new Date().getDate() - 1)),
            "Date must be in the future"
          ),
        serviceId: yup.string().required("Service is required"),
      });
      await modifiedSchema.validate(formDataAdd, { abortEarly: false });

      setIsLoading(true);
      try {
        const userCreated = await userApi.getDoctorByBranch({
          email: formDataAdd.email,
        });

        const AppointmentData = {
          patientId: userCreated[0].userId,
          doctorId: doctorData.userId,
          serviceId: formDataAdd.serviceId,
          branchId: doctorData.branch.branchId,
          dateTime: formDataAdd.dateTime,
          status: "Approved",
          createdDate: new Date(),
          noted: formDataAdd.noted + " " + "(Users do not schedule in advance)",
        };
        console.log(AppointmentData);
        await appointmentApi.AddNew(AppointmentData);
        const appointments = await appointmentApi.getAppointments({
          doctorId: doctorData.userId,
        });
        setAppointments(appointments);
        handleCloseAdd();
        swalService.showMessage(
          "Success",
          "Appointment added successfully",
          "success"
        );
      } catch (error) {
        handleError.showError(error);
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      const newError = {};
      error.inner.forEach((e) => {
        newError[e.path] = e.message;
      });
      setError(newError);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const service = await serviceApi.getAll();
        setServices(service);

        // Fetch branches
        const branch = await branchApi.getAll();
        setBranches(branch);

        // Fetch doctor data
        const user = await authService.getUserData();
        setDoctorData(user);

        // Fetch appointments only after doctor data is fetched
        if (user && user.userId) {
          const appointments = await appointmentApi.getAppointments({
            doctorId: user.userId,
          });
          setAppointments(appointments);
        }
      } catch (error) {
        handleError.showError(error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleFilter(statusFilter);
  }, [statusFilter, appointments]);

  const handleFilter = (status) => {
    setStatusFilter(status);
    if (status === "All") {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(
        (appointment) => appointment.status === status
      );
      setFilteredAppointments(filtered);
    }
  };

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
    <ManagerLayout>
      <Modal
        show={showAdd}
        onHide={handleCloseAdd}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <form onSubmit={handleSubmitAdd}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              Add an Appointment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label>Email (Email account must be registered)</label>
              <input
                type="email"
                className={`form-control ${error.email ? "is-invalid" : ""}`}
                aria-label="Default select example"
                name="email"
                onChange={handleChangeAdd}
              />
              <div className="invalid-feedback">{error.email}</div>
            </div>

            <div className="mb-3">
              <label>Branch</label>
              <input
                className={`form-control`}
                aria-label="Default select example"
                value={doctorData.branch?.name || "No branch"}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label>Select Service</label>
              <select
                name="serviceId"
                className={`form-control ${
                  error.serviceId ? "is-invalid" : ""
                }`}
                aria-label="Default select example"
                onChange={handleChangeAdd}
              >
                <option value="">-- Please choose service --</option>
                {services.map((service, index) => (
                  <option key={index} value={service.serviceId}>
                    {service.serviceName}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{error.serviceId}</div>
            </div>

            <div className="mb-3">
              <label>Date and Time</label>
              <input
                type="datetime-local"
                name="dateTime"
                className={`form-control ${error.dateTime ? "is-invalid" : ""}`}
                onChange={handleChangeAdd}
              ></input>
              <div className="invalid-feedback">{error.dateTime}</div>
            </div>

            <div className="mb-3">
              <label>Noted</label>
              <textarea
                name="noted"
                className="form-control"
                rows={4}
                onChange={handleChangeAdd}
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Close
            </Button>
            <Button variant="info" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" variant="dark" />
              ) : (
                "Submit"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <form onSubmit={handleSubmit}>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.prescription}</div>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="info text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" variant="dark" />
              ) : (
                "Confirm"
              )}
            </Button>
          </Modal.Footer> */}

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {showConfirmButton && (
              <Button
                variant="info text-white"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" variant="dark" />
                ) : (
                  "Confirm"
                )}
              </Button>
            )}
          </Modal.Footer>
        </form>
      </Modal>

      <h3 className="text-center">Perform Medical Appointment</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="filter-select d-flex align-items-center">
          <label htmlFor="statusFilter" className="me-2">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => handleFilter(e.target.value)}
            className="form-select"
            style={{ display: "inline-block", width: "auto" }}
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <Button className="btn btn-info text-white" onClick={handleShowAdd}>
          Add
          <i className="bi bi-plus-circle ms-2"></i>
        </Button>
      </div>

      <div className="row">
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
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={row.length + 1} className="text-center py-4">
                        <Image
                          src={NoData}
                          alt="No data"
                          width={300}
                          className="my-5 py-5"
                        />
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appointment, index) => (
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
                            {appointment.status === "Pending" ||
                            appointment.status === "Approved" ? (
                              <Button
                                className="btn btn-success"
                                onClick={() =>
                                  showEdit(appointment.appointmentId)
                                }
                              >
                                <i className="bi bi-pencil-fill"></i>
                              </Button>
                            ) : appointment.status === "Completed" ? (
                              <Button
                                className="btn btn-warning"
                                onClick={() =>
                                  showMedicalRecord(appointment.appointmentId)
                                }
                              >
                                <i className="bi bi-eye"></i>
                              </Button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
};

export default PerformMedicalPage;
