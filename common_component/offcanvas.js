const OffCanvas = ({
  id = "offcanvasTop",
  position = "top",
  title = "Offcanvas Top",
  children,
  childrenFooter = [
    <button type="button" className="btn btn-primary me-2">
      Continue
    </button>,
    <button
      type="button"
      className="btn btn-outline-secondary"
      data-bs-dismiss="offcanvas"
    >
      Cancel
    </button>,
  ],
}) => {
  return (
    <div className={`offcanvas offcanvas-${position}`} tabindex="-1" id={id}>
      <div className="offcanvas-header">
        <h5 id="offcanvasTopLabel" className="offcanvas-title">
          {title}
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body h-100">{children}</div>
    </div>
  );
};

export default OffCanvas;
