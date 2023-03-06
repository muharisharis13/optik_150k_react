import DashboardHome from "./home";
import { HelmetDashboard } from "@utils";
import NotFound from "../notFound";
import { MenuDashboard, HeaderDashboard } from "@components/dashboard";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@components";
import { useFormContext, useWatch } from "react-hook-form";
import { Toast } from "../../../components";
import {
  PenjualanPageDashboard,
  HistoryPenjualanPageDashboard,
  PenjualanCabangPageDashboard,
  HistoryPenjualanCabangPage,
} from "./data_penjualan";
import { PengeluaranDashboardPage } from "./data_pengeluaran";
import { KwintansiPage } from "./data_kwintansi";
import {
  SupplierPage,
  PembelianPage,
  HistoryPembelian,
} from "./data_pembelian";
import CabangPage from "./cabang";
import CustomerPage from "./customer";
import UserPage from "./user";
import { CategoryPage, BarangRusakPage, ProductPage } from "./data_barang";
import CaraBayarPage from "./cara_bayar";
import LaporangPage from "./laporan";
import {
  ModalProducts,
  ModalCategory,
  ModalCabang,
  ModalCustomer,
  ModalUser,
  ModalBarangRusak,
  ModalCaraBayar,
  TransaksiByDayModal,
  TotalPenjualanModal,
  InputUangKasirModal,
  ModalUploadCsv,
} from "../../../common_component/modal";
import {
  ModalSelectCategory,
  ModalPenjualanKasir,
  ModalPembelian,
  ModalKwitansi,
  ModalResumeKeuangan,
} from "../../../common_component/modal/laporan";
import { CreateSupplierModal } from "../../../common_component/modal/supplier";
import { TransaksiByDay } from "../../../common_component/offcanvas/index";

const Dashboard = () => {
  const { getValues } = useFormContext();
  const toast = useWatch({ name: "toast" });
  const toast_data = useWatch({ name: "toast_data" });
  const loading = getValues("loading");

  $("body").on("keydown", function (e) {
    console.log({ e });
    if (e?.which === 113) {
      console.log("berhasil");
      $("#TransaksiByDayModal").modal("show");
    } else if (e?.which === 115) {
      $("#InputUangKasirModal").modal("show");
    }
  });
  return (
    <div className="layout-wrapper layout-content-navbar">
      <HelmetDashboard />
      <Loading show={loading} />
      <Toast
        show={toast}
        title={toast_data["title"]}
        type={toast_data["type"]}
        content={toast_data["content"]}
      />
      <div className="layout-container">
        <MenuDashboard />
        <div className="layout-page">
          <HeaderDashboard />

          <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route index path="/" element={<DashboardHome />} />
            {/* <Route path="/account" element={<AccountDashboard />} /> */}

            <Route path="/dataPenjualan">
              <Route path="penjualan" element={<PenjualanPageDashboard />} />
              <Route
                path="penjualan/cabang"
                element={<PenjualanCabangPageDashboard />}
              />
              <Route
                path="history"
                element={<HistoryPenjualanPageDashboard />}
              />
              <Route
                path="history_cabang"
                element={<HistoryPenjualanCabangPage />}
              />
            </Route>
            <Route path="/dataPengeluaran">
              <Route path="" element={<PengeluaranDashboardPage />} />
            </Route>
            <Route path="/dataKwintansi">
              <Route path="" element={<KwintansiPage />} />
            </Route>
            <Route path="/dataPembelian">
              <Route path="supplier" element={<SupplierPage />} />
              <Route path="pembelian" element={<PembelianPage />} />
              <Route path="history" element={<HistoryPembelian />} />
            </Route>
            <Route path="cabang" element={<CabangPage />} />
            <Route path="customer" element={<CustomerPage />} />
            <Route path="user" element={<UserPage />} />

            <Route path="caraBayar" element={<CaraBayarPage />} />
            <Route path="report" element={<LaporangPage />} />

            <Route path="/dataBarang">
              <Route path="category" element={<CategoryPage />} />
              <Route path="barangRusak" element={<BarangRusakPage />} />
              <Route path="product" element={<ProductPage />} />
            </Route>
          </Routes>
        </div>
      </div>

      {/* MODALS =========== */}
      <ModalProducts />
      <ModalCategory />
      <CreateSupplierModal />
      <ModalCabang />
      <ModalCustomer />
      <ModalUser />
      <ModalBarangRusak />
      <ModalCaraBayar />
      <TransaksiByDayModal />
      <TransaksiByDay />
      <TotalPenjualanModal />
      <InputUangKasirModal />

      <ModalSelectCategory />
      <ModalPenjualanKasir />
      <ModalPembelian />
      <ModalKwitansi />
      <ModalResumeKeuangan />
      <ModalUploadCsv />
    </div>
  );
};

export default Dashboard;
