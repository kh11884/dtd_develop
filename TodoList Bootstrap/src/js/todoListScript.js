$(function () {
    function clearNewTaskField() {
        newTask.val("");
    }

    function addTask() {
        function showEditField() {
            taskElement.addClass('list-group-item-warning');
            taskSet.hide();
            editTaskSet.show();
        }

        function showTaskField() {
            taskSet.show();
            editTaskSet.hide();
            taskElement.removeClass('list-group-item-warning');
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
            $("#confirm-dialog-cancel-button").click(function () {
                $("#confirm-dialog-yes-button").unbind('click');
            });

        }

        var newTaskText = newTask.val().trim();
        if (newTaskText === "") {
            return;
        }

        var taskSpan = $("<span>");
        taskSpan.text(newTaskText);
        taskSpan.addClass("task_field");

        var removeButton = $("<button type='button' title='Удалить' class='btn btn-outline-danger'>");
        var removeIcon = $("<img alt='del' src='icons/remove_icon.png' class='small_button_icon'>");
        removeButton.append(removeIcon);
        removeButton.click(function () {
            showConfirmDialog();
        });

        var editButton = $("<button type='button' title='Редактировать' class='btn btn-outline-warning'>");
        var editIcon = $("<img alt='edit' src='icons/editing_icon.png' class='small_button_icon'>");
        editButton.append(editIcon);
        editButton.click(function () {
            editField.val(taskSpan.text());
            showEditField();
        });

        var editField = $("<input type='text' class='form-control'>");
        editField.keydown(function (event) {
            if (event.keyCode === 13) {
                changeTaskName();
            } else if (event.keyCode === 27) {
                showTaskField();
            }
        });

        var okButton = $("<button type='button' title='Сохранить' class='btn btn-outline-success'>");
        var okIcon = $("<img alt='ok' src='icons/ok_icon.png' class='small_button_icon'>");
        okButton.append(okIcon);
        okButton.click(changeTaskName);

        var cancelButton = $("<button type='button' title='Отмена' class='btn btn-outline-danger'>");
        var cancelIcon = $("<img alt='cancel' src='icons/cancel_icon.png' class='small_button_icon'>");
        cancelButton.append(cancelIcon);
        cancelButton.click(showTaskField);

        var taskSet = $()
            .add(editButton)
            .add(removeButton)
            .add(taskSpan);

        var editButtonsGroup = $('<span class="input-group-btn">')
            .append(okButton)
            .append(cancelButton);

        var editTaskSet = $('<div class="input-group">')
            .append(editButtonsGroup)
            .append(editField);
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
