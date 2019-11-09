function showEditField() {
    taskSpan.style.display = "none";
    editButton.style.display = "none";
    removeButton.style.display = "none";
    editField.style.display = "inline";
    okButton.style.display = "inline";
    cancelButton.style.display = "inline";
}

function showTaskField() {
    taskSpan.style.display = "inline";
    editButton.style.display = "inline";
    removeButton.style.display = "inline";
    editField.style.display = "none";
    okButton.style.display = "none";
    cancelButton.style.display = "none";
}

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var todoList = document.getElementById("todo_list");
    var newTask = document.getElementById("new_task");
    var addButton = document.getElementById("add_button");

    addButton.addEventListener("click", function () {
        var newTaskText = newTask.value;
        if (newTaskText === "") {
            return;
        }

        var taskElement = document.createElement("li");

        var taskSpan = document.createElement("span");
        taskSpan.textContent = newTaskText;
        taskSpan.className = "task_field";

        var removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "small_button";
        var removeIcon = document.createElement("img");
        removeIcon.src = "icons/remove_icon.png";
        removeIcon.className = "small_button_icon";
        removeButton.appendChild(removeIcon);
        removeButton.addEventListener("click", function () {
            todoList.removeChild(taskElement);
        });

        var editButton = document.createElement("button",);
        editButton.type = "button";
        editButton.className = "small_button";
        var editIcon = document.createElement("img");
        editIcon.src = "icons/editing_icon.png";
        editIcon.className = "small_button_icon";
        editButton.appendChild(editIcon);
        editButton.addEventListener("click", function () {
            editField.value = taskSpan.textContent;
            showEditField();
        });

        var editField = document.createElement("input");
        editField.type = "text";
        editField.className = "task_field";

        var okButton = document.createElement("button");
        okButton.type = "button";
        okButton.className = "small_button";
        var okIcon = document.createElement("img");
        okIcon.src = "icons/ok_icon.png";
        okIcon.className = "small_button_icon";
        okButton.appendChild(okIcon);
        okButton.addEventListener("click", function () {
            taskSpan.textContent = editField.value;
            showTaskField();
        });

        var cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.className = "small_button";
        var cancelIcon = document.createElement("img");
        cancelIcon.src = "icons/cancel_icon.png";
        cancelIcon.className = "small_button_icon";
        cancelButton.appendChild(cancelIcon);
        cancelButton.addEventListener("click", showTaskField);

        editField.style.display = "none";
        okButton.style.display = "none";
        cancelButton.style.display = "none";

        todoList.appendChild(taskElement);
        taskElement.appendChild(editButton);
        taskElement.appendChild(removeButton);
        taskElement.appendChild(taskSpan);
        taskElement.appendChild(okButton);
        taskElement.appendChild(cancelButton);
        taskElement.appendChild(editField);

        newTask.value = "";
    })
}
