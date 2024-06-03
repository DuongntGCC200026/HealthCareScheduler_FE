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

const AppointmentManagementPage = () => {
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
  const [userData, setUserData] = useState({});
  const [error, setError] = useState({});

  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);

  const [formData, setFormData] = useState({
    appointmentId: "",
    patientId: "",
    doctorId: "",
    dateTime: "",
    branchId: "",
    noted: "",
    serviceId: "",
    status: "",
    createdDate: "",
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
      patientId: "",
      doctorId: "",
      dateTime: "",
      branchId: "",
      noted: "",
      serviceId: "",
      status: "",
      createdDate: "",
    });
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
        patientId: appointmet.patientId,
        dateTime: appointmet.dateTime,
        branchId: appointmet.branchId,
        noted: appointmet.noted,
        serviceId: appointmet.serviceId,
        status: appointmet.status,
        createdDate: appointmet.createdDate,
      };
    });

    setShow(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    swalService.confirmChangeStatus(async () => {
      try {
        setIsLoading(true);

        const appointment = await appointmentApi.getAppointments({
          appointmentId: formData.appointmentId,
        });

        const appointmentToUpdate = {
          appointmentId: formData.appointmentId,
          dateTime: appointment[0].dateTime,
          noted: appointment[0].noted,
          status: "Approved",
          patientId: appointment[0].patientId,
          doctorId: formData.doctorId,
          serviceId: appointment[0].serviceId,
          branchId: appointment[0].branchId,
          createdDate: appointment[0].createdDate,
        };
        await appointmentApi.Update(
          formData.appointmentId,
          appointmentToUpdate
        );
        const branch = await authService.getUserData();

        const appointments = await appointmentApi.getAppointments({
          branchId: branch.branchId,
        });
        setAppointments(appointments);

        handleClose();
        swalService.showMessage(
          "Success",
          "Appointment Added Successfully",
          "success"
        );
      } catch (error) {
        handleError.showError(error);
      } finally {
        setIsLoading(false);
      }
    });
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
        branchId: yup.string().required("Branch is required"),
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
          doctorId: null,
          serviceId: formDataAdd.serviceId,
          branchId: formDataAdd.branchId,
          dateTime: formDataAdd.dateTime,
          status: "Pending",
          createdDate: new Date(),
          noted: formDataAdd.noted,
        };
        console.log(AppointmentData);
        await appointmentApi.AddNew(AppointmentData);
        const branch = await authService.getUserData();

        const appointments = await appointmentApi.getAppointments({
          branchId: branch.branchId,
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

        const branch = await authService.getUserData();

        const appointments = await appointmentApi.getAppointments({
          branchId: branch.branchId,
        });
        setAppointments(appointments);
        handleClose();
        swalService.showMessage(
          "Success",
          "Appointment Cancelled Successfully",
          "success"
        );
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const service = await serviceApi.getAll();
        setServices(service);
        const branch = await branchApi.getAll();
        setBranches(branch);

        const getbranch = await authService.getUserData();

        const appointments = await appointmentApi.getAppointments({
          branchId: getbranch.branchId,
        });
        setAppointments(appointments);

        const doctors = await userApi.getDoctorByBranch({
          branchId: getbranch.branch.branchId,
          roleId: "6426DA65-82BB-4BB0-B3BC-B0B85B285BFA",
        });
        setDoctors(doctors);

        const fetchUserData = async () => {
          const user = await authService.getUserData();
          setUserData(user);
        };

        fetchUserData();
      } catch (error) {
        handleError.showError(error);
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
              Add An Appointment
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
              <label>Select Branch</label>
              <select
                name="branchId"
                className={`form-control ${error.branchId ? "is-invalid" : ""}`}
                aria-label="Default select example"
                onChange={handleChangeAdd}
              >
                <option value="">-- Please choose branch --</option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch.branchId}>
                    {branch.name}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{error.branchId}</div>
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
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Asign Doctor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label>Asign Doctor</label>
              <select
                name="doctorId"
                className={`form-control ${error.doctorId ? "is-invalid" : ""}`}
                aria-label="Default select example"
                onChange={handleChange}
              >
                <option value="">-- Please choose doctor --</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor.userId}>
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{error.doctorId}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => handleCanelled(formData.appointmentId)}
            >
              Cancelled
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
          </Modal.Footer>
        </form>
      </Modal>

      <h3 className="text-center">
        Appointment Management in {userData.branch ? userData.branch.name : ""}
      </h3>

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
            <option value="Pending">Pending</option>
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
                  {filteredAppointments.length === 0 && (
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
                  )}
                  {filteredAppointments.map((appointment, index) => (
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
                        {formatDateTime.toDateTimeString(appointment.dateTime)}
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
                            <Button className="btn btn-warning">
                              <i className="bi bi-eye"></i>
                            </Button>
                          ) : null}
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
    </ManagerLayout>
  );
};

export default AppointmentManagementPage;
