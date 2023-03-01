import { Axios, QueryStringFunction } from "../src/utils";

class AdminAPI {
  login({ body }) {
    return Axios.post("/admin/login", body)
      .then((res) => res.data)
      .catch((err) => console.log({ err }));
  }

  getListAdmin({ query }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/admin?${newQuery}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  register({ body }) {
    return Axios.post(`/admin/register`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  deleteAdmin({ uuid }) {
    return Axios.delete(`/admin/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  updateAdmin({ uuid, body }) {
    return Axios.put(`/admin/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetail(uuid) {
    return Axios.get(`/admin/${uuid}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
}

export default new AdminAPI();
