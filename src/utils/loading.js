import { useFormContext } from "react-hook-form";
import $ from "jquery";

const Loading = (isLoading) => {
  const { setValue } = useFormContext();

  if (isLoading) {
    setValue("loading", true);
  } else {
    setTimeout(() => {
      setValue("loading", false);
    }, 500);
  }
};

export default Loading;
