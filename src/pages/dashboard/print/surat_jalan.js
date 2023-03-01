import styled from "styled-components";
import queryString from "query-string";
import { useQuery } from "react-query";
import penjualan_cabang from "../../../../API/penjualan_cabang";
import { DateFormatMonthNameID } from "@utils";

const SuratJalanPagePrint = () => {
  const { uuid } = queryString.parse(location.search);

  const { data } = useQuery({
    queryFn: () => penjualan_cabang.getDetailPenjualanCabang(uuid),
  });
  return (
    <Container>
      <div className="container-img">
        <img src="/assets/logo/logo.png" alt="/assets/logo/logo.png" />
      </div>
      <h5 className="text-toko text-center">OPTIK 150K</h5>
      <small className="text-address text-center">
        Jl. KARYA DAME, komplek karya quality no. 25 D, SEI AGUL. HP.
        08116597722 BCA 383-138-8879 . BNI 041-743-2789. MANDIRI
        105-00-137-5775-6
      </small>
      <hr />
      <div className="container-info">
        <div className="left">
          <h2 style={{ fontWeight: "bold" }}>Medan</h2>
          <div className="surat_jalan">
            <strong>Surat Jalan</strong> &nbsp; No {data?.dataInfo?.surat_jalan}
          </div>
          <div className="no_faktur">
            <strong>No. Faktur</strong> &nbsp; {data?.dataInfo?.no_faktur}
          </div>
        </div>
        <div className="right">
          <div className="kota">
            Medan, {DateFormatMonthNameID(data?.dataInfo?.createdAt)}
          </div>
          <div className="kepada">
            Kepada Yth : {data?.dataInfo?.cabang?.nama_cabang}
          </div>
        </div>
      </div>
      <div className="container-kirimkan mt-5">
        <div>
          Kami kirimkan barang-barang tersebut dibawah ini dengan kendaraan
          .......................................................
          No.........................................
        </div>
      </div>
      <div className="container-table mt-5">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Qty</th>
              <th>Nama Barang</th>
            </tr>
          </thead>
          <tbody>
            {data?.listProduct?.map((item, idx) => (
              <tr key={idx}>
                <td>{item.qty}</td>
                <td>{item.product?.product_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container_ttd d-flex">
        <div
          className="left flex-grow-1"
          style={{ flex: 1, textAlign: "center" }}
        >
          Tanda Terima
        </div>
        <div
          className="right flex-grow-1 text-end"
          style={{ flex: 1, textAlign: "center" }}
        >
          Hormat Kami
        </div>
      </div>
    </Container>
  );
};

export default SuratJalanPagePrint;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: medium;
  min-height: 100vh;
  padding-bottom: 20px;
  padding: 0px 150px;
  border: thin dashed #f0f0f0;

  .container-img {
    text-align: center;
  }

  .container-info {
    display: flex;
    .right {
      text-align: end;
    }
    .left,
    .right {
      flex: 1;
    }
  }
`;
