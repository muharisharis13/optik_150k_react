import { HelmetDashboard } from "@utils";
import { Helmet } from "react-helmet-async";
const NotFound = ({ title = "Page Not Found :(" }) => {
  return (
    <div>
      <div className="container-xxl container-p-y">
        <div className="misc-wrapper">
          <h2 className="mb-2 mx-2">{title}</h2>

          <div className="mt-3">
            <img
              src="/assets/dashboard/assets/img/illustrations/page-misc-error-light.png"
              alt="page-misc-error-light"
              width="500"
              className="img-fluid"
              data-app-dark-img="illustrations/page-misc-error-dark.png"
              data-app-light-img="illustrations/page-misc-error-light.png"
            />
          </div>
        </div>
      </div>
      <HelmetDashboard />
      <Helmet>
        {/* <!-- Favicon --> */}
        <link
          rel="icon"
          type="image/x-icon"
          href="/assets/dashboard/assets/img/favicon/favicon.ico"
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
          href="/assets/dashboard/assets/vendor/css/pages/page-misc.css"
        />
        {/* <!-- Helpers --> */}
        <script src="/assets/dashboard/assets/vendor/js/helpers.js"></script>

        {/* <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section --> */}
        {/* <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  --> */}
        <script src="/assets/dashboard/assets/js/config.js"></script>

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

export default NotFound;
