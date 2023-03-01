import { Axios, QueryStringFunction } from "../src/utils";

class CustomerAPI {
  getListCustomer({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/customer?${newQuery}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  addCustomer({ body }) {
    return Axios.post("/customer", body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailCustomer(uuid) {
    return Axios.get(`/customer/${uuid}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
  deleteCustomer(uuid) {
    return Axios.delete(`/customer/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  updateCustomer({ uuid, body }) {
    return Axios.put(`/customer/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export default new CustomerAPI();
