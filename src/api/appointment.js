import axiosClient from "./axiosClient";

class Appointment {
  getAppointments = (filter) => {
    const url = "/api/appointment/manageAppointment";
    return axiosClient.get(url, { params: filter });
  };
  getMedicalRecordByAppointmentId = (appointmentId) => {
    const url = `/api/medicalRecord/viewMedicalRecord/${appointmentId}`;
    return axiosClient.get(url, appointmentId);
  };
  AddNew = (appointment) => {
    const url = "/api/appointment";
    return axiosClient.post(url, appointment);
  };
  AddNewMedicalRecord = (medicalRecord) => {
    const url = "/api/medicalRecord";
    return axiosClient.post(url, medicalRecord);
  };
  Update = (appointmentId, appointment) => {
    const url = `/api/appointment/${appointmentId}`;
    return axiosClient.put(url, appointment);
  };
}

const appointmentApi = new Appointment();
export default appointmentApi;
