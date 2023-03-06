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

  uploadProductList(body) {
    return Axios.post(`/product/upload/csv`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res?.data)
      .catch((err) => err);
  }
  downloadProductList() {
    return Axios.get(`/product/export/csv`)
      .then((res) => res?.data)
      .catch((err) => err);
  }
}

export default new ProductAPI();
