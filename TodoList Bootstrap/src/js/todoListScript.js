$(function () {
    function clearNewTaskField() {
        newTask.val("");
    }

    function addTask() {
        function showEditField() {
            taskElement.attr('class', 'list-group-item list-group-item-action list-group-item-dark');
            taskSet.hide();
            editTaskSet.show();
        }

        function showTaskField() {
            taskSet.show();
            editTaskSet.hide();
            taskElement.attr('class', 'list-group-item list-group-item-action');
        }

        function changeTaskName() {
            var newTaskName = editField.val().trim();
            if (newTaskName === "") {
                showConfirmDialog();
            } else {
                taskSpan.text(newTaskName);
                showTaskField();
            }
        }

        function showConfirmDialog() {
            $("#dialog-text").show();
            confirmDialog.modal('show');
            $("#confirm-dialog-yes-button").click(function () {
                taskElement.remove();
            });
        }

        var newTaskText = newTask.val().trim();
        if (newTaskText === "") {
            return;
        }

        var taskSpan = $("<span>");
        taskSpan.text(newTaskText);
        taskSpan.addClass("task_field");

        var removeButton = $("<button type='button' class='small_button'>");
        var removeIcon = $("<img alt='del' src='icons/remove_icon.png' class='small_button_icon'>");
        removeButton.append(removeIcon);
        removeButton.click(function () {
            showConfirmDialog();
        });

        var editButton = $("<button type='button' class='small_button'>");
        var editIcon = $("<img alt='edit' src='icons/editing_icon.png' class='small_button_icon'>");
        editButton.append(editIcon);
        editButton.click(function () {
            editField.val(taskSpan.text());
            showEditField();
        });

        var editField = $("<input type='text' class='task_field' style='width: 89%'>");
        editField.keydown(function (event) {
            if (event.keyCode === 13) {
                changeTaskName();
            } else if (event.keyCode === 27) {
                showTaskField();
            }
        });

        var okButton = $("<button type='button' class='small_button'>");
        var okIcon = $("<img alt='edit' src='icons/ok_icon.png' class='small_button_icon'>");
        okButton.append(okIcon);
        okButton.click(changeTaskName);

        var cancelButton = $("<button type='button' class='small_button'>");
        var cancelIcon = $("<img alt='edit' src='icons/cancel_icon.png' class='small_button_icon'>");
        cancelButton.append(cancelIcon);
        cancelButton.click(showTaskField);

        var taskSet = $()
            .add(editButton)
            .add(removeButton)
            .add(taskSpan);

        var editTaskSet = $()
            .add(okButton)
            .add(cancelButton)
            .add(editField);
        editTaskSet.hide();

        var taskElement = $("<li class='list-group-item  list-group-item-action'>");
        taskElement.append(taskSet)
            .append(editTaskSet);
        todoList.append(taskElement);

        clearNewTaskField();
    }

    var todoList = $("#todo_list");
    var newTask = $("#new_task");
    var addButton = $("#add_button");
    var confirmDialog = $("#confirm-dialog");


    newTask.keydown(function (event) {
        if (event.keyCode === 13) {
            addTask();
        } else if (event.keyCode === 27) {
            clearNewTaskField();
        }
    });

    addButton.click(addTask);
});
