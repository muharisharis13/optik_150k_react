import Select from "react-select/creatable";
import { useWatch, useForm, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { customerAPI } from "../../API";

const SelectedNoHP = ({ autoFocus = false, useUUID = false }) => {
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
        no_hp: "",
      },
    },
  });
  const { setValue: setValueContext } = useFormContext();

  const param = useWatch({
    name: "param",
    control,
  });

  const SelectedNoHP = useWatch({
    name: "selected.noHp",
  });

  const handleOnchangeSelected = (e) => {
    const isNew = e?.__isNew__;

    if (isNew) {
      $("#ModalCustomer").modal("show");
    } else {
      setValueContext("selected.noHp", e);
    }
  };

  const hanledOnInputchange = (e) => {
    setValue("param.no_hp", e);
    refetch();
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getListNoHpSelect"],
    queryFn: () =>
      customerAPI.getListCustomer({
        query: {
          size: 100,
          column_name: "no_hp",
          query: param?.no_hp,
        },
      }),
  });

  return (
    <div>
      <Select
        isClearable
        placeholder="Select No Hp User"
        value={SelectedNoHP}
        onChange={handleOnchangeSelected}
        options={data?.result?.map((item) => ({
          value: useUUID ? item?.uuid : item?.id,
          label: `${item?.no_hp} (${item.customer_name})`,
        }))}
        onInputChange={hanledOnInputchange}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SelectedNoHP;
