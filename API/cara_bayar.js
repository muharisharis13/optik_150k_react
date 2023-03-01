import { Axios, QueryStringFunction } from "../src/utils";

class CaraBayarAPI {
  getListCaraBayar({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/cara-bayar?${newQuery}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  addCaraBayar({ body }) {
    return Axios.post("/cara-bayar", body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailCaraBayar(uuid) {
    return Axios.get(`/cara-bayar/${uuid}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
  deleteCaraBayar(uuid) {
    return Axios.delete(`/cara-bayar/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  updateCaraBayar({ uuid, body }) {
    return Axios.put(`/cara-bayar/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export default new CaraBayarAPI();
