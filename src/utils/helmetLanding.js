import { Helmet } from "react-helmet-async";

const HelmetDashboard = () => {
  return (
    <Helmet>
      {/* <!-- Favicons --> */}
      <link href="/assets/img/favicon.png" rel="icon" />
      <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

      {/* <!-- Google Fonts --> */}
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Raleway:300,400,500,700,800|Montserrat:300,400,700"
        rel="stylesheet"
      />

      {/* <!-- Bootstrap CSS File --> */}
      <link
        href="/assets/lib/bootstrap/css/bootstrap.min.css"
        rel="stylesheet"
      />

      {/* <!-- Libraries CSS Files --> */}
      <link
        href="/assets/lib/font-awesome/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <link href="/assets/lib/animate/animate.min.css" rel="stylesheet" />
      <link href="/assets/lib/ionicons/css/ionicons.min.css" rel="stylesheet" />
      <link
        href="/assets/lib/owlcarousel/assets/owl.carousel.min.css"
        rel="stylesheet"
      />
      <link
        href="/assets/lib/magnific-popup/magnific-popup.css"
        rel="stylesheet"
      />
      <link href="/assets/lib/ionicons/css/ionicons.min.css" rel="stylesheet" />

      {/* <!-- Main Stylesheet File --> */}
      <link href="/assets/css/style.css" rel="stylesheet"></link>

      {/* <!-- JavaScript Libraries --> */}
      <script src="/assets/lib/jquery/jquery.min.js"></script>
      <script src="/assets/lib/jquery/jquery-migrate.min.js"></script>
      <script src="/assets/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="/assets/lib/easing/easing.min.js"></script>
      <script src="/assets/lib/superfish/hoverIntent.js"></script>
      <script src="/assets/lib/superfish/superfish.min.js"></script>
      <script src="/assets/lib/wow/wow.min.js"></script>
      <script src="/assets/lib/owlcarousel/owl.carousel.min.js"></script>
      <script src="/assets/lib/magnific-popup/magnific-popup.min.js"></script>
      <script src="/assets/lib/sticky/sticky.js"></script>

      {/* <!-- Contact Form JavaScript File --> */}
      <script src="/assets/contactform/contactform.js"></script>

      {/* <!-- Template Main Javascript File --> */}
      <script async src="/assets/js/main.js"></script>
      <script type="text/javascript" src="/main.js"></script>
    </Helmet>
  );
};

export default HelmetDashboard;
