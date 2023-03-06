import { Axios, QueryStringFunction } from "../src/utils";

class SupplierAPI {
  getProductAllCategory() {
    return Axios.get(`/report/product-all-category`)
      .then((res) => res.data?.data)
      .catch((err) => err);
  }
  getProductByCategory({ body = {} }) {
    // const newQuery = QueryStringFunction(query);
    return Axios.post(`/report/product-by-category`, body)
      .then((res) => res.data)
      .catch((err) => err);
  }

  getTransaksiKasir(query) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/report/transaksi?${newQuery}`)
      .then((res) => res.data?.data)
      .catch((err) => err);
  }
  getTransaksiKasirDp(query) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/report/transaksi-dp?${newQuery}`)
      .then((res) => res.data?.data)
      .catch((err) => err);
  }
  getTransaksiKasirCabang(query) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/report/transaksi-cabang?${newQuery}`)
      .then((res) => res.data?.data)
      .catch((err) => err);
  }
  getTransaksiPembelian(query) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/report/beli?${newQuery}`)
      .then((res) => res.data?.data)
      .catch((err) => err);
  }
  getKwitansi(query) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/report/kwitansi?${newQuery}`)
      .then((res) => res.data?.data)
      .catch((err) => err);
  }
  getPengeluaran(query) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/report/pengeluaran?${newQuery}`)
      .then((res) => res.data?.data)
      .catch((err) => err);
  }
  getResumeKeuangan(query) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/report/resume-keuangan?${newQuery}`)
      .then((res) => res.data?.data)
      .catch((err) => err);
  }
}

export default new SupplierAPI();
