
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./components/Modal";

const API_URL = "http://127.0.0.1:8000/todos/";

function App() {
  // State variables
  const [viewCompleted, setViewCompleted] = useState(false);

  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const [taskList, setTaskList] = useState([]);
  const [modal, setModal] = useState(false);

  // Fetch tasks when component loads
  useEffect(() => {
    refreshList();
  }, []);

  // Get tasks from Django
  const refreshList = async () => {
    try {
      const response = await axios.get(API_URL);
      setTaskList(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Change completed/incomplete view
  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  // Open or close modal
  const toggle = () => {
    setModal((previousModal) => !previousModal);
  };

  // Create new task
  const createItem = () => {
    const item = {
      title: "",
      description: "",
      completed: false,
    };

    setActiveItem(item);
    setModal(true);
  };

  // Edit existing task
  const editItem = (item) => {
    setActiveItem(item);
    setModal(true);
  };

  // Save task (create or update)
  const handleSubmit = async (item) => {
    try {
      if (item.id) {
        await axios.put(`${API_URL}${item.id}/`, item);
      } else {
        await axios.post(API_URL, item);
      }

      toggle();
      refreshList();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Delete task
  const handleDelete = async (item) => {
    try {
      await axios.delete(`${API_URL}${item.id}/`);
      refreshList();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Display completed or incomplete tasks
  const renderItems = () => {
    const filteredItems = taskList.filter(
      (item) => item.completed === viewCompleted
    );

    return filteredItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title me-2 ${
            item.completed ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>

        <div>
          <button
            onClick={() => editItem(item)}
            className="btn btn-secondary me-2"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </li>
    ));
  };

  // Completed/incomplete tabs
  const renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => displayCompleted(true)}
          className={viewCompleted ? "active" : ""}
        >
          Completed
        </span>

        <span
          onClick={() => displayCompleted(false)}
          className={!viewCompleted ? "active" : ""}
        >
          Incomplete
        </span>
      </div>
    );
  };

  // UI
  return (
    <main className="content">
      <h1 className="text-success text-uppercase text-center my-4">
        GFG Task Manager
      </h1>

      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div>
              <button onClick={createItem} className="btn btn-info">
                Add task
              </button>
            </div>

            {renderTabList()}

            <ul className="list-group list-group-flush">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>

      {modal && (
        <Modal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      )}
    </main>
  );
}

export default App;
