import Select from "react-select/creatable";
import { useWatch, useForm, useFormContext } from "react-hook-form";
import $ from "jquery";
import { useQuery } from "react-query";
import { supplierAPI } from "../../API";

const SelectedSupplier = ({ autoFocus = false }) => {
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
        supplier_name: "",
      },
      loadingLocal: false,
    },
  });
  const { setValue: setValueContext } = useFormContext();

  const dataCategory = useWatch({
    control,
    name: "data",
  });

  const selectedSupplier = useWatch({
    name: "selected.supplier",
  });

  const handleOnchangeSelected = (e) => {
    const isNew = e?.__isNew__;

    console.log({ isNew });
    if (isNew) {
      $("#CreateSupplierModal").modal("show");
    } else {
      setValueContext("selected.supplier", e);
    }
  };

  const hanledOnInputchange = (e) => {
    setValue("param.supplier_name", e);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getListSupplierSelect"],
    queryFn: () =>
      supplierAPI.getListSupplier({
        query: {
          size: 10,
        },
      }),
  });

  return (
    <div>
      <Select
        isLoading={isLoading}
        isClearable
        placeholder="Select Supplier"
        value={selectedSupplier}
        onChange={handleOnchangeSelected}
        options={data?.result?.map((item) => ({
          value: item?.id,
          label: item?.supplier_name,
        }))}
        onInputChange={hanledOnInputchange}
      />
    </div>
  );
};

export default SelectedSupplier;
