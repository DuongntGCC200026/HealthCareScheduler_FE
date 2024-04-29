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
import ManagerLayout from "../components/layouts/Admin/Manager";
  
  const DoctorPage = () => {
    return (
      <ManagerLayout>
        <h3 className="text-center">Doctor Management</h3>
        <div className="d-flex justify-content-end">
          <Button className="btn btn-info mb-3">
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
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start date</th>
                      <th>Salary</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Doris Wilder</td>
                      <td>Sales Assistant</td>
                      <td>Sidney</td>
                      <td>23</td>
                      <td>2010/09/20</td>
                      <td>$85,600</td>
                      <td className="d-flex justify-content-center">
                        <Button className="btn btn-success me-3">
                          <i class="bi bi-pencil-fill"></i>
                        </Button>
                        <Button className="btn btn-danger">
                          <i class="bi bi-trash2-fill"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Angelica Ramos</td>
                      <td>Chief Executive Officer (CEO)</td>
                      <td>London</td>
                      <td>47</td>
                      <td>2009/10/09</td>
                      <td>$1,200,000</td>
                    </tr>
                    <tr>
                      <td>Gavin Joyce</td>
                      <td>Developer</td>
                      <td>Edinburgh</td>
                      <td>42</td>
                      <td>2010/12/22</td>
                      <td>$92,575</td>
                    </tr>
                    <tr>
                      <td>Jennifer Chang</td>
                      <td>Regional Director</td>
                      <td>Singapore</td>
                      <td>28</td>
                      <td>2010/11/14</td>
                      <td>$357,650</td>
                    </tr>
                    <tr>
                      <td>Brenden Wagner</td>
                      <td>Software Engineer</td>
                      <td>San Francisco</td>
                      <td>28</td>
                      <td>2011/06/07</td>
                      <td>$206,850</td>
                    </tr>
                    <tr>
                      <td>Fiona Green</td>
                      <td>Chief Operating Officer (COO)</td>
                      <td>San Francisco</td>
                      <td>48</td>
                      <td>2010/03/11</td>
                      <td>$850,000</td>
                    </tr>
                    <tr>
                      <td>Shou Itou</td>
                      <td>Regional Marketing</td>
                      <td>Tokyo</td>
                      <td>20</td>
                      <td>2011/08/14</td>
                      <td>$163,000</td>
                    </tr>
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
  