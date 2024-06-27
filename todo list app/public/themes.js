const DarkThemeColors = {
    backgroundColor: 'hsl(235, 21%, 11%)',
    containerColor: 'hsl(235, 24%, 19%)',
    textColor: 'hsl(234, 39%, 85%)',
    buttonsHoverColor: 'hsl(236, 33%, 92%)',
    bordersColor: 'hsl(234, 11%, 52%)',
    buttonsColor: 'hsl(233, 14%, 35%)',
    completedColor: 'hsl(237, 14%, 26%)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>'
};
const WhiteThemeColors = {
    backgroundColor: 'hsl(236, 33%, 92%)',
    containerColor: 'hsl(0, 0%, 98%)',
    textColor: 'black',
    buttonsHoverColor: 'black',
    bordersColor: 'hsl(233, 11%, 84%)',
    buttonsColor: 'hsl(236, 9%, 61%)',
    completedColor: 'hsl(235, 19%, 35%)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>'
};
const activeColor = 'hsl(220, 98%, 61%)';
export let currentTheme = DarkThemeColors;
const ThemeButton = document.getElementById('theme-button');
const body = document.body;
const inputBar = document.getElementById('input-bar');
const inputText = document.getElementById('todo-input-text');
const todosConatiner = document.getElementById('todos-container');
const menu = document.getElementById('menu');
export function changeTheme(theme) {
    ThemeButton.innerHTML = theme.icon;
    body.style.backgroundColor = theme.backgroundColor;
    inputBar.style.backgroundColor = theme.containerColor;
    inputText.style.color = theme.textColor;
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        circle.style.borderColor = theme.bordersColor;
    });
    todosConatiner.style.backgroundColor = theme.containerColor;
    const todoConatiner = document.querySelectorAll('.todo');
    todoConatiner.forEach(todo => {
        todo.style.borderColor = theme.bordersColor;
    })
    const uncompletedTodos = document.querySelectorAll('.uncompleted');
    uncompletedTodos.forEach(todo => {
        todo.style.color = theme.textColor;
    })
    const completedTodos = document.querySelectorAll('.completed');
    completedTodos.forEach(todo => {
        todo.style.color = theme.completedColor;
    });
    menu.style.borderColor = theme.bordersColor;
    const itemsLeft = document.querySelector('.left');
    itemsLeft.style.color = theme.buttonsColor;

    const buttons = document.querySelectorAll('.unactive,.right');
    buttons.forEach(element => {
        element.style.color = theme.buttonsColor;
        element.addEventListener('mouseenter', function () {
            element.style.color = theme.buttonsHoverColor;
        });
        element.addEventListener('mouseleave', function () {
            element.style.color = theme.buttonsColor;
        });

    });
    const activeButton = document.querySelector('.active');
    activeButton.style.color = activeColor;
    activeButton.addEventListener('mouseenter', function () {
        activeButton.style.color = activeColor;
    });
    activeButton.addEventListener('mouseleave', function () {
        activeButton.style.color = activeColor;
    });
}

ThemeButton.addEventListener('click', function () {
    if (currentTheme == DarkThemeColors) {
        currentTheme = WhiteThemeColors;
        changeTheme(WhiteThemeColors);
    } else {
        currentTheme = DarkThemeColors;
        changeTheme(DarkThemeColors);
    }
});
