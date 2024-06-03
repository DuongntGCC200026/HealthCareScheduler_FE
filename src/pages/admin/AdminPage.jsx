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
import AdminLayout from "../../components/layouts/Admin/Admin";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import userApi from "../../api/user";
import appointmentApi from "../../api/appointment";
import branchApi from "../../api/branch";

const AdminPage = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: [],
      },
    },
  });

  const [pieChartData, setPieChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      labels: [],
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await userApi.getDoctorByBranch({
        roleId: "6426DA65-82BB-4BB0-B3BC-B0B85B285BFA",
      }); // Assuming getDoctorByBranch fetches the list of doctors by branch
      const branchData = {};
      console.log(response);
      // Count the number of doctors in each branch
      response.forEach((doctor) => {
        const branch = doctor.branch.name;
        if (branch in branchData) {
          branchData[branch]++;
        } else {
          branchData[branch] = 1;
        }
      });

      // Extract branch names and doctor counts
      const categories = Object.keys(branchData);
      const data = Object.values(branchData);
      const appointments = await appointmentApi.getAppointments({
        status: "Completed",
      }); // Assuming getAppointments fetches the list of appointments

      const chartData = {
        series: [
          {
            name: "Doctor",
            data,
          },
        ],
        options: {
          chart: {
            type: "bar",
          },
          xaxis: {
            categories,
          },
        },
      };

      const numSuccessfulAppointments = await appointmentApi.getAppointments({
        status: "Completed",
      });
      const numCancelledAppointments = await appointmentApi.getAppointments({
        status: "Cancelled",
      });

      const chartDataPie = {
        series: [
          numSuccessfulAppointments.length,
          numCancelledAppointments.length,
        ],
        options: {
          chart: {
            type: "pie",
          },
          labels: ["Successful", "Cancelled"],
        },
      };

      setPieChartData(chartDataPie);
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <AdminLayout>
      <Container>
        <Row>
          <Col>
            <h3 className="text-center">Dashboard</h3>
            <div>
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={400}
              />
              <p className="text-center">
                Chart 1. Number of doctors in each branch
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <div>
              <Chart
                options={pieChartData.options}
                series={pieChartData.series}
                type="pie"
                height={400}
              />
              <p className="text-center mt-3">
                Chart 2. Number of successful and cancelled appointments
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AdminPage;
