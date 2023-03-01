import styled from "styled-components";
import { useWatch } from "react-hook-form";

const Loading = ({}) => {
  const loading = useWatch({
    name: "loading",
  });

  return (
    <Container show={loading}>
      <div className="demo-inline-spacing">
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 9999;
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  color: #fff;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
