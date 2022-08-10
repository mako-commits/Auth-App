import { useContext, useState, useRef } from "react";
import AuthContext from "../../store/auth-context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const API_KEY = process.env.REACT_APP_API_KEY;

const DeleteAccount = () => {
  const newDeleteInputRef = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const authCtx = useContext(AuthContext);

  //get user id
  const id = authCtx.token;

  const deleteAccountHandler = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        authCtx.logout();
        alert("Account Deleted");
      } else {
        return res.json().then((data) => {
          if (data && data.error && data.error.message) {
            alert(data.error.message);
            throw new Error(data.error.message);
          } else {
            alert("Something went wrong");
          }
        });
      }
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredValue = newDeleteInputRef.current.value;

    if (enteredValue === "delete") {
      deleteAccountHandler();
    } else {
      alert("Wrong Value");
    }
  };
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Type <em>delete</em> below to confirm account deletion
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="delete"
                ref={newDeleteInputRef}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={submitHandler}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAccount;
