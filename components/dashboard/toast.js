import moment from "moment";
import { useFormContext } from "react-hook-form";
const listStatus = [
  {
    label: "info",
    value: "bg-info",
  },
  {
    label: "danger",
    value: "bg-danger",
  },
  {
    label: "primary",
    value: "bg-primary",
  },
  {
    label: "success",
    value: "bg-success",
  },
];

const Toast = ({
  show = false,
  content = "content",
  title = "Title",
  type = "danger",
}) => {
  const { setValue } = useFormContext();

  const initCheckStatus = () => {
    if (type) {
      return listStatus.find((find) => find.label === type)?.value;
    }
    return "bg-info";
  };

  const btnClose = () => {
    setValue("toast", false);
  };

  return (
    <div
      className="toast-container top-0 end-0 p-lg-5"
      style={{ zIndex: "99999", position: "fixed" }}
    >
      <div
        className={`bs-toast ${initCheckStatus()} toast fade top-0 end-0 ${
          show ? "show" : "hide"
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-delay="2000"
      >
        <div className="toast-header">
          <i className="bx bx-bell me-2"></i>
          <div className="me-auto fw-semibold">{title}</div>
          <small>{moment(new Date()).format("DD MMM YYYY - hh:mm:ss")}</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={btnClose}
          ></button>
        </div>
        <div className="toast-body">{content}</div>
      </div>
    </div>
  );
};

export default Toast;
