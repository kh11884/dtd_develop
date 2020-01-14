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

new Vue({
    el: "#app",
    data: {
        contacts: [],
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

            post("/addContact", contact).done(function (response) {
                if (!response.success) {
                    alert(response.message);
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
            this.saveMustBeDeletedIds();

            var data = {
                term: self.term
            };

            get("/getContacts", data).done(function (contacts) {
                self.contacts = contacts;
                self.markSelected();
                self.checkWasAllMarked();
            });
        },
        deleteContact: function (contact) {
            var self = this;
            contact.needShowModal = false;

            post("/deleteContact", contact).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }
                self.loadContacts();
            });
        },
        deleteCheckedContacts: function () {
            var self = this;
            self.needShowModalForDeleteChecked = false;
            self.checkAll = false;

            this.saveMustBeDeletedIds();
            var data = {
                mustDeleted: self.checkedContacts
            };

            post("/deleteCheckedContacts", data).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }
                self.loadContacts();
            });
        },
        checkWasAllMarked: function () {
            if (this.contacts.length === 0) {
                this.checkAll = false;
            } else {
                this.checkAll = this.contacts.every(function (contact) {
                    return contact.mustBeDeleted === true;
                });
            }
        },
        checkedAllContacts: function () {
            var self = this;
            this.contacts.forEach(function (contact) {
                contact.mustBeDeleted = self.checkAll;
            });
        },
        search: function () {
            this.loadContacts();
        },
        cancelSearch: function () {
            this.term = "";
            this.loadContacts();
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
        },
        markSelected: function () {
            var self = this;
            self.contacts.forEach(function (contact) {
                contact.mustBeDeleted = self.checkedContacts.indexOf(contact.id) > -1;
            });
        },
        saveMustBeDeletedIds: function () {
            this.checkedContacts = this.contacts.filter(function (contact) {
                return contact.mustBeDeleted;
            }).map(function (contact) {
                return contact.id;
            });
        }
    }
});

