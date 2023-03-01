import { Axios, QueryStringFunction } from "../src/utils";

class CabangAPI {
  addCabang({ body }) {
    return Axios.post(`/cabang`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
  getListCabang({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/cabang?${newQuery}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  updateCabang({ body, uuid }) {
    return Axios.put(`/cabang/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
  deleteCabang({ uuid }) {
    return Axios.delete(`/cabang/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailCabang({ uuid }) {
    return Axios.get(`/cabang/${uuid}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
}

export default new CabangAPI();
