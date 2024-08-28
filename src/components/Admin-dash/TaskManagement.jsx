import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaTwitter,
  FaLinkedin,
  FaTelegram,
  FaYoutube,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import "./CSS/TaskManagement.css";

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [taskSearchTerm, setTaskSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    reward: 0,
    isFollowTask: false,
    platform: "",
    accountLink: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddNewTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = { ...newTask };
      let response;

      const API_BASE_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5001"
          : "https://4rzf4x59sk.execute-api.eu-north-1.amazonaws.com/dev";

      if (taskData.category === "Follow Task") {
        response = await axios.post(
          `${API_BASE_URL}/api/follow-tasks`,
          taskData
        );
        // Ensure the new follow task has the correct category
        response.data.task.category = "Follow Task";
      } else {
        response = await axios.post(`${API_BASE_URL}/api/tasks`, taskData);
      }
      setTasks([...tasks, response.data.task]);
      setNewTask({
        title: "",
        description: "",
        category: "",
        reward: 0,
        platform: "",
        accountLink: "",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const API_BASE_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5001"
          : "https://4rzf4x59sk.execute-api.eu-north-1.amazonaws.com/dev";

      const [tasksResponse, followTasksResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/tasks`),
        axios.get(`${API_BASE_URL}/api/follow-tasks`),
      ]);
      const regularTasks = tasksResponse.data.map((task) => ({
        ...task,
        category: task.category || "Other",
      }));
      const followTasks = followTasksResponse.data.map((task) => ({
        ...task,
        category: "Follow Task",
      }));
      const allTasks = [...regularTasks, ...followTasks];
      // Remove duplicate tasks based on _id
      const uniqueTasks = allTasks.filter(
        (task, index, self) =>
          index === self.findIndex((t) => t._id === task._id)
      );
      setTasks(uniqueTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const API_BASE_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5001"
          : "https://4rzf4x59sk.execute-api.eu-north-1.amazonaws.com/dev";

      let response;
      if (editingTask.category === "Follow Task") {
        response = await axios.patch(
          `${API_BASE_URL}/api/follow-ttasks/${editingTask._id}`,
          editingTask
        );
      } else {
        response = await axios.patch(
          `${API_BASE_URL}/api/tasks/${editingTask._id}`,
          editingTask
        );
      }
      setTasks(
        tasks.map((task) =>
          task._id === editingTask._id ? response.data : task
        )
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteTask = async () => {
    try {
      const API_BASE_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5001"
          : "https://4rzf4x59sk.execute-api.eu-north-1.amazonaws.com/dev";

      const taskToDeleteData = tasks.find((task) => task._id === taskToDelete);
      if (taskToDeleteData.category === "Follow Task") {
        await axios.delete(`${API_BASE_URL}/api/follow-tasks/${taskToDelete}`);
      } else {
        await axios.delete(`${API_BASE_URL}/api/tasks/${taskToDelete}`);
      }
      setTasks(tasks.filter((task) => task._id !== taskToDelete));
      setShowDeleteConfirmation(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDeleteSelectedTasks = async () => {
    const selectedTasks = tasks
      .filter((task) => task.selected)
      .map((task) => task._id);
    if (selectedTasks.length > 0) {
      setTaskToDelete("selected");
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDeleteSelectedTasks = async () => {
    try {
      const API_BASE_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5001"
          : "https://4rzf4x59sk.execute-api.eu-north-1.amazonaws.com/dev";
      const selectedTaskIds = tasks
        .filter((task) => task.selected)
        .map((task) => task._id);
      const followTaskIds = selectedTaskIds.filter(
        (id) => tasks.find((task) => task._id === id).category === "Follow Task"
      );
      const regularTaskIds = selectedTaskIds.filter(
        (id) => !followTaskIds.includes(id)
      );

      if (followTaskIds.length > 0) {
        await axios.post(`${API_BASE_URL}/api/follow-tasks/bulk-delete`, {
          taskIds: followTaskIds,
        });
      }
      if (regularTaskIds.length > 0) {
        await axios.post(`${API_BASE_URL}/api/tasks/bulk-delete`, {
          taskIds: regularTaskIds,
        });
      }

      setTasks(tasks.filter((task) => !task.selected));
      setShowDeleteConfirmation(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting selected tasks:", error);
    }
  };

  const handleSelectTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, selected: !task.selected } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      categoryFilter === "All" || task.category === categoryFilter;
    const searchTerm = taskSearchTerm.toLowerCase();
    const searchMatch =
      (task.title && task.title.toLowerCase().includes(searchTerm)) ||
      (task.description && task.description.toLowerCase().includes(searchTerm));
    return categoryMatch && (taskSearchTerm === "" || searchMatch);
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getIconForPlatform = (platform) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return FaTwitter;
      case "linkedin":
        return FaLinkedin;
      case "telegram":
        return FaTelegram;
      case "youtube":
        return FaYoutube;
      case "instagram":
        return FaInstagram;
      case "tiktok":
        return FaTiktok;
      default:
        return null;
    }
  };

  return (
    <div className="task-management">
      <h2>Task Management</h2>

      <div className="filters">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={taskSearchTerm}
            onChange={(e) => setTaskSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filter">
          <select value={categoryFilter} onChange={handleCategoryChange}>
            <option value="All">All Categories</option>
            <option value="Survey">Survey</option>
            <option value="Data Science">Data Science</option>
            <option value="CAPTCHA">CAPTCHA</option>
            <option value="Feedback">Feedback</option>
            <option value="Audio Transcription">Audio Transcription</option>
            <option value="Follow Task">Follow Task</option>
          </select>
        </div>
      </div>

      <button onClick={handleDeleteSelectedTasks} className="btn btn-danger">
        Delete Selected
      </button>

      <div className="table-responsive">
        <table className="task-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setTasks(
                      tasks.map((task) => ({
                        ...task,
                        selected: e.target.checked,
                      }))
                    )
                  }
                />
              </th>
              <th>Task No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Reward</th>
              <th>Platform</th>
              <th>Account Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={task.selected || false}
                    onChange={() => handleSelectTask(task._id)}
                  />
                </td>
                <td>{task._id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.category}</td>
                <td>{task.reward}</td>
                <td>{task.platform || "-"}</td>
                <td>{task.accountLink || "-"}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(Math.ceil(filteredTasks.length / tasksPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={currentPage === number + 1 ? "active" : ""}
            >
              {number + 1}
            </button>
          )
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastTask >= filteredTasks.length}
        >
          Next
        </button>
      </div>

      <h3>Add New Task</h3>
      <form onSubmit={handleAddNewTask} className="add-task-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleNewTaskChange}
            required
          />
        </div>
        <div className="form-group full-width">
          <textarea
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleNewTaskChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            name="category"
            value={newTask.category}
            onChange={handleNewTaskChange}
            required
          >
            <option value="">Select Task Category</option>
            <option value="Survey">Survey</option>
            <option value="Data Science">Data Science</option>
            <option value="CAPTCHA">CAPTCHA</option>
            <option value="Feedback">Feedback</option>
            <option value="Audio Transcription">Audio Transcription</option>
            <option value="Follow Task">Follow Task</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="number"
            name="reward"
            placeholder="Task Reward"
            value={newTask.reward}
            onChange={handleNewTaskChange}
            required
          />
        </div>
        {newTask.category === "Follow Task" && (
          <>
            <div className="form-group">
              <select
                name="platform"
                value={newTask.platform}
                onChange={handleNewTaskChange}
                required
              >
                <option value="">Select Platform</option>
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Telegram">Telegram</option>
                <option value="YouTube">YouTube</option>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="accountLink"
                placeholder="Account Link"
                value={newTask.accountLink}
                onChange={handleNewTaskChange}
                required
              />
            </div>
          </>
        )}
        <button type="submit" className="btn btn-success">
          Add Task
        </button>
      </form>

      {editingTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <form onSubmit={handleUpdateTask}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group full-width">
                <textarea
                  name="description"
                  placeholder="Task Description"
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <select
                  name="category"
                  value={editingTask.category}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Task Category</option>
                  <option value="Survey">Survey</option>
                  <option value="Data Science">Data Science</option>
                  <option value="CAPTCHA">CAPTCHA</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Audio Transcription">
                    Audio Transcription
                  </option>
                  <option value="Follow Task">Follow Task</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="reward"
                  placeholder="Task Reward"
                  value={editingTask.reward}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, reward: e.target.value })
                  }
                  required
                />
              </div>
              {editingTask.category === "Follow Task" && (
                <>
                  <div className="form-group">
                    <select
                      name="platform"
                      value={editingTask.platform}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          platform: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select Platform</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Telegram">Telegram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Instagram">Instagram</option>
                      <option value="TikTok">TikTok</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="accountLink"
                      placeholder="Account Link"
                      value={editingTask.accountLink}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          accountLink: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </>
              )}
              <div className="button-group">
                <button type="submit" className="btn btn-primary">
                  Update Task
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              {taskToDelete === "selected"
                ? "Confirm Bulk Deletion"
                : "Confirm Deletion"}
            </h3>
            <p>
              {taskToDelete === "selected"
                ? "Are you sure you want to delete the selected tasks?"
                : "Are you sure you want to delete this task?"}
            </p>
            <div className="button-group">
              <button
                onClick={
                  taskToDelete === "selected"
                    ? confirmDeleteSelectedTasks
                    : confirmDeleteTask
                }
                className="btn btn-danger"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskManagement;
