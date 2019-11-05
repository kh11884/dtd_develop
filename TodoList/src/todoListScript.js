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

        var removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.style.marginRight = "6px";
        var removeIcon = document.createElement("img");
        removeIcon.src = "remove_icon.png";
        removeIcon.style.width = "16px";
        removeButton.appendChild(removeIcon);
        removeButton.addEventListener("click", function () {
            todoList.removeChild(taskElement);
        });

        var editButton = document.createElement("button");
        editButton.type = "button";
        var editIcon = document.createElement("img");
        editIcon.src = "editing_icon.png";
        editIcon.style.width = "16px";
        editButton.appendChild(editIcon);
        editButton.addEventListener("click", function () {
            editField.value = taskSpan.textContent;
            showEditField();
        });

        var editField = document.createElement("input");
        editField.type = "text";

        var OKButton = document.createElement("button");
        OKButton.type = "button";
        var OKIcon = document.createElement("img");
        OKIcon.src = "ok_icon.png";
        OKIcon.style.width = "16px";
        OKButton.appendChild(OKIcon);
        OKButton.addEventListener("click", function () {
            taskSpan.textContent = editField.value;
            showTaskField();
        });

        var cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.style.marginRight = "6px";
        var cancelIcon = document.createElement("img");
        cancelIcon.src = "cancel_icon.png";
        cancelIcon.style.width = "16px";
        cancelButton.appendChild(cancelIcon);
        cancelButton.addEventListener("click", showTaskField);

        editField.style.display = "none";
        OKButton.style.display = "none";
        cancelButton.style.display = "none";

        todoList.appendChild(taskElement);
        taskElement.appendChild(editButton);
        taskElement.appendChild(removeButton);
        taskElement.appendChild(taskSpan);
        taskElement.appendChild(OKButton);
        taskElement.appendChild(cancelButton);
        taskElement.appendChild(editField);

        newTask.value = "";

        function showEditField() {
            taskSpan.style.display = "none";
            editButton.style.display = "none";
            removeButton.style.display = "none";
            editField.style.display = "inline";
            OKButton.style.display = "inline";
            cancelButton.style.display = "inline";
        }

        function showTaskField() {
            taskSpan.style.display = "inline";
            editButton.style.display = "inline";
            removeButton.style.display = "inline";
            editField.style.display = "none";
            OKButton.style.display = "none";
            cancelButton.style.display = "none";
        }
    })
}
