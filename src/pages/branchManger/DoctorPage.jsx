import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import ManagerLayout from "../../components/layouts/Admin/Manager";
import { useEffect, useState } from "react";
import userApi from "../../api/user";
import branchApi from "../../api/branch";
import handleError from "../../services/HandleErrors";
import authService from "../../services/AuthService";
import formatDateTime from "../../services/FormatDateTime";
import swalService from "../../services/SwalService";

const DoctorPage = () => {
  const row = ["#", "Email", "Full Name", "Role", "Specialization", "Address"];
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [show, setShow] = useState(false);
  const [branches, setBranches] = useState([]);
  const [modelTitle, setModelTitle] = useState("Add new Doctor");
  const [userData, setUserData] = useState({});
  const [selectedBranchId, setSelectedBranchId] = useState("");

  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    specialization: "",
    roleId: "",
    branchId: "",
  });

  const [error, setError] = useState({});
  const handleShow = () => {
    setShow(true);
    setModelTitle("Add new Doctor");
  };

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      userId: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      address: "",
      specialization: "",
      roleId: "",
      branchId: "",
    });
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchesData = await branchApi.getAll();
        setBranches(branchesData);
      } catch (error) {
        console.error("Error fetching branches:", error);
        setError(error);
        handleError.showError(error);
      }
    };

    const fetchUserData = async () => {
      try {
        const user = await authService.getUserData();
        console.log("Fetched user data:", user); // Log user data to debug
        setUserData(user);
        return user;
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
        handleError.showError(error);
      }
    };

    const fetchDoctorsByBranch = async (branchId) => {
      try {
        const doctors = await userApi.getDoctorByBranch({
          branchId: branchId,
          roleId: "6426DA65-82BB-4BB0-B3BC-B0B85B285BFA",
        });
        setUsers(doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError(error);
        handleError.showError(error);
      }
    };

    const fetchData = async () => {
      await fetchBranches();

      const user = await fetchUserData();

      if (user && user.branch && user.branch.branchId) {
        setSelectedBranchId(user.branch.branchId);
        await fetchDoctorsByBranch(user.branch.branchId);
      }
    };

    fetchData();
  }, []);

  const showEdit = (id) => {
    const user = users.find((user) => {
      return user.userId === id;
    });

    setFormData((previousState) => {
      return {
        ...previousState,
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: formatDateTime.toBirthdayString(user.dateOfBirth),
        phoneNumber: user.phoneNumber,
        address: user.address,
        specialization: user.specialization ? user.specialization : null,
        roleId: user.role.roleId,
        branchId: user.branch ? user.branch.branchId : null,
      };
    });

    setShow(true);
    setModelTitle("View/Edit User");
  };

  // Remove
  const handleRemove = (id) => {
    swalService.confirmDelete(async () => {
      try {
        await userApi.delete(id);
        setUsers((previousState) => {
          return previousState.filter((user) => user.userId !== id);
        });
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let modifiedSchema = yup.object().shape({
        email: yup.string().email().required("Email is required"),
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        dateOfBirth: yup.string().required("Date of Birth is required"),
        phoneNumber: yup
          .string()
          .required("Phone Number is required")
          .matches(/^[0-9]{10}$/, "Phone number is not valid"),
        address: yup.string().required("Address is required"),
        specialization: yup.string().required("Address is required"),
      });

      // Add password and confirm password validation if they are not empty
      if (formData.userId === "" || formData.password !== "") {
        modifiedSchema = modifiedSchema.concat(
          yup.object().shape({
            password: yup
              .string()
              .min(8, "Password must be at least 8 characters")
              .required("Password is required"),
            confirmPassword: yup
              .string()
              .required("Confirm Password is required")
              .oneOf([yup.ref("password"), null], "Passwords must match"),
          })
        );
      }

      await modifiedSchema.validate(formData, { abortEarly: false });

      setIsLoading(true);
      if (formData.userId) {
        try {
          const formDataSubmit = new FormData();
          formDataSubmit.append("userId", formData.userId);
          formDataSubmit.append("email", formData.email);
          formDataSubmit.append("password", formData.password);
          formDataSubmit.append("firstName", formData.firstName);
          formDataSubmit.append("lastName", formData.lastName);
          formDataSubmit.append("dateOfBirth", formData.dateOfBirth);
          formDataSubmit.append("phoneNumber", formData.phoneNumber);
          formDataSubmit.append("address", formData.address);
          formDataSubmit.append("specialization", formData.specialization);
          formDataSubmit.append("branchId", formData.branchId);
          formDataSubmit.append(
            "roleId",
            "6426DA65-82BB-4BB0-B3BC-B0B85B285BFA"
          );

          const response = await userApi.update(formDataSubmit);
          setUsers((previousState) => {
            return previousState.map((user) => {
              if (user.userId === formData.userId) {
                return response;
              }
              return user;
            });
          });
          handleClose();
        } catch (error) {
          handleError.showError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const formDataSubmit = new FormData();
          formDataSubmit.append("userId", formData.userId);
          formDataSubmit.append("email", formData.email);
          formDataSubmit.append("password", formData.password);
          formDataSubmit.append("firstName", formData.firstName);
          formDataSubmit.append("lastName", formData.lastName);
          formDataSubmit.append("dateOfBirth", formData.dateOfBirth);
          formDataSubmit.append("phoneNumber", formData.phoneNumber);
          formDataSubmit.append("address", formData.address);
          formDataSubmit.append("specialization", formData.specialization);
          formDataSubmit.append("branchId", userData.branch.branchId);
          formDataSubmit.append(
            "roleId",
            "6426DA65-82BB-4BB0-B3BC-B0B85B285BFA"
          );

          console.log(formData);

          const response = await userApi.create(formDataSubmit);
          setUsers((previousState) => {
            return [response, ...previousState];
          });
          handleClose();
        } catch (error) {
          console.log("🚀 ~ handleSubmit ~ error:", error);
          handleError.showError(error);
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error) {
      const newError = {};
      error.inner.forEach((e) => {
        newError[e.path] = e.message;
      });
      setError(newError);
    }
  };
  return (
    <ManagerLayout>
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
            <Modal.Title>{modelTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className={`form-control ${error.email ? "is-invalid" : ""}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.email}</div>
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className={`form-control ${error.password ? "is-invalid" : ""}`}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.password}</div>
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className={`form-control ${
                  error.confirmPassword ? "is-invalid" : ""
                }`}
                name="confirmPassword"
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.confirmPassword}</div>
            </div>

            <div className="mb-3">
              <label>Specialization (Required for Doctors) * </label>
              <textarea
                className={`form-control ${
                  error.specialization ? "is-invalid" : ""
                }`}
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.specialization}</div>
            </div>

            <div className="mb-3">
              <label>Select Branch</label>
              <select
                name="branchId"
                className={`form-control ${error.branchId ? "is-invalid" : ""}`}
                aria-label="Default select example"
                value={formData.branchId || selectedBranchId}
                onChange={(e) => {
                  setSelectedBranchId(e.target.value);
                  handleChange(e);
                }}
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
              <label>First Name</label>
              <input
                type="text"
                className={`form-control ${
                  error.firstName ? "is-invalid" : ""
                }`}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.firstName}</div>
            </div>

            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className={`form-control ${error.lastName ? "is-invalid" : ""}`}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.lastName}</div>
            </div>

            <div className="mb-3">
              <label>Date of Birth</label>
              <input
                type="date"
                className={`form-control ${
                  error.dateOfBirth ? "is-invalid" : ""
                }`}
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.dateOfBirth}</div>
            </div>

            <div className="mb-3">
              <label>Phone Number</label>
              <input
                type="text"
                className={`form-control ${
                  error.phoneNumber ? "is-invalid" : ""
                }`}
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.phoneNumber}</div>
            </div>

            <div className="mb-3">
              <label>Address</label>
              <textarea
                className={`form-control ${error.address ? "is-invalid" : ""}`}
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.address}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
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

      <h3 className="text-center">Doctor Management</h3>
      <div className="d-flex justify-content-end">
        <Button className="btn btn-info mb-3 text-white" onClick={handleShow}>
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
                  {/* {search.length === 0 && (
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
                  )} */}
                  {search.length > 0
                    ? search.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.email}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          {/* <td>{user.role.name}</td> */}
                          <td>{user.specialization}</td>
                          {/* <td>{user.branch.name}</td> */}
                          <td>
                            <div className="d-flex flex-wrap gap-2">
                              <Button
                                variant="outline-warning"
                                onClick={() => showEdit(user.userId)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleRemove(user.userId)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    : users.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.email}</td>
                          <td>
                            {user.firstName} {user.lastName}
                          </td>
                          <td>{user.role.name}</td>
                          <td>
                            {user.specialization ? user.specialization : "--"}
                          </td>
                          <td>{user.address}</td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center">
                              <Button
                                className="btn btn-success me-3"
                                onClick={() => showEdit(user.userId)}
                              >
                                <i className="bi bi-pencil-fill"></i>
                              </Button>
                              <Button
                                className="btn btn-danger"
                                onClick={() => handleRemove(user.userId)}
                              >
                                <i className="bi bi-trash2-fill"></i>
                              </Button>
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

export default DoctorPage;
