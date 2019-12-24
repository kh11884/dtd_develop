import $ from "jquery";
import Vue from "vue";
import "bootstrap";
import phoneBookServices from "./phoneBookServices";

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

            phoneBookServices.addContact(contact).done(function (responce) {
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

            phoneBookServices.getContacts(this.term).done(function (contacts) {
                self.contacts = contacts;
            });
        },
        deleteContact: function (contact) {
            var self = this;
            contact.needShowModal = false;

            phoneBookServices.deleteContact(contact).done(function (responce) {
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

            var mustDeleted = self.contacts.filter(function (contact) {
                return contact.mustBeDeleted;
            }).map(function (contact) {
                return contact.id;
            });

            phoneBookServices.deleteCheckedContacts(mustDeleted).done(function (responce) {
                if (!responce.success) {
                    alert(responce.message);
                    return;
                }
                self.loadContacts();
            });
        },
        checkedAllContacts: function () {
            var self = this;
            this.contacts.map(function (contact) {
                contact.mustBeDeleted = self.checkAll;
            });

        },
        search: function () {
            this.loadContacts();
            this.checkAll = false;
        },
        cancelSearch: function () {
            this.term = "";
            this.loadContacts();
            this.checkAll = false;
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

