import { Axios } from "../../../utils";
import { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";

const AccountDashboard = () => {
  const { setValue, register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      role: "",
      username: "",
    },
  });
  const { setValue: setValueForm } = useFormContext();

  const getData = async () => {
    setValueForm("loading", true);
    await Axios.post("/admin", {
      id_admin: localStorage.getItem("id_admin"),
    })
      .then((res) => {
        console.log({ res });
        if (res?.data) {
          const { code, data } = res.data;
          if (code === 200) {
            setValue("name", data.name);
            setValue("role", data.role);
            setValue("username", data.username);
          }
        }
      })
      .catch((err) => {
        console.error({ err });
      })
      .finally(() => {
        setValueForm("loading", false);
      });
  };

  const changeName = async (data) => {
    setValueForm("loading", true);
    await Axios.put("/admin", {
      id_admin: localStorage.getItem("id_admin"),
      name: data.name,
    })
      .then((res) => {
        console.log({ res });
        if (res?.data) {
          const { code, data } = res.data;
          if (code === 200) {
            setValue("name", data.name);
            setValue("role", data.role);
            setValue("username", data.username);
          }
        }
      })
      .catch((err) => {
        console.error({ err });
      })
      .finally(() => setValueForm("loading", false));
  };

  const btnSaveChange = changeName;

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* <!-- Content wrapper --> */}
      <div className="content-wrapper">
        {/* <!-- Content --> */}
        {/* <Loading control={controlForm} /> */}
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <h5 className="card-header">Profile Details</h5>
                {/* <!-- Account --> */}
                <div className="card-body">
                  <div className="d-flex align-items-start align-items-sm-center gap-4">
                    <img
                      src="/assets/dashboard/assets/img/avatars/1.png"
                      alt="user-avatar"
                      className="d-block rounded"
                      height="100"
                      width="100"
                      id="uploadedAvatar"
                    />
                    <div className="button-wrapper">
                      <label
                        forthml="upload"
                        className="btn btn-primary me-2 mb-4"
                        tabIndex="0"
                      >
                        <span className="d-none d-sm-block">
                          Upload new photo
                        </span>
                        <i className="bx bx-upload d-block d-sm-none"></i>
                        <input
                          type="file"
                          id="upload"
                          className="account-file-input"
                          hidden
                          accept="image/png, image/jpeg"
                        />
                      </label>

                      <p className="text-muted mb-0">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="my-0" />
                <div className="card-body">
                  <form id="formAccountSettings">
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label forthml="firstName" className="form-label">
                          Your Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="firstName"
                          name="firstName"
                          autoFocus
                          {...register("name")}
                        />
                      </div>
                      <div className="mb-3 col-md-6">
                        <label forthml="lastName" className="form-label">
                          role
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="lastName"
                          id="lastName"
                          {...register("role")}
                          disabled
                        />
                      </div>
                      <div className="mb-3 col-md-6">
                        <label forthml="email" className="form-label">
                          username
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="email"
                          name="email"
                          {...register("username")}
                          disabled
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/* <!-- /Account --> */}
              </div>
              <div className="card">
                <div className="card-body">
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                      onClick={handleSubmit(btnSaveChange)}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- / Content --> */}
      </div>
      {/* <!-- Content wrapper --> */}
    </div>
  );
};

export default AccountDashboard;
