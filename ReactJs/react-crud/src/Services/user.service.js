import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/client");
  }

  get(id) {
    return http.get(`/client/${id}`);
  }

  create(data) {
    return http.post("/client", data);
  }

  update(id, data) {
    return http.put(`/client/${id}`, data);
  }

  delete(id) {
    return http.delete(`/client/${id}`);
  }

  deleteAll() {
    return http.delete(`/client`);
  }

}

export default new UserDataService();