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
import serviceApi from "../../api/service";
import NoData from "/gif/no_data.gif";
import handleError from "../../services/HandleErrors";

const ServiceManagementPage = () => {
  const row = ["#", "Name", "Description"];
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [show, setShow] = useState(false);
  const [modelTitle, setModelTitle] = useState("Add new Service");

  const [formData, setFormData] = useState({
    serviceId: "",
    serviceName: "",
    serviceDescription: "",
  });

  const [error, setError] = useState({});

  const handleShow = () => {
    setShow(true);
    setModelTitle("Add new Service");
  };

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      serviceId: "",
      serviceName: "",
      serviceDescription: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serviceApi.getAll();
        setServices(response);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  const showEdit = (id) => {
    const service = services.find((service) => {
      return service.serviceId === id;
    });

    setFormData((previousState) => {
      return {
        ...previousState,
        serviceId: service.serviceId,
        serviceName: service.serviceName,
        serviceDescription: service.serviceDescription,
      };
    });

    setShow(true);
    setModelTitle("View/Edit Service");
  };

  // Remove
  const handleRemove = (id) => {
    swalService.confirmDelete(async () => {
      try {
        await serviceApi.Remove(id);
        setServices((previousState) => {
          return previousState.filter((service) => service.serviceId !== id);
        });
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const schema = yup.object().shape({
    serviceName: yup.string().required("Service name is required"),
    serviceDescription: yup.string().required("Description is required"),
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
      if (formData.serviceId) {
        try {
          const response = await serviceApi.Update(formData);
          setServices((previousState) => {
            return previousState.map((service) => {
              if (service.serviceId === formData.serviceId) {
                return response;
              }
              return service;
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
          const response = await serviceApi.AddNew(formData);
          setServices((previousState) => {
            return [response, ...previousState];
          });
          handleClose();
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
              <label htmlFor="serviceName">Service Name</label>
              <input
                type="text"
                className={`form-control ${
                  error.serviceName ? "is-invalid" : ""
                }`}
                id="serviceName"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.serviceName}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="serviceDescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.serviceDescription ? "is-invalid" : ""
                }`}
                id="serviceDescription"
                name="serviceDescription"
                value={formData.serviceDescription}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.serviceDescription}</div>
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

      <h3 className="text-center">Service Management</h3>
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
                  {services.length === 0 && (
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
                  {services.map((service, index) => (
                    <tr key={index}>
                      <td className="col">{index + 1}</td>
                      <td className="col-3">{service.serviceName}</td>
                      <td className="col-4">{service.serviceDescription}</td>
                      <td className="fit-content">
                        <div className="d-flex justify-content-center align-items-center">
                          <Button
                            className="btn btn-success me-3"
                            onClick={() => showEdit(service.serviceId)}
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </Button>
                          <Button
                            className="btn btn-danger"
                            onClick={() => handleRemove(service.serviceId)}
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

export default ServiceManagementPage;
