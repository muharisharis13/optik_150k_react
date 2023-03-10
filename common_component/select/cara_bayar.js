import Select from "react-select";
import { useForm, useWatch, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { caraBayarAPI } from "../../API";

const SelectedCaraBayar = ({ caraBayar2 = false }) => {
  const location = window.location.pathname;
  const { setValue, control } = useForm({
    defaultValues: {
      param: {
        cara_bayar_name: "",
      },
    },
  });

  const { setValue: setValueContext } = useFormContext();

  const selectedCaraBayar = useWatch({
    name: "selected.cara_bayar",
  });
  const selectedCaraBayar2 = useWatch({
    name: "selected.cara_bayar_2",
  });
  const param = useWatch({
    name: "param",
    control,
  });

  const hanledOnInputchange = (e) => {
    setValue("param.cara_bayar_name", e);
    refetch();
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getListCaraBayarSelect"],
    queryFn: () =>
      caraBayarAPI.getListCaraBayar({
        query: {
          column_name: "cara_bayar_name",
          query: param.cara_bayar_name,
        },
      }),
  });

  const filterCaraBayar = (filter) => {
    if (!caraBayar2 && location.match("cabang")) {
      return filter.cara_bayar_name === "CREDIT";
    } else {
      return filter;
    }
  };

  return (
    <div>
      <Select
        isClearable
        placeholder="Select Cara Bayar"
        value={caraBayar2 ? selectedCaraBayar2 : selectedCaraBayar}
        isLoading={isLoading}
        options={data?.result?.map((item) => ({
          value: item.id,
          label: item.cara_bayar_name,
        }))}
        onChange={(e) =>
          setValueContext(
            caraBayar2 ? "selected.cara_bayar_2" : "selected.cara_bayar",
            e
          )
        }
        onInputChange={hanledOnInputchange}
      />
    </div>
  );
};

export default SelectedCaraBayar;
