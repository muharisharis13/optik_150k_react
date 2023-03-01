import { Axios, QueryStringFunction } from "../src/utils";

class ProductAPI {
  getListProduct({ query = {} }) {
    const newQuery = QueryStringFunction(query);
    return Axios.get(`/product?${newQuery}`)
      .then((res) => res.data?.data)
      .catch((err) => err);
  }
  getListFreeProduct() {
    return Axios.get(`/product/free`)
      .then((res) => res.data?.data)
      .catch((err) => err);
  }

  addProduct({ body }) {
    return Axios.post("/product", body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  getDetailProduct(uui) {
    return Axios.get(`/product/${uui}`)
      .then((res) => res?.data?.data)
      .catch((err) => err);
  }

  updateProduct({ uuid, body }) {
    return Axios.put(`/product/${uuid}`, body)
      .then((res) => res?.data)
      .catch((err) => err);
  }

  deleteProduct(uuid) {
    return Axios.delete(`/product/${uuid}`)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export default new ProductAPI();
