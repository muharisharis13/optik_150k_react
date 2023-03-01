import Modal from "../modals";
import { DateFormatMonthName } from "../../src/utils";
import Table from "../table";
import { useQuery } from "react-query";
import { PenjualanAPI } from "../../API";

const TransaksiByDayModal = () => {
  const { data } = useQuery({
    queryKey: ["getListPenjualanPerhari"],
    queryFn: () => PenjualanAPI.penjualanPerHari(),
  });

  console.log("per day", data);
  return (
    <Modal
      title={`Penjualan Tanggal ${DateFormatMonthName(new Date())}`}
      size="fullscreen"
      idModal="TransaksiByDayModal"
      childrenFooter={[]}
    >
      <div className="table-responsive text-nowrap">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => (
              <tr key={idx}>
                <td>{item?.product?.product_name}</td>
                <td>{item?.qty}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className=" bg-footer-theme bg-info">
            <tr>
              <th>Total</th>
              <th>
                {data?.reduce((prev, curr) => prev + parseInt(curr.qty), 0)}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </Modal>
  );
};

export default TransaksiByDayModal;

const column = [
  {
    title: "Nama Barang",
    key: "product.product_name",
  },
  {
    title: "Qty",
    key: "qty",
  },
];
