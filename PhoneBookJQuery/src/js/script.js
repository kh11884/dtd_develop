$(function () {
    function clearNewEntryFields() {
        newFirstName.val("");
        newLastName.val("");
        newPhoneNumber.val("");
    }

    function addNewEntry() {
        var newFirstNameText = newFirstName.val().trim();
        var newLastNameText = newLastName.val().trim();
        var newPhoneNumberText = newPhoneNumber.val().trim();

        var isValid = true;
        if (newFirstNameText !== "") {
            newFirstName.removeClass("border-danger");
            newFirstName.attr("placeholder", "Имя");
            newFirstName.removeClass("red_placeholder");
        }
        if (newLastNameText !== "") {
            newLastName.removeClass("border-danger");
            newLastName.attr("placeholder", "Фамилия");
            newLastName.removeClass("red_placeholder");
        }
        if (newPhoneNumberText !== "") {
            newPhoneNumber.removeClass("border-danger");
            newPhoneNumber.attr("placeholder", "Номер телефона");
            newPhoneNumber.removeClass("red_placeholder");
        }
        if (newFirstNameText === "") {
            newFirstName.addClass("border-danger");
            newFirstName.attr("placeholder", "Введите имя");
            newFirstName.addClass("red_placeholder");
            isValid = false;
        }
        if (newLastNameText === "") {
            newLastName.addClass("border-danger");
            newLastName.attr("placeholder", "Введите фамилию");
            newLastName.addClass("red_placeholder");
            isValid = false;
        }
        if (newPhoneNumberText === "") {
            newPhoneNumber.addClass("border-danger");
            newPhoneNumber.attr("placeholder", "Укажите номер телефона");
            newPhoneNumber.addClass("red_placeholder");
            isValid = false;
        }
        if (!isValid) {
            return;
        }

        var rowNumber = $("<td>");
        var firstName = $("<td>").text(newFirstNameText);
        var lastName = $("<td>").text(newLastNameText);
        var phoneNumber = $("<td>").text(newPhoneNumberText);
        var entryCheckBox = $("<td>")
            .append($("<div class='form-check'>")
                .append($("<label class='form-check-label align-middle'>")
                    .append($("<input id='checkbox_all' type='checkbox' class='form-check-input align-middle'>"))));
        var removeButton = $("<td>")
            .append($("<button type='button' title='удалить' class='btn btn-outline-danger'>")
                .append($("<img alt='del' src='icons/remove_icon.png' class='small_button_icon'>"))
                .click(function () {
                    confirmDialog.modal('show');
                }));

        var confirmDialog = $("<div class=\"modal fade\" id=\"confirm-dialog\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"aria-hidden=\"true\">")
            .append($("<div class=\"modal-dialog\" role=\"document\">")
                .append($("<div class=\"modal-content\">")
                    .append($("<div class=\"modal-header\">")
                        .append($("<h5 class=\"modal-title\" id=\"exampleModalLabel\">Удаление элемента</h5>"))
                        .append($("<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">")
                            .append($("<span aria-hidden=\"true\">&times;</span>"))))
                    .append($("<div class=\"modal-body\">").text("Вы действительно хотите удалить элемент?"))
                    .append($("<div class=\"modal-footer\">")
                        .append($("<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">").text("Отмена"))
                        .append($("<button type=\"button\" id=\"confirm-dialog-yes-button\" class=\"btn btn-primary\" data-dismiss=\"modal\">").text("Да")
                            .click(function () {
                                entryRow.remove();
                                $('#phoneBook_table_body tr').each(function (i) {
                                    $(this).find('td:first').text(i + 1);
                                });
                            })
                        )
                    )
                )
            );

        var entryRow = $("<tr>")
            .append(rowNumber)
            .append(firstName)
            .append(lastName)
            .append(phoneNumber)
            .append(entryCheckBox)
            .append(removeButton);

        phoneBookTableBody.append(entryRow);
        rowNumber.text(entryRow.index() + 1);
        clearNewEntryFields();
    }

    var phoneBookTableBody = $("#phoneBook_table_body");
    var newFirstName = $("#first_name");
    var newLastName = $("#last_name");
    var newPhoneNumber = $("#phone_number");
    var addButton = $("#add_button");

    addButton.click(addNewEntry);
});

