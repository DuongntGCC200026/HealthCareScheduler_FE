import {
  Spinner,
  Image,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import * as yup from "yup";
import swalService from "../../services/SwalService";
import AdminLayout from "../../components/layouts/Admin/Admin";
import { useEffect, useState } from "react";
import branchApi from "../../api/branch";
import NoData from "/gif/no_data.gif";
import handleError from "../../services/HandleErrors";

const BranchManagementPage = () => {
  const row = ["#", "Name", "Phone Number", "Location"];
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [show, setShow] = useState(false);
  const [modelTitle, setModelTitle] = useState("Add new Branch");

  const [formData, setFormData] = useState({
    branchId: "",
    name: "",
    phoneNumber: "",
    location: "",
  });

  const [error, setError] = useState({});

  const handleShow = () => {
    setShow(true);
    setModelTitle("Add new Branch");
  };

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      branchId: "",
      name: "",
      phoneNumber: "",
      location: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await branchApi.getAll();
        setBranches(response);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  const showEdit = (id) => {
    const branch = branches.find((branch) => {
      return branch.branchId === id;
    });

    setFormData((previousState) => {
      return {
        ...previousState,
        branchId: branch.branchId,
        name: branch.name,
        phoneNumber: branch.phoneNumber,
        location: branch.location,
      };
    });

    setShow(true);
    setModelTitle("View/Edit Branch");
  };

  // Remove
  const handleRemove = (id) => {
    swalService.confirmDelete(async () => {
      try {
        await branchApi.Remove(id);
        setBranches((previousState) => {
          return previousState.filter((branch) => branch.branchId !== id);
        });
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const schema = yup.object().shape({
    name: yup.string().required("Branch name is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    location: yup.string().required("Location is required"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });

      setIsLoading(true);
      if (formData.branchId) {
        try {
          const response = await branchApi.Update(formData);
          setBranches((previousState) => {
            return previousState.map((branch) => {
              if (branch.branchId === formData.branchId) {
                return response;
              }
              return branch;
            });
          });
          handleClose();
          swalService.showMessage(
            "Success",
            "Branch update successfully",
            "success"
          );
        } catch (error) {
          handleError.showError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const response = await branchApi.AddNew(formData);
          setBranches((previousState) => {
            return [response, ...previousState];
          });
          handleClose();
          swalService.showMessage(
            "Success",
            "Branch added successfully",
            "success"
          );
        } catch (error) {
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
    <AdminLayout>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{modelTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="name">Branch Name</label>
              <input
                type="text"
                className={`form-control ${error.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.name}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.phoneNumber ? "is-invalid" : ""
                }`}
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.phoneNumber}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className={`form-control ${error.location ? "is-invalid" : ""}`}
                id="location"
                name="location"
                rows={4}
                value={formData.location}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.location}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
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
                "Submit"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <h3 className="text-center">Branch Management</h3>
      <div className="d-flex justify-content-end">
        <Button className="btn btn-info mb-3 text-white" onClick={handleShow}>
          Add
          <i className="bi bi-plus-circle ms-2"></i>
        </Button>
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
                  {branches.length === 0 && (
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
                  {branches.map((branch, index) => (
                    <tr key={index}>
                      <td className="col">{index + 1}</td>
                      <td className="col-3">{branch.name}</td>
                      <td className="col-2">{branch.phoneNumber}</td>
                      <td className="col-4">{branch.location}</td>
                      <td className="col">
                        <div className="d-flex justify-content-center align-items-center">
                          <Button
                            className="btn btn-success me-3"
                            onClick={() => showEdit(branch.branchId)}
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </Button>
                          <Button
                            className="btn btn-danger"
                            onClick={() => handleRemove(branch.branchId)}
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

export default BranchManagementPage;
