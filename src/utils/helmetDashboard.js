import { Helmet } from "react-helmet-async";

const HelmetDashboard = () => {
  return (
    <Helmet>
      {/* <!-- build:js assets/vendor/js/core.js --> */}
      <script
        async
        src="/assets/dashboard/assets/vendor/libs/jquery/jquery.js"
      ></script>
      {/* <!-- Helpers --> */}
      <script
        async
        src="/assets/dashboard/assets/vendor/js/helpers.js"
      ></script>

      {/* <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
<!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  --> */}
      <script async src="/assets/dashboard/assets/js/config.js"></script>

      {/* <!-- Core JS --> */}

      <script
        async
        src="/assets/dashboard/assets/vendor/libs/popper/popper.js"
      ></script>
      <script
        async
        src="/assets/dashboard/assets/vendor/js/bootstrap.js"
      ></script>
      <script
        async
        src="/assets/dashboard/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"
      ></script>

      <script async src="/assets/dashboard/assets/vendor/js/menu.js"></script>
      {/* <!-- endbuild --> */}

      {/* <!-- Vendors JS --> */}

      {/* <!-- Page JS --> */}
      <script
        async
        src="/assets/dashboard/assets/js/pages-account-settings-account.js"
      ></script>

      {/* <!-- Place this tag in your head or just before your close body tag. --> */}
      <script async src="https://buttons.github.io/buttons.js"></script>

      {/* <!-- Main JS --> */}
      <script async src="/assets/dashboard/assets/js/main.js"></script>
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
    </Helmet>
  );
};

export default HelmetDashboard;
