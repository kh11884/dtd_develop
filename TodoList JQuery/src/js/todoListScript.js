$(function () {
    function clearNewTaskField() {
        newTask.val("");
    }

    function addTask() {
        function showEditField() {
            taskSet.hide();
            editTaskSet.show();
        }

        function showTaskField() {
            taskSet.show();
            editTaskSet.hide();
        }

        function changeTaskName() {
            taskSpan.text(editField.val());
            showTaskField();
        }

        function showConfirmDialog() {
            confirmDialog.dialog('option', 'buttons',
                [
                    {
                        text: "Да",
                        click: function () {
                            taskElement.remove();
                            $(this).dialog("close")
                        }
                    },
                    {
                        text: "Нет",
                        click: function () {
                            $(this).dialog("close")
                        }
                    }
                ]
            ).dialog("open");
        }

        var newTaskText = newTask.val();
        if (newTaskText === "") {
            return;
        }

        var taskSpan = $("<span>");
        taskSpan.text(newTaskText);
        taskSpan.addClass("task_field");

        var removeButton = $("<button type='button' class='small_button'>");
        var removeIcon = $("<img alt='del' src='../icons/remove_icon.png' class='small_button_icon'>");
        removeButton.append(removeIcon);
        removeButton.click(function () {
            showConfirmDialog();
        });

        var editButton = $("<button type='button' class='small_button'>");
        var editIcon = $("<img alt='edit' src='../icons/editing_icon.png' class='small_button_icon'>");
        editButton.append(editIcon);
        editButton.click(function () {
            editField.val(taskSpan.text());
            showEditField();
        });

        var editField = $("<input type='text' class='task_field'>");
        editField.keydown(function (event) {
            if (event.keyCode === 13) {
                changeTaskName();
            }
            if (event.keyCode === 27) {
                showTaskField();
            }
        });

        var okButton = $("<button type='button' class='small_button'>");
        var okIcon = $("<img alt='edit' src='../icons/ok_icon.png' class='small_button_icon'>");
        okButton.append(okIcon);
        okButton.click(changeTaskName);

        var cancelButton = $("<button type='button' class='small_button'>");
        var cancelIcon = $("<img alt='edit' src='../icons/cancel_icon.png' class='small_button_icon'>");
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

        var taskElement = $("<li>");
        taskElement.append(taskSet)
            .append(editTaskSet);
        todoList.append(taskElement);

        clearNewTaskField();
    }

    var todoList = $("#todo_list");
    var newTask = $("#new_task");
    var addButton = $("#add_button");

    var confirmDialog = $("#confirm-dialog").dialog({
        autoOpen: false,
        modal: true
    });

    newTask.keydown(function (event) {
        if (event.keyCode === 13) {
            addTask();
        }
        if (event.keyCode === 27) {
            clearNewTaskField();
        }
    });

    addButton.click(addTask);
});
