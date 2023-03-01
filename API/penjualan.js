import { Axios, QueryStringFunction } from "../src/utils";

class PenjualanAPI {
  getListPenjualan({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/transaksi?${newQuery}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  addPenjualan({ body }) {
    return Axios.post("/transaksi", body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailPenjualan(uuid) {
    return Axios.get(`/transaksi/${uuid}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
  deletePenjualan(uuid) {
    return Axios.delete(`/transaksi/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  updatePenjualan({ uuid, body }) {
    return Axios.put(`/transaksi/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  pelunasanPenjualan({ uuid, body }) {
    return Axios.post(`/transaksi/pelunasan/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  cancelPenjualan({ uuid, body = {} }) {
    return Axios.post(`/transaksi/cancel/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  penjualanPerHari() {
    return Axios.get(`/transaksi/per-day`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
  resumePenjualanPerhari() {
    return Axios.get(`/transaksi/resume`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
}

export default new PenjualanAPI();
