function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

function get(url, data) {
    return $.get({
        url: url,
        data: data
    });
}

function saveMustBeDeletedIds(self) {
    self.checkedContacts = self.filteredContacts.filter(function (contact) {
        return contact.mustBeDeleted;
    }).map(function (contact) {
        return contact.id;
    });
}

function markSelected(self) {
    self.filteredContacts.forEach(function (contact) {
        contact.mustBeDeleted = self.checkedContacts.includes(contact.id);
    });
}

new Vue({
    el: "#app",
    data: {
        contacts: [],
        filteredContacts: [],
        checkedContacts: [],
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
            saveMustBeDeletedIds(this);
            var self = this;

            get("/getContacts").done(function (contacts) {
                self.contacts = contacts;
                self.showFilteredContacts();
                markSelected(self);
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

            saveMustBeDeletedIds(this);
            var data = {
                mustDeleted: this.checkedContacts
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
            if (this.filteredContacts.length === 0) {
                this.checkAll = false;
            } else {
                this.checkAll = this.filteredContacts.every(function (contact) {
                    return contact.mustBeDeleted === true;
                });
            }
        },
        checkedAllContacts: function () {
            var self = this;
            this.filteredContacts.forEach(function (contact) {
                contact.mustBeDeleted = self.checkAll;
            });
        },
        showFilteredContacts: function () {
            if (this.term === "") {
                this.filteredContacts = this.contacts;
            } else {
                var term = this.term.toUpperCase();
                this.filteredContacts = this.contacts.filter(function (c) {
                    return c.firstName.toUpperCase().includes(term) ||
                        c.lastName.toUpperCase().includes(term) ||
                        c.phoneNumber.toUpperCase().includes(term)
                });
            }
            this.checkWasAllMarked();
        },
        cancelSearch: function () {
            this.term = "";
            this.showFilteredContacts();
        },
        showModal: function (item) {
            item.needShowModal = true;
        },
        hideModal: function (item) {
            item.needShowModal = false;
        },
        showDialogToCheckedDelete: function () {
            if (this.filteredContacts.every(function (c) {
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

