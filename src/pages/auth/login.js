import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { Toast } from "@components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../../../API";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: null,
      password: null,
    },
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const btnLogin = async (data) => {
    setLoading(true);
    await adminAPI
      .login({
        body: {
          username: data.username,
          password: data.password,
        },
      })
      .then((res) => {
        if (res?.data) {
          const { code, data } = res;
          if (code === 200) {
            Cookie.set("token", data?.token);
            Cookie.set("refreshToken", data?.refresh_token);
            localStorage.setItem("name", data?.name);
            localStorage.setItem("role", data?.role);
            localStorage.setItem("username", data?.username);
            localStorage.setItem("id_admin", data?.id);
            window.location.href = "/dashboard"
          }
        } else {
          setAlert(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (Cookie.get("token")) {
    return (window.location.href = "/dashboard");
  }

  return (
    <div>
      <div className="container-xxl">
        <Toast
          show={alert}
          content="username or password wrong ! Please re-login"
          title="Failed to Login"
          type="danger"
        />
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            {/* <!-- Register --> */}
            <div className="card">
              <div className="card-body">
                {/* <!-- Logo --> */}
                <div className="app-brand justify-content-center">
                  <a href="#" className="app-brand-link gap-2">
                    <span className="app-brand-logo demo">
                      <img src="/assets/logo/logo.png" alt="/assets/logo/logo.png" />
                    </span>
                  </a>
                </div>
                {/* <!-- /Logo --> */}
                <h4 className="mb-2">Welcome to OPTIK150K Dashboard</h4>
                <p className="mb-4">
                  Please sign-in to your account and start the adventure
                </p>

                <form
                  id="formAuthentication"
                  className="mb-3"
                  onSubmit={handleSubmit(btnLogin)}
                >
                  <div className="mb-3">
                    <label forhtml="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      autoFocus
                      {...register("username")}
                    />
                  </div>
                  <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" forhtml="password">
                        Password
                      </label>

                    </div>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        aria-describedby="password"
                        {...register("password")}
                      />
                      <span className="input-group-text cursor-pointer">
                        <i className="bx bx-hide"></i>
                      </span>
                    </div>
                  </div>
                  {/* <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember-me"
                      />
                      <label className="form-check-label" forhtml="remember-me">
                        {" "}
                        Remember Me{" "}
                      </label>
                    </div>
                  </div> */}
                  <div className="mb-3">
                    <button
                      className="btn btn-primary d-grid w-100"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      {loading ? "Loading" : "Sign in"}
                    </button>
                  </div>
                </form>

                {/* <p className="text-center">
                  <span>New on our platform?</span>
                  <a href="auth-register-basic.html">
                    <span>Create an account</span>
                  </a>
                </p> */}
              </div>
            </div>
            {/* <!-- /Register --> */}
          </div>
        </div>
      </div>

      <Helmet>
        <link
          rel="icon"
          type="image/x-icon"
          href="assets/dashboard/assets/img/favicon/favicon.ico"
        />

        {/* <!-- Fonts --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        {/* <!-- Icons. Uncomment required icon fonts --> */}
        <link
          rel="stylesheet"
          href="/assets/dashboard/assets/vendor/fonts/boxicons.css"
        />

        {/* <!-- Core CSS --> */}
        <link
          rel="stylesheet"
          href="/assets/dashboard/assets/vendor/css/core.css"
          class="template-customizer-core-css"
        />
        <link
          rel="stylesheet"
          href="/assets/dashboard/assets/vendor/css/theme-default.css"
          class="template-customizer-theme-css"
        />
        <link rel="stylesheet" href="/assets/dashboard/assets/css/demo.css" />

        {/* <!-- Vendors CSS --> */}
        <link
          rel="stylesheet"
          href="/assets/dashboard/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css"
        />

        {/* <!-- Page CSS --> */}
        {/* <!-- Page --> */}
        <link
          rel="stylesheet"
          href="/assets/dashboard/assets/vendor/css/pages/page-auth.css"
        />
        {/* <!-- Helpers --> */}
        <script src="/assets/dashboard/assets/vendor/js/helpers.js"></script>

        {/* <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section --> */}
        {/* <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  --> */}
        <script src="/assets/dashboard/assets/js/config.js"></script>

        {/* <!-- Core JS --> */}
        {/* <!-- build:js assets/vendor/js/core.js --> */}
        <script src="/assets/dashboard/assets/vendor/libs/jquery/jquery.js"></script>
        <script src="/assets/dashboard/assets/vendor/libs/popper/popper.js"></script>
        <script src="/assets/dashboard/assets/vendor/js/bootstrap.js"></script>
        <script src="/assets/dashboard/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>

        <script src="/assets/dashboard/assets/vendor/js/menu.js"></script>
        {/* <!-- endbuild --> */}

        {/* <!-- Vendors JS --> */}

        {/* <!-- Main JS --> */}
        <script src="/assets/dashboard/assets/js/main.js"></script>

        {/* <!-- Page JS --> */}

        {/* <!-- Place this tag in your head or just before your close body tag. --> */}
        <script async defer src="https://buttons.github.io/buttons.js"></script>
      </Helmet>
    </div>
  );
};

export default Login;
