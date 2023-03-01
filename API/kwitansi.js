import { Axios, QueryStringFunction } from "../src/utils";

class KwitansiAPI {
  getListKwitansi({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/kwitansi?${newQuery}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  addKwitansi({ body }) {
    return Axios.post("/kwitansi", body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailKwitansi(uuid) {
    return Axios.get(`/kwitansi/${uuid}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
  deleteKwitansi(uuid) {
    return Axios.delete(`/kwitansi/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  updateKwitansi({ uuid, body }) {
    return Axios.put(`/kwitansi/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export default new KwitansiAPI();
