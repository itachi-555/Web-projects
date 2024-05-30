const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const Todo = require("./models/Todos");

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to the database
mongoose.connect("mongodb+srv://gameryounes555:Xl8o2cYvzbYUMoCL@cluster0.2xhvbdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.error("Error connecting to database", err);
    });

// Handle adding Todo
app.post('/todos', async (req, res) => {
    const label = req.body.label;
    const state = false;
    const newTodo = new Todo();
    newTodo.label = label;
    newTodo.state = state;
    await newTodo.save();
    console.log("Todo added");
    res.status(200).json({ message: 'Todo added successfully' });
});

// Handle updating Todo state
app.patch('/todos/:todoId/state', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const todo = await Todo.findById(todoId);
        if (todo) {
            todo.state = !todo.state;
            await todo.save();
            res.status(200).json({ message: "Todo state updated successfully", todo: todo });
        } else {
            res.status(404).json({ message: `Todo with ID '${todoId}' not found` });
        }
    } catch (error) {
        console.error("Error updating Todo state:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Handle updating Todo label
app.patch('/todos/:todoId/label', async (req, res) => {
    const todoId = req.params.todoId;
    const newLabel = req.body.label;
    try {
        const todo = await Todo.findById(todoId);
        if (todo) {
            todo.label = newLabel;
            await todo.save();
            res.status(200).json({ message: "Todo label updated successfully", todo: todo });
        } else {
            res.status(404).json({ message: `Todo with ID '${todoId}' not found` });
        }
    } catch (error) {
        console.error("Error updating Todo label:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Handle deleting Todo
app.delete('/todos/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if (deletedTodo) {
            console.log(`Todo with ID '${todoId}' deleted successfully`);
            res.status(200).json({ message: `Todo with ID '${todoId}' deleted successfully` });
        } else {
            console.log(`Todo with ID '${todoId}' not found`);
            res.status(404).json({ message: `Todo with ID '${todoId}' not found` });
        }
    } catch (error) {
        console.error("Error deleting Todo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Handle fetching all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Handle marking all todos as complete
app.patch('/todos/mark-all-complete', async (req, res) => {
    try {
        await Todo.updateMany({}, { state: true });
        res.status(200).json({ message: "All todos marked as complete" });
    } catch (error) {
        console.error("Error marking all todos as complete:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Handle clearing all completed todos
app.delete('/todos/clear-completed', async (req, res) => {
    try {
        await Todo.deleteMany({ state: true });
        res.status(200).json({ message: "Completed todos cleared successfully" });
    } catch (error) {
        console.error("Error clearing completed todos:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Handle fetching a single todo by ID
app.get('/todos/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const todo = await Todo.findById(todoId);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ message: `Todo with ID '${todoId}' not found` });
        }
    } catch (error) {
        console.error("Error fetching todo by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Website host
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
