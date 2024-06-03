import axiosClient from "./axiosClient";

class User {
  register = (user) => {
    const url = "/api/auth/register";
    return axiosClient.post(url, user);
  };
  login = (user) => {
    const url = "/api/auth/login";
    return axiosClient.post(url, user);
  };
  getDoctorByBranch = (filter) => {
    const url = "/api/user/manageUser";
    return axiosClient.get(url, { params: filter });
  };
  getAll = () => {
    const url = "/api/user";
    return axiosClient.get(url);
  };
  getUserById = (userId) => {
    const url = `/api/user/${userId}`;
    return axiosClient.get(url, userId);
  };
  updateUser = (userId, data) => {
    const url = `/api/user/${userId}`;
    return axiosClient.put(url, data);
  };
  getAllRoles = () => {
    const url = "/api/user/roles";
    return axiosClient.get(url);
  };
  create(user) {
    const url = "/api/user";
    return axiosClient.post(url, user);
  }
  changePassword(userId, data) {
    const url = `/api/user/${userId}/change-password`;
    return axiosClient.put(url, data);
  }
  update(user) {
    const url = `/api/user/${user.get("userId")}`;
    return axiosClient.put(url, user);
  }

  delete(userId) {
    const url = `/api/user/${userId}`;
    return axiosClient.delete(url);
  }
}

const userApi = new User();
export default userApi;
