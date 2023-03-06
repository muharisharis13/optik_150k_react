const intialState = {
  name: null,
  toast: false,
  saldo_kasir: "",
  toast_data: {
    title: "",
    content: "",
    type: "",
  },
  loading: false,
  selected: {
    product: "",
    category: "",
    noHp: "",
    supplier: "",
    cabang: "",
    cara_bayar: "",
    cara_bayar_2: "",
  },
  modals: {
    product: false,
    pengeluaran: false,
  },
  paramReport: {
    penjualanDp: false,
    penjualanCabang: false,
  },
};

export default intialState;
