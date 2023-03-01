const CarouselBasic = () => {
  return (
    <div
      id="carouselExample-cf"
      className="carousel  slide carousel-fade"
      data-bs-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-bs-target="#carouselExample-cf"
          data-bs-slide-to="0"
          className="active"
        ></li>
        <li data-bs-target="#carouselExample-cf" data-bs-slide-to="1"></li>
        <li data-bs-target="#carouselExample-cf" data-bs-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            alt="First slide"
            width="100%"
            height={500}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            alt="Second slide"
            width="100%"
            height={500}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
            alt="Third slide"
            width="100%"
            height={500}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExample-cf"
        role="button"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExample-cf"
        role="button"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
};

export default CarouselBasic;
