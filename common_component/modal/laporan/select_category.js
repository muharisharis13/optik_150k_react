import Modal from "../../modals";
import { SelectedCategory } from "../../select";
import { useWatch } from "react-hook-form";

const ModalSelectCategory = () => {
  const selectedCategory = useWatch({
    name: "selected.category",
  });
  return (
    <Modal
      title="Pilih Kategori"
      idModal="ModalSelectCategory"
      size="md"
      childrenFooter={[
        <a
          className="btn btn-primary"
          target="__blank"
          href={`/view/barang-by-category?category_id=${selectedCategory?.value}&category_name=${selectedCategory?.label}`}
        >
          Lanjutkan
        </a>,
      ]}
    >
      <div>
        <label htmlFor="" className="form-label">
          Kategori Barang
        </label>
        <SelectedCategory />
      </div>
    </Modal>
  );
};

export default ModalSelectCategory;
