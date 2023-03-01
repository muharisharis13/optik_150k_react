import Select from "react-select/creatable";
import { useWatch, useForm, useFormContext } from "react-hook-form";
import $ from "jquery";
import { useQuery } from "react-query";
import { categoryAPI } from "../../API";

const SelectedCategory = ({ autoFocus = false }) => {
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
        category_name: "",
      },
      loadingLocal: false,
    },
  });
  const { setValue: setValueContext } = useFormContext();

  const selectedCategory = useWatch({
    name: "selected.category",
  });
  const param = useWatch({
    name: "param",
    control,
  });

  const handleOnchangeSelected = (e) => {
    const isNew = e?.__isNew__;

    console.log({ isNew });
    if (isNew) {
      $("#ModalCategory").modal("show");
    } else {
      setValueContext("selected.category", e);
    }
  };

  const hanledOnInputchange = (e) => {
    setValue("param.category_name", e);
    refetch();
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["getListCategorySelect"],
    queryFn: () =>
      categoryAPI.getListCategory({
        query: {
          size: 10,
          column_name: "category_name",
          query: param.category_name,
        },
      }),
    onSuccess: (onSuccess) => {
      setValue(
        "data",
        onSuccess?.result?.map((item) => ({
          value: item.id,
          label: item.category_name,
        }))
      );
      // console.log({ onSuccess });
    },
  });

  return (
    <div>
      <Select
        isClearable
        placeholder="Select Category"
        value={selectedCategory}
        onChange={handleOnchangeSelected}
        options={data?.result?.map((item) => ({
          value: item.id,
          label: item.category_name,
        }))}
        onInputChange={(e) => hanledOnInputchange(e)}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SelectedCategory;
