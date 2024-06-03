import axiosClient from "./axiosClient";

class Service {
    getAll = () => {
        const url = "/api/service";
        return axiosClient.get(url);
    }
    AddNew = (service) => {
        const url = "/api/service";
        return axiosClient.post(url,service);
    }
    Update = (service) => {
        const url = `/api/service/${service.serviceId}`;
        return axiosClient.put(url,service);
    }
    Remove = (id) => {
        const url = `/api/service/${id}`;
        return axiosClient.delete(url);
    }
}

const serviceApi = new Service();
export default serviceApi;