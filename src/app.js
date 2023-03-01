import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@pages/dashboard";
import NotFoundPage from "@pages/notFound";
import { Login } from "@pages/auth";
import { HelmetProvider } from "react-helmet-async";
import ReactHookFormProvider from "./useFormContext/index";
import ReactQueryProvider from "./reactQuery";
import PenjualanPrint from "@pages/dashboard/print/penjualan";
import PenjualanCabangPrint from "@pages/dashboard/print/penjualan_cabang";
import SuratJalanPagePrint from "@pages/dashboard/print/surat_jalan";
import BarangByCategory from "./pages/dashboard/laporan/barang_by_category";
import BarangAllCategory from "./pages/dashboard/laporan/barang_all_category";
import PenjualanKasirPage from "./pages/dashboard/laporan/penjualan_kasir";

const App = () => {
  return (
    <ReactQueryProvider>
      <ReactHookFormProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<NotFoundPage />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/print">
                <Route path="surat_jalan" element={<SuratJalanPagePrint />} />
                <Route path="penjualan" element={<PenjualanPrint />} />
                <Route
                  path="penjualan_cabang"
                  element={<PenjualanCabangPrint />}
                />
              </Route>
              <Route path="/view">
                <Route
                  path="barang-by-category"
                  element={<BarangByCategory />}
                />
                <Route
                  path="barang-all-category"
                  element={<BarangAllCategory />}
                />
                <Route
                  path="penjualan-kasir"
                  element={<PenjualanKasirPage />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </ReactHookFormProvider>
    </ReactQueryProvider>
  );
};

export default App;
