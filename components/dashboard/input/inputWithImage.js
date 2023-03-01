import styled from "styled-components";

const InputWithImage = ({ propsImg, onChange, propsInput }) => {
  return (
    <Container>
      <div id="container-input-with-image">
        <img width="100%" {...propsImg} />
        <label htmlFor="inputFileWithImg">
          <i className="bx bx-camera" />
        </label>
        <input
          type="file"
          id="inputFileWithImg"
          name="inputFileWithImg"
          style={{ display: "none" }}
          accept=".jpeg, .jpg,"
          onChange={onChange}
          {...propsInput}
        />
      </div>
    </Container>
  );
};

export default InputWithImage;

const Container = styled.div`
  #container-input-with-image {
    position: relative;

    img {
      z-index: -1;
    }

    label {
      i {
        font-size: 30pt;
        opacity: 0;
        cursor: pointer;
      }
      transition: 500ms;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      top: 0;
      bottom: 0;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      color: #ffff;
    }

    :hover {
      label {
        i {
          opacity: 1;
        }
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
`;
