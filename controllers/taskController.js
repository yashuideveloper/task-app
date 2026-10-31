import Task from "../models/Task.js";

export const getTasks = async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id });
  res.status(200).json(tasks);
};

export const createTask = async (req, res, next) => {
  const { title, description, completed } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Please provide title and description" });
  }

  const newTask = await Task.create({
    title,
    description,
    completed: completed || false,
    user: req.user._id,
  });

  res.status(201).json({ message: "Succesfully created the task", newTask });
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { title, description, completed },
    { new: true, runValidators: true },
  );

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ message: "Task updated successfully", updatedTask });
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user._id });

  if (!deletedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ message: "Task deleted successfully", deletedTask });
};
