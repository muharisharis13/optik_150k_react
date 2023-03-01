import { Axios, QueryStringFunction } from "../src/utils";

class BarangRusakAPI {
  addBarangRusak({ body }) {
    return Axios.post(`/broken-product`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
  getListBarangRusak({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/broken-product?${newQuery}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  updateBarangRusak({ body, uuid }) {
    return Axios.put(`/broken-product/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
  deleteBarangRusak({ uuid }) {
    return Axios.delete(`/broken-product/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailBarangRusak({ uuid }) {
    return Axios.get(`/broken-product/${uuid}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
}

export default new BarangRusakAPI();
