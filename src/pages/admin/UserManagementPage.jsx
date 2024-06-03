import {
  Image,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Spinner,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import * as yup from "yup";
import swalService from "../../services/SwalService";
import AdminLayout from "../../components/layouts/Admin/Admin";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import userApi from "../../api/user";
import branchApi from "../../api/branch";
import NoData from "/gif/no_data.gif";
import handleError from "../../services/HandleErrors";
import formatDateTime from "../../services/FormatDateTime";

const UserManagementPage = () => {
  const row = [
    "#",
    "Email",
    "Full Name",
    "Role",
    "Specialization",
    "Address",
    "Branch",
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [search, setSearch] = useState([]);
  const [roles, setRoles] = useState([]);
  const [show, setShow] = useState(false);
  const [modelTitle, setModelTitle] = useState("Add new User");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
    setModelTitle("Add new User");
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
    const fetchData = async () => {
      try {
        const response = await userApi.getAll();
        setUsers(response);
        const branches = await branchApi.getAll();
        setBranches(branches);
        const roles = await userApi.getAllRoles();
        setRoles(roles);
      } catch (error) {
        handleError.showError(error);
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

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchValue(value);

    // Filter users based on email
    const filteredUsers = users.filter((user) =>
      user.email.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  //Form
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
        roleId: yup.string().required("Role is required"),
        branchId: yup.string().required("Branch is required"),
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
          formDataSubmit.append("roleId", formData.roleId);

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
          swalService.showMessage(
            "Success",
            "User update successfully",
            "success"
          );
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
          formDataSubmit.append("branchId", formData.branchId);
          formDataSubmit.append("roleId", formData.roleId);

          console.log(formData);

          const response = await userApi.create(formDataSubmit);
          setUsers((previousState) => {
            return [response, ...previousState];
          });
          handleClose();
          swalService.showMessage(
            "Success",
            "User added successfully",
            "success"
          );
        } catch (error) {
          handleError.showError(error);
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      const newError = {};
      error.inner.forEach((e) => {
        newError[e.path] = e.message;
      });
      setError(newError);
    }
  };

  const isSpecialRole = (roleId) => {
    return roleId === "6426DA65-82BB-4BB0-B3BC-B0B85B285BFA".toLowerCase();
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
              <label>Select Role</label>
              <select
                className={`form-select ${error.roleId ? "is-invalid" : ""}`}
                aria-label="Default select example"
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
              >
                <option value="">-- Please choose role --</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.roleId}>
                    {role.name}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{error.roleId}</div>
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
                readOnly={!isSpecialRole(formData.roleId)}
              />
              <div className="invalid-feedback">{error.specialization}</div>
            </div>

            <div className="mb-3">
              <label>Select Branch</label>
              <select
                name="branchId"
                className={`form-control ${error.branchId ? "is-invalid" : ""}`}
                aria-label="Default select example"
                value={formData.branchId}
                onChange={handleChange}
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

      <h3 className="text-center">User Management</h3>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: "300px" }} // Adjust the width as needed
            placeholder="Search by email..."
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <div>
          <Button className="btn btn-info text-white" onClick={handleShow}>
            Add
            <i className="bi bi-plus-circle ms-2"></i>
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="card rounded shadow border-0">
          <div className="card-body bg-white rounded">
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
                  {searchResults.length === 0
                    ? users.map((user, index) => (
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
                          <td>{user.branch ? user.branch.name : "--"}</td>
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
                      ))
                    : searchResults.map((user, index) => (
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
                          <td>{user.branch ? user.branch.name : "--"}</td>
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
    </AdminLayout>
  );
};

export default UserManagementPage;
