function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        async: false,
        contentType: "application/json"
    });
}

function get(url, data) {
    return $.get({
        url: url,
        data: data,
        async: false
    });
}

function getMustBeDeletedIds(self) {
    return self.contacts.filter(function (contact) {
        return contact.mustBeDeleted;
    }).map(function (contact) {
        return contact.id;
    });
}

function markSelected(self, mustBeSelected) {
    self.contacts.forEach(function (contact) {
        contact.mustBeDeleted = mustBeSelected.includes(contact.id);
    });

}

new Vue({
    el: "#app",
    data: {
        contacts: [],
        newFirstName: "",
        newLastName: "",
        newPhoneNumber: "",
        term: "",
        isInvalidFirstName: false,
        isInvalidLastName: false,
        isInvalidPhoneNumber: false,
        haveNumber: false,
        needShowModalForDeleteChecked: false,
        checkAll: false
    },
    // Тестовый вариант вычисляемого свойства.
    // computed: {
    //     filteredContacts: function () {
    //         var term = this.term.toUpperCase();
    //         return this.contacts.filter(function (c) {
    //             return c.firstName.toUpperCase().includes(term) ||
    //                 c.lastName.toUpperCase().includes(term) ||
    //                 c.phoneNumber.toUpperCase().includes(term)
    //         });
    //     }
    // },
    created: function () {
        this.loadContacts();
    },
    methods: {
        addContact: function () {
            this.isInvalidFirstName = this.newFirstName === "";
            this.isInvalidLastName = this.newLastName === "";
            this.isInvalidPhoneNumber = this.newPhoneNumber === "";
            if (this.isInvalidFirstName || this.isInvalidLastName || this.isInvalidPhoneNumber) {
                return;
            }

            var newPhoneNumber = this.newPhoneNumber;
            this.haveNumber = this.contacts.some(function (c) {
                return c.phoneNumber === newPhoneNumber;
            });
            if (this.haveNumber) {
                return;
            }

            var contact = {
                firstName: this.newFirstName,
                lastName: this.newLastName,
                phoneNumber: this.newPhoneNumber,
                mustBeDeleted: false,
                needShowModal: false
            };

            var self = this;

            post("/addContact", contact).done(function (responce) {
                if (!responce.success) {
                    alert(responce.message);
                    return;
                }
                self.loadContacts();
            });

            this.newFirstName = "";
            this.newLastName = "";
            this.newPhoneNumber = "";
        },
        loadContacts: function () {
            var self = this;

            var data = {
                term: this.term
            };

            get("/getContacts", data).done(function (contacts) {
                self.contacts = contacts;
            });
        },
        deleteContact: function (contact) {
            var self = this;
            contact.needShowModal = false;

            post("/deleteContact", contact).done(function (responce) {
                if (!responce.success) {
                    alert(responce.message);
                    return;
                }
                self.loadContacts();
            });
        },
        deleteCheckedContacts: function () {
            var self = this;
            self.needShowModalForDeleteChecked = false;
            self.checkAll = false;

            var mustDeleted = getMustBeDeletedIds(this);

            var data = {
                mustDeleted: mustDeleted
            };

            post("/deleteCheckedContacts", data).done(function (responce) {
                if (!responce.success) {
                    alert(responce.message);
                    return;
                }
                self.loadContacts();
            });
        },
        checkWasAllMarked: function () {
            this.checkAll = this.contacts.every(function (contact) {
                return contact.mustBeDeleted;
            });
        },
        checkedAllContacts: function () {
            var self = this;
            this.contacts.forEach(function (contact) {
                contact.mustBeDeleted = self.checkAll;
            });
        },
        search: function () {
            var mustDeleted = getMustBeDeletedIds(this);

            this.loadContacts();

            markSelected(this, mustDeleted);
            this.checkWasAllMarked();
        },
        cancelSearch: function () {
            var mustDeleted = getMustBeDeletedIds(this);

            this.term = "";
            this.loadContacts();

            markSelected(this, mustDeleted);
            this.checkWasAllMarked();
        },
        showModal: function (item) {
            item.needShowModal = true;
        },
        hideModal: function (item) {
            item.needShowModal = false;
        },
        showDialogToCheckedDelete: function () {
            if (this.contacts.every(function (c) {
                return c.mustBeDeleted === false;
            })) {
                return;
            }
            this.needShowModalForDeleteChecked = true;
        },
        hideDialogToCheckedDelete: function () {
            this.needShowModalForDeleteChecked = false;
        }
    }
});

