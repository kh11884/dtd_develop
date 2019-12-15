function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

function get(url, data) {
    return $.get(url, data);
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
        mustBeDeleted: {
            needShowModal: false,
            iDs: []
        },
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
            var haveNumber = false;
            this.contacts.forEach(function (contact) {
                if (contact.phoneNumber === newPhoneNumber) {
                    haveNumber = true;
                }
            });
            this.haveNumber = haveNumber;
            if (this.haveNumber) {
                return;
            }

            var contact = {
                firstName: this.newFirstName,
                lastName: this.newLastName,
                phoneNumber: this.newPhoneNumber,
                // mustBeDeleted: false,
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
            self.mustBeDeleted.needShowModal = false;
            self.checkAll = false;

            post("/deleteCheckedContacts", self.mustBeDeleted).done(function (responce) {
                if (!responce.success) {
                    alert(responce.message);
                    return;
                }
                self.loadContacts();
                self.mustBeDeleted.iDs = [];
            });
        },
        checkedAllContacts: function () {
            var mustBeDeletedIDs = this.mustBeDeleted.iDs;

            if (this.checkAll) {
                this.contacts.forEach(function (contact) {
                    if (mustBeDeletedIDs.indexOf(contact.id) < 0) {
                        mustBeDeletedIDs.push(contact.id);
                    }
                });
            } else {
                this.mustBeDeleted.iDs = [];
            }
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
            if (this.mustBeDeleted.iDs.length === 0) {
                return;
            }
            this.mustBeDeleted.needShowModal = true;
        },
        hideDialogToCheckedDelete: function () {
            this.mustBeDeleted.needShowModal = false;
        }
    }
});

