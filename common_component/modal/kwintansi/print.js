import Modals from "../../modals";

const PrintKwitansiModal = ({
  param
}) => {
  return (
    <Modals
      title="Print Kwitansi"
      idModal="PrintKwitansiModal"
      size="lg"
      childrenFooter={[]}
    >
      <div>
        <div className="form-group shadow-sm border border-dark p-3 my-3">
          <label>Kwitansi 1</label>
          <a target="__blank" href={`/view/kwitansi?versi=1&kwitansi_id=${param?.uuid}`} >
            <img
              src="/assets/kwitansi_sample/kwi1.png"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                cursor: "pointer",
              }}
            />

          </a>
        </div>
        <div className="form-group shadow-sm border border-dark p-3 my-3">
          <label>Kwitansi 2</label>
          <a target="__blank" href={`/view/kwitansi?versi=2&kwitansi_id=${param?.uuid}`} >
          <img
            src="/assets/kwitansi_sample/kwi2.png"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
          </a>
        </div>
        <div className="form-group shadow-sm border border-dark p-3 my-3">
          <label>Kwitansi 3</label>
          <a target="__blank" href={`/view/kwitansi?versi=3&kwitansi_id=${param?.uuid}`} >
          <img
            src="/assets/kwitansi_sample/kwi3.png"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
          </a>
        </div>
        <div className="form-group shadow-sm border border-dark p-3 my-3">
          <label>Kwitansi 4</label>
          <a target="__blank" href={`/view/kwitansi?versi=4&kwitansi_id=${param?.uuid}`}>
          <img
            src="/assets/kwitansi_sample/kwi4.png"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
          </a>
        </div>
        <div className="form-group shadow-sm border border-dark p-3 my-3">
          <label>Kwitansi 5</label>
          <a target="__blank" href={`/view/kwitansi?versi=5&kwitansi_id=${param?.uuid}`} >
          <img
            src="/assets/kwitansi_sample/kwi5.png"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
          </a>
        </div>
      </div>
    </Modals>
  );
};

export default PrintKwitansiModal;
