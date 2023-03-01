import { Axios, QueryStringFunction } from "../src/utils";

class PengeluaranAPI {
  getListPengeluaran({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/pengeluaran?${newQuery}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  addPengeluaran({ body }) {
    return Axios.post("/pengeluaran", body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailPengeluaran(uuid) {
    return Axios.get(`/pengeluaran/${uuid}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
  deletePengeluaran(uuid) {
    return Axios.delete(`/pengeluaran/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  updatePengeluaran({ uuid, body }) {
    return Axios.put(`/pengeluaran/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export default new PengeluaranAPI();
