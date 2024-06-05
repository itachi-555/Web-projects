const expression = document.getElementById('expression');

// Function to scroll the h2 element to the bottom
function scrollToBottom() {
    expression.scrollTop = expression.scrollHeight;
}
// Function to add input to the expression
function add(params) {
    expression.innerText += params;
    scrollToBottom();
}

// Function to clear the expression
function AC() {
    expression.innerText = "";
}

// Function to delete the last character in the expression
function Delete() {
    if (expression.textContent == 'error' || expression.textContent == 'Infinity') {
        AC();
    }
    expression.innerText = expression.textContent.substring(0, expression.textContent.length - 1);
}

// Function to evaluate the expression
function result() {
    try {
        const result = eval(expression.textContent);
        if (isNaN(result)) {
            throw new Error("Invalid expression");
        }
        expression.innerText = result;
    } catch (error) {
        expression.innerText = "error";
    }
}

// Event listener for keyboard input
document.addEventListener('keydown', function (event) {
    // Check if the key pressed is a number or an operator
    if ((event.key >= '0' && event.key <= '9') || ['+', '-', '*', '/', '.', '%'].includes(event.key)) {
        add(event.key);
    } else if (event.key === 'Enter') { // If Enter is pressed, evaluate the expression
        result();
    } else if (event.key === 'Escape') { // If Escape is pressed, clear the expression
        AC();
    } else if (event.key === 'Backspace') { // If Backspace is pressed, delete the last character
        Delete();
    }
});
