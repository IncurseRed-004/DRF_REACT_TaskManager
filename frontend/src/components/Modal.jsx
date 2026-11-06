
import { useState, useEffect } from "react";

import {
  Button,
  Modal as BootstrapModal,
  Form,
} from "react-bootstrap";

function CustomModal({ activeItem, toggle, onSave }) {

  // Store the task being created or edited
  const [item, setItem] = useState(activeItem);

  // Update the form when activeItem changes
  useEffect(() => {
    setItem(activeItem);
  }, [activeItem]);

  // Handle changes in input fields
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setItem((previousItem) => ({
      ...previousItem,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save task
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(item);
  };

  return (
    <BootstrapModal show={true} onHide={toggle}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>
          Task Item
        </BootstrapModal.Title>
      </BootstrapModal.Header>

      <Form onSubmit={handleSubmit}>
        <BootstrapModal.Body>

          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>

            <Form.Control
              type="text"
              name="title"
              value={item.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
              required
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>

            <Form.Control
              type="text"
              name="description"
              value={item.description}
              onChange={handleChange}
              placeholder="Enter Task Description"
            />
          </Form.Group>

          {/* Completed */}
          <Form.Group>
            <Form.Check
              type="checkbox"
              name="completed"
              label="Completed"
              checked={item.completed}
              onChange={handleChange}
            />
          </Form.Group>

        </BootstrapModal.Body>

        {/* Modal Footer */}
        <BootstrapModal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Cancel
          </Button>

          <Button variant="success" type="submit">
            Save
          </Button>
        </BootstrapModal.Footer>
      </Form>
    </BootstrapModal>
  );
}

export default CustomModal;
