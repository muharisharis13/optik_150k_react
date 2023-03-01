import Modal from "../../modals";
import { Tables } from "../..";

const ViewDetailPembelian = ({ dataTable = [], data_info = {} }) => {
  return (
    <Modal
      title="Detail Pembelian"
      idModal="ViewDetailPembelian"
      size="lg"
      childrenFooter=""
    >
      <h5>Info Pembelian</h5>
      {Object.entries(data_info).map(([name, value]) => {
        return (
          <div className="row">
            <div className="col-md-3 col-lg-2 form-label">{name}</div>
            <div className="col-md-3 col-lg-8">
              : {value?.supplier_name || value}
            </div>
          </div>
        );
      })}

      <div className="container-list-product mt-5">
        <h5>List Product</h5>
        <Tables
          column={column}
          isSearch={false}
          data={dataTable}
          isPagination={false}
        />
      </div>
    </Modal>
  );
};

export default ViewDetailPembelian;

const column = [
  {
    title: "Product Code",
    key: "product.productCode",
  },
  {
    title: "Product Name",
    key: "product.product_name",
  },
  {
    title: "Harga",
    key: "price",
  },
  {
    title: "Qty",
    key: "qty",
  },
  {
    title: "Subtotal",
    key: "subtotal",
  },
];
