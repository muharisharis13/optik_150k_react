import Select from "react-select/creatable";
import { useWatch, useForm, useFormContext } from "react-hook-form";
import $ from "jquery";
import { useQuery } from "react-query";
import { cabangAPI } from "../../API";

const SelectedCabang = ({ autoFocus = false }) => {
  const { setValue, control } = useForm({
    defaultValues: {
      data: [
        {
          label: "indomie",
          value: "1",
        },
        {
          label: "indomie 2",
          value: "2",
        },
      ],
      param: {
        cabang_name: "",
      },
    },
  });
  const { setValue: setValueContext } = useFormContext();

  const param = useWatch({
    name: "param",
    control,
  });
  const selectedCabang = useWatch({
    name: "selected.cabang",
  });

  const handleOnchangeSelected = (e) => {
    const isNew = e?.__isNew__;

    if (isNew) {
      $("#ModalCabang").modal("show");
      // alert("cabang");
    } else {
      setValueContext("selected.cabang", e);
    }
  };

  const hanledOnInputchange = (e) => {
    setValue("param.cabang_name", e);
    refetch();
  };

  const {
    data: dataCabang,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getListCabangSelect"],
    queryFn: () =>
      cabangAPI.getListCabang({
        query: {
          size: 10,
          column_name: "nama_cabang",
          query: param.cabang_name,
        },
      }),
  });

  return (
    <div>
      <Select
        isClearable
        placeholder="Select Cabang"
        value={selectedCabang}
        onChange={handleOnchangeSelected}
        options={dataCabang?.result?.map((item) => ({
          value: item?.id,
          label: item.nama_cabang,
        }))}
        onInputChange={hanledOnInputchange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SelectedCabang;
