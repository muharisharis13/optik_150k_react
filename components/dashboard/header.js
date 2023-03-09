import Breadcrumbs from "./Breadcrumbs";
import { HelmetDashboard } from "@utils";
import { Axios } from "../../src/utils";
import Cookie from "js-cookie";

const HeaderDashboard = () => {
  const Name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const btnLogout = () => {
    Axios.post("/admin/logout", {
      id_admin: localStorage.getItem("id_admin"),
      refresh_token: Cookie.get("refreshToken"),
    })
      .then((res) => {
        console.log({ res });
        if (res?.data) {
          const { code, data } = res.data;

          if (code === 200) {
            Cookie.remove("token");
            Cookie.remove("refreshToken");
            localStorage.clear();
            window.location.href = "/auth/login";
          } else {
            alert("terjadi kesalahan");
          }
        } else {
          alert("terjadi kesalahan");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (!Cookie.get("token")) {
    return (location.href = "/auth/login");
  }

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <HelmetDashboard />
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
          <i className="bx bx-menu bx-sm"></i>
        </a>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        {/* <!-- Search --> */}
        <div className="navbar-nav align-items-center">
          <div className="nav-item d-flex align-items-center">
            <Breadcrumbs />
          </div>
        </div>
        {/* <!-- /Search --> */}

        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="javascript:void(0);"
              data-bs-toggle="dropdown"
            >
              <div className="avatar avatar-online">
                <img
                  src="/assets/dashboard/assets/img/avatars/1.png"
                  className="w-px-40 h-auto rounded-circle"
                />
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src="/assets/dashboard/assets/img/avatars/1.png"
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">{Name}</span>
                      <small className="text-muted">{role}</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a className="dropdown-item" href="/dashboard/account">
                  <i className="bx bx-cog me-2"></i>
                  <span className="align-middle">Settings</span>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={btnLogout}>
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">Log Out</span>
                </a>
              </li>
            </ul>
          </li>
          {/* <!--/ User --> */}
        </ul>
      </div>
    </nav>
  );
};

export default HeaderDashboard;
