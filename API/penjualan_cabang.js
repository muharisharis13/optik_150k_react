import { Axios, QueryStringFunction } from "../src/utils";

class PenjualanCabangAPI {
  getListPenjualanCabang({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/transaksi-cabang?${newQuery}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  addPenjualanCabang({ body }) {
    return Axios.post("/transaksi-cabang", body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailPenjualanCabang(uuid) {
    return Axios.get(`/transaksi-cabang/${uuid}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
  deletePenjualanCabang(uuid) {
    return Axios.delete(`/transaksi-cabang/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  updatePenjualanCabang({ uuid, body }) {
    return Axios.put(`/transaksi-cabang/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  pelunasanPenjualanCabang({ uuid, body }) {
    return Axios.post(`/transaksi-cabang/pelunasan/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
  cancelPenjualanCabang({ uuid, body = {} }) {
    return Axios.post(`/transaksi-cabang/cancel/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export default new PenjualanCabangAPI();
