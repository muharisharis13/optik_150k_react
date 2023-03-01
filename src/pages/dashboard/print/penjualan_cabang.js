import styled from "styled-components";
import queryString from "query-string";
import { useQuery } from "react-query";
import penjualan_cabang from "../../../../API/penjualan_cabang";
import { DateFormatMonthNameID } from "@utils";
import { MoneyFormatZero } from "@utils";

const PenjualanPrint = () => {
  const { uuid } = queryString.parse(location.search);

  const { isLoading, data } = useQuery({
    queryFn: () => penjualan_cabang.getDetailPenjualanCabang(uuid),
  });

  return (
    <Container>
      <div className="container-list-view">
        <div className="container-img">
          <img src="/assets/logo/logo.png" alt="/assets/logo/logo.png" />
        </div>
        <div className="text-toko">OPTIK 150K</div>
        <small className="text-address">
          Jl. KARYA DAME, komplek karya quality no. 25 D, SEI AGUL. HP.
          08116597722 BCA 383-138-8879 . BNI 041-743-2789. MANDIRI
          105-00-137-5775-6
        </small>
        <hr />
        <div
          className="container-info"
          style={{ fontSize: "small", textAlign: "start" }}
        >
          <div className="row">
            <div className="col-4">
              <strong>No Faktur</strong>
            </div>
            <div className="col-8">: {data?.dataInfo?.no_faktur}</div>
          </div>
          <div className="row">
            <div className="col-4">
              <strong>Tanggal</strong>
            </div>
            <div className="col-8">
              : {DateFormatMonthNameID(data?.dataInfo?.createdAt)}
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <strong>Nama Cabang</strong>
            </div>
            <div className="col-8">
              : {data?.dataInfo?.cabang?.nama_cabang || "-"}
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <strong>Alamat</strong>
            </div>
            <div className="col-8">:{data?.dataInfo?.cabang?.alamat}</div>
          </div>
        </div>
        <hr />
        <div className="container-table-data">
          <table
            border={0}
            align="center"
            width="100%"
            style={{ tableLayout: "fixed" }}
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Qty</th>
                <th>Ket.</th>
                <th>SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {data?.listProduct?.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td style={{ width: "25px", wordWrap: "break-word" }}>
                    {item?.product?.product_name}
                  </td>
                  <td>{item.qty}</td>
                  <td style={{ width: "25px", wordWrap: "break-word" }}>
                    {item?.notes || "-"}
                  </td>
                  <td>Rp. {MoneyFormatZero(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="container-info-payment mt-5">
          <div className="row">
            <div className="col-5" style={{ textAlign: "start" }}>
              <strong style={{ textAlign: "start" }}>Keterangan</strong>
            </div>
            <div className="col-7" style={{ textAlign: "start" }}>
              : {data?.dataInfo?.notes || "-"}
            </div>
          </div>
          <div className="row">
            <div className="col-5" style={{ textAlign: "start" }}>
              <strong>Total Bayar</strong>
            </div>
            <div className="col-7" style={{ textAlign: "start" }}>
              : Rp. {MoneyFormatZero(data?.dataInfo?.total_transaksi_cabang)}
            </div>
          </div>
          <div className="row">
            <div className="col-5" style={{ textAlign: "start" }}>
              <strong>Tunai 1</strong>
            </div>
            <div className="col-7" style={{ textAlign: "start" }}>
              : Rp. {MoneyFormatZero(data?.dataInfo?.uang1)}
            </div>
          </div>
          <div className="row">
            <div className="col-5" style={{ textAlign: "start" }}>
              <strong>Tunai 2</strong>
            </div>
            <div className="col-7" style={{ textAlign: "start" }}>
              : Rp. {MoneyFormatZero(data?.dataInfo?.uang2)}
            </div>
          </div>
          <div
            className="row mt-5 align-items-start justify-content-start text-start"
            style={{ textAlign: "start" }}
          >
            <div className="col-5 text-start">
              <strong className="text-start">Metode Pembayaran</strong>
            </div>
            <div className="col-7" style={{ textAlign: "start" }}>
              : {data?.dataInfo?.payment_method1},{" "}
              {data?.dataInfo?.payment_method2}
            </div>
          </div>
        </div>

        <div className="text-thanks mt-5">----Terima Kasih----</div>
      </div>
    </Container>
  );
};

export default PenjualanPrint;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: smaller;
  min-height: 100vh;
  padding-bottom: 20px;
  .container-list-view {
    text-align: center;
    max-width: 402px;
    padding: 10px;
    overflow-x: hidden;
    border: thin dashed #d0d0d0;
  }
`;
