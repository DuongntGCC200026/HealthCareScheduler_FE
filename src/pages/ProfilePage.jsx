// src/pages/AboutPage.jsx

import FullLayout from "../components/layouts/User/Full";
import { Container, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import userApi from "../api/user";
import handleError from "../services/HandleErrors";
import authService from "../services/AuthService";
import formatDateTime from "../services/FormatDateTime";
import storageService from "../services/StorageService";
import swalService from "../services/SwalService";
import * as yup from "yup";

function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [errorChangePassword, setErrorChangePassword] = useState({});

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      address: "",
      currentPassword: "",
      newPassword: "",
      reNewPassword: "",
    });
  };

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    reNewPassword: "",
  });

  const [error, setError] = useState({});

  const modifiedSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    dateOfBirth: yup.string().required("Date of Birth is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    address: yup.string().required("Address is required"),
  });

  // Handle change update profile
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form update profile
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await modifiedSchema.validate(formData, { abortEarly: false });

      try {
        const userId = authService.getUserData().userId;
        const userUpdate = {
          userId: userId,
          email: user.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          roleId: user.role.roleId,
        };
        console.log(userUpdate);

        const response = await userApi.updateUser(userId, userUpdate);

        storageService.save("USER_DATA", response);
        swalService.showMessage(
          "Success",
          "Profile updated successfully",
          "success"
        );
      } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error);
        handleError.showError(error);
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

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      // Dynamically create the password validation schema
      const passwordSchema = yup.object().shape({
        currentPassword: yup
          .string()
          .min(8, "Password must be at least 8 characters")
          .required("Current password is required"),
        newPassword: yup
          .string()
          .min(8, "Password must be at least 8 characters")
          .required("New password is required"),
        reNewPassword: yup
          .string()
          .required("Confirm Password is required")
          .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
      });

      // Validate formData against the schema
      await passwordSchema.validate(formData, { abortEarly: false });

      const user = authService.getUserData();
      const userUpdate = {
        userId: user.userId,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };
      console.log(userUpdate);

      await userApi.changePassword(user.userId, userUpdate);
      setShow(false);
      setError({});
      setFormData({
        currentPassword: "",
        newPassword: "",
        reNewPassword: "",
      });
      swalService.showMessage(
        "Success",
        "Profile change password successfully",
        "success"
      );
    } catch (error) {
      if (error.name === "ValidationError") {
        const newError = {};
        error.inner.forEach((e) => {
          newError[e.path] = e.message;
        });
        setError(newError);
      } else {
        console.log("🚀 ~ handleSubmit ~ error:", error);
        handleError.showError(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authService.getUserData();
        const userData = await userApi.getUserById(user.userId);
        setUser(userData);
        setFormData({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          dateOfBirth: formatDateTime.toBirthdayString(userData.dateOfBirth),
          phoneNumber: userData.phoneNumber,
          address: userData.address,
        });
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <FullLayout>
      <Container>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <form onSubmit={handleChangePassword}>
            <Modal.Header closeButton>
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label>Current Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    error.currentPassword ? "is-invalid" : ""
                  }`}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{error.currentPassword}</div>
              </div>

              <div className="mb-3">
                <label>New Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    error.newPassword ? "is-invalid" : ""
                  }`}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{error.newPassword}</div>
              </div>

              <div className="mb-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    error.reNewPassword ? "is-invalid" : ""
                  }`}
                  name="reNewPassword"
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{error.reNewPassword}</div>
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
                  "Confirm"
                )}
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        <section className="section profile d-flex justify-content-center alignItems-center">
          <div className="card" style={{ width: "65%", height: "auto" }}>
            <div className="card-body pt-3">
              <div className="tab-content pt-2">
                <div
                  className="tab-pane fade show active profile-overview"
                  id="profile-overview"
                >
                  <h3 className="text-center mb-3">Edit Profile</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label
                        htmlFor="email"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          readOnly
                        />
                        <div className="invalid-feedback"></div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="firstName"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        First Name
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="firstName"
                          type="text"
                          className="form-control"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          {error.firstName}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="lastName"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Last Name
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="lastName"
                          type="text"
                          className="form-control"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          {error.lastName ? error.lastName : ""}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="dateOfBirth"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Day of Birth
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="dateOfBirth"
                          type="date"
                          className="form-control"
                          id="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          {error.dateOfBirth ? error.dateOfBirth : ""}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="phoneNumber"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Phone Number
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="phoneNumber"
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          {error.phoneNumber ? error.phoneNumber : ""}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="address"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Address
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="address"
                          type="text"
                          className="form-control"
                          id="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                        <div className="invalid-feedback">
                          {error.address ? error.address : ""}
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                        <Button
                          className="mb-3 mb-md-0 me-md-3 border border-primary"
                          onClick={handleShow}
                        >
                          Change Password
                        </Button>
                        <Button
                          type="submit"
                          className="text-white"
                          variant="info"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </FullLayout>
  );
}

export default ProfilePage;
