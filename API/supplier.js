import { Axios, QueryStringFunction } from "../src/utils";

class SupplierAPI {
  getListSupplier({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/supplier?${newQuery}`)
      .then((res) => res.data?.data)
      .catch((err) => err);
  }

  addSupplier({ body }) {
    return Axios.post("/supplier", body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailSupplier(uui) {
    return Axios.get(`/supplier/${uui}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  updateSupplier({ uuid, body }) {
    return Axios.put(`/supplier/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  deleteSupplier(uuid) {
    return Axios.delete(`/supplier/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export default new SupplierAPI();
