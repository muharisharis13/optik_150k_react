import { Axios, QueryStringFunction } from "../src/utils";

class CategoryAPI {
  getListCategory({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/category?${newQuery}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  addCategory({ body }) {
    return Axios.post("/category", body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailCategory(uuid) {
    return Axios.get(`/category/${uuid}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }
  deleteCategory(uuid) {
    return Axios.delete(`/category/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  updateCategory({ uuid, body }) {
    return Axios.put(`/category/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export default new CategoryAPI();
