import { Modal } from "react-bootstrap";

export default function DeleteData({ show, handleClose, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true)
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <section className="modal">
          <h3>Delete Data</h3>
          <p>Are you sure you want to delete this data?</p>
          <div>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleClose}>No</button>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
};