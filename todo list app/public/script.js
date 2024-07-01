const todoInputText = document.getElementById('todo-input-text');
const todoInputStatus = document.getElementById('todo-input-status');
const todos = document.getElementById('todos');
const AllButton = document.getElementById('All');
const ActiveButton = document.getElementById('Active');
const CompletedButton = document.getElementById('Completed');
let items = 0;
//API functions
function fetchTodos() {
    fetch('/todos')
        .then(response => {
            // Handle HTTP response
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON data from the response
        })
        .then(data => {
            // Handle parsed data
            data.forEach((todo, index) => {
                addTodo(todo.label, todo.state, todo._id);
            });
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
}
async function postTodo(text, status) {
    const data = {
        label: text,
        state: status
    };

    try {
        const response = await fetch('/todos', {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json', // Specify content type
                // Add any headers you need here
            },
            body: JSON.stringify(data), // Convert JS object to JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json(); // Parse JSON data from the response
        console.log('Success:', responseData.message);
        return responseData.id; // Return the ID from the response
    } catch (error) {
        console.error('Error:', error);
        throw error; // Propagate the error further if needed
    }
}
async function deleteFromServer(id) {
    fetch(`/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // or .text() or .blob() etc. based on response type
        })
        .then(data => {
            console.log('Delete request successful:', data);
        })
        .catch(error => {
            console.error('Error deleting:', error);
        });
}
async function updateFromServer(id) {
    try {
        const response = await fetch(`/todos/${id}/state`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json(); // Parse JSON data from the response
        return responseData.state;

    } catch (error) {
        console.error('Error:', error);
        throw error; // Propagate the error further if needed
    }

}
async function fetchTodoById(todoId) {
    try {
        const response = await fetch(`/todo/${todoId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch todo');
        }
        const data = await response.json();
        return data.state; // Return the JSON data received from the server
    } catch (error) {
        console.error('Error fetching todo:', error);
        throw error; // Propagate the error further if needed
    }
}

//js functions
function updateItems() {
    const itemsLeft = document.getElementById('items');
    itemsLeft.innerText = `${items} items left`;
}
// Function to add a new todo element
async function addTodo(text, checkBoxValue, index) {
    try {
        let className;
        if (!checkBoxValue) {
            items++;
            updateItems();
            className = 'uncompleted';
        } else {
            className = 'completed';
        }
        const todo = document.createElement('div');
        todo.className = 'todo';
        todo.id = `${index}`;
        todo.innerHTML = `<div class="left">
        <input type="checkbox" class="circle" id="checkbox${index}" onclick="updateState('${index}')"/>
        <p class = "${className}" id="text${index}">${text}</p>
        </div>
        <button class="cross" id="cross${index}" onclick="deleteTodo('${index}')"></button>`;
        const checkbox = todo.querySelector(`#checkbox${index}`);
        checkbox.checked = checkBoxValue;
        todos.appendChild(todo); // Assuming todos is the parent element where todos are appended

    } catch (error) {
        console.error('Error adding todo:', error);
    }
}
async function updateState(id) {
    const newState = await updateFromServer(id);
    const text = document.getElementById(`text${id}`);
    if (newState) {
        items--;
        text.className = 'completed';
    }
    else {
        items++;
        text.className = 'uncompleted';
    }
    updateItems();
}
async function deleteTodo(id) {
    const todoState = await fetchTodoById(id);
    if (!todoState) {
        items--;
        updateItems();
    }
    await deleteFromServer(id);
    var todo = document.getElementById(id);
    if (todo) {
        todo.remove();
    } else {
        console.error('Element not found.');
    }
}

document.getElementById('Clear-completed').addEventListener('click', function () {
    const elements = todos.children;
    const childrenArray = Array.from(elements);
    childrenArray.forEach(child => {
        const checkbox = child.querySelector('input');
        if (checkbox.checked) {
            deleteTodo(child.id);
        }
    })
})
AllButton.addEventListener('click', function () {
    const elements = todos.children;
    const childrenArray = Array.from(elements);
    childrenArray.forEach(child => {
        child.style.display = 'flex';
    });
    AllButton.className = 'active';
    ActiveButton.className = 'unactive';
    CompletedButton.className = 'unactive';
});

ActiveButton.addEventListener('click', function () {
    const elements = todos.children;
    const childrenArray = Array.from(elements);
    childrenArray.forEach(child => {
        const checkbox = child.querySelector('input');
        if (checkbox.checked) {
            child.style.display = 'none';
        } else {
            child.style.display = 'flex';
        }
    });
    ActiveButton.className = 'active';
    AllButton.className = 'unactive';
    CompletedButton.className = 'unactive';
});

CompletedButton.addEventListener('click', function () {
    const elements = todos.children;
    const childrenArray = Array.from(elements);
    childrenArray.forEach(child => {
        const checkbox = child.querySelector('input');
        if (!checkbox.checked) {
            child.style.display = 'none';
        } else {
            child.style.display = 'flex';
        }
    });
    CompletedButton.className = 'active';
    AllButton.className = 'unactive';
    ActiveButton.className = 'unactive';
});


// Event listener for "Enter" key press
document.addEventListener('keydown', async function (event) {
    if (event.key === 'Enter') { // Check if the "Enter" key was pressed
        const todoText = todoInputText.value;
        const todoStatus = todoInputStatus.checked;
        const index = await postTodo(todoText, todoStatus);
        await addTodo(todoText, todoStatus, index); // Add new todo asynchronousl
        todoInputText.value = '';
    }
});
fetchTodos();