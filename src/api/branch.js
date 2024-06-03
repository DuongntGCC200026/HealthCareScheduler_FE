import axiosClient from "./axiosClient";

class Branch {
    getAll = () => {
        const url = "/api/branch";
        return axiosClient.get(url);
    }
    AddNew = (branch) => {
        const url = "/api/branch";
        return axiosClient.post(url,branch);
    }
    Update = (branch) => {
        const url = `/api/branch/${branch.branchId}`;
        return axiosClient.put(url,branch);
    }
    Remove = (id) => {
        const url = `/api/branch/${id}`;
        return axiosClient.delete(url);
    }
}

const branchApi = new Branch();
export default branchApi;