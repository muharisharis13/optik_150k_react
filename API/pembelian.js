import { Axios, QueryStringFunction } from "../src/utils";

class PembelianAPI {
  getListPembelian({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/beli?${newQuery}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  addPembelian({ body }) {
    return Axios.post("/beli", body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailPembelian(uuid) {
    return Axios.get(`/beli/${uuid}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
  deletePembelian(uuid) {
    return Axios.delete(`/beli/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  updatePembelian({ uuid, body }) {
    return Axios.put(`/beli/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export default new PembelianAPI();
