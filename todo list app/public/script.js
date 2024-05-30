// Function to fetch and display todos
async function fetchTodos() {
    try {
        const response = await fetch("/todos");
        if (!response.ok) {
            throw new Error("Failed to fetch todos");
        }
        const todos = await response.json();
        console.log("Todos:", todos); // Log todos for debugging
        const todoContainer = document.getElementById("todoContainer");
        todoContainer.innerHTML = "";
        todos.forEach((todo) => {
            const todoDiv = document.createElement("div");
            todoDiv.innerHTML = `
            <div class="todo">
              <div>
                <input type="checkbox" id="state_${todo._id}" ${todo.state ? "checked" : ""
                }>
              <p>${todo.label}</p>
                </div>
            <button onclick="deleteTodo('${todo._id}')">Delete</button>
            </div>
            `;
            todoContainer.appendChild(todoDiv);

            // Add event listener to update todo state when checkbox is clicked
            const stateCheckbox = document.getElementById(`state_${todo._id}`);
            stateCheckbox.addEventListener("change", async () => {
                await updateTodoState(todo._id, stateCheckbox.checked);
            });
        });
    } catch (error) {
        console.error("Error fetching todos:", error);
        // Handle error (e.g., display error message to user)
    }
}

// Function to add a new todo
async function addTodo() {
    const label = document.getElementById("todoLabel").value;
    if (label.trim() !== "") {
        await fetch("/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label }),
        });
        document.getElementById("todoLabel").value = "";
        fetchTodos();
    } else {
        alert("Todo label cannot be empty");
    }
}

// Function to delete a todo
async function deleteTodo(todoId) {
    await fetch(`/todos/${todoId}`, { method: "DELETE" });
    fetchTodos();
}

// Function to update todo state
async function updateTodoState(todoId, state) {
    await fetch(`/todos/${todoId}/state`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state }),
    });
    fetchTodos();
}

// Function to check all todos
async function checkAll() {
    await fetch("/todos/mark-all-complete", { method: "PATCH" });
    fetchTodos();
}

// Function to uncheck all todos
async function uncheckAll() {
    const response = await fetch("/todos");
    const todos = await response.json();
    todos.forEach(async (todo) => {
        const stateCheckbox = document.getElementById(`state_${todo._id}`);
        if (stateCheckbox.checked) {
            await updateTodoState(todo._id, false);
        }
    });
    fetchTodos();
}
async function deleteAll() {
    const response = await fetch("/todos");
    const todos = await response.json();

    todos.forEach((todo) => {
        deleteTodo(todo._id);
    });
    fetchTodos();
}
//delete completed
async function deleteCompleted() {
    const response = await fetch("/todos");
    const todos = await response.json();

    todos.forEach((todo) => {
        if (todo.state) {
            deleteTodo(todo._id);
        }
    });
    fetchTodos();
}
// Fetch todos when the page loads
fetchTodos();

// Add event listener to form submission for adding a todo
document
    .getElementById("addTodoForm")
    .addEventListener("submit", async (event) => {
        event.preventDefault();
        addTodo();
    });

// Add event listener to check all button
document
    .getElementById("checkAll")
    .addEventListener("click", async () => {
        checkAll();
    });

// Add event listener to uncheck all button
document
    .getElementById("uncheckAll")
    .addEventListener("click", async () => {
        uncheckAll();
    });
document
    .getElementById("deleteAll")
    .addEventListener("click", async () => {
        deleteAll();
    });
document
    .getElementById("deleteCompleted")
    .addEventListener("click", async () => {
        deleteCompleted();
    });