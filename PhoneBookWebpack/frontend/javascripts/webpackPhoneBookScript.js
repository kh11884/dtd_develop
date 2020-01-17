import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/style.css";

import $ from "jquery";
import Vue from "vue";
import "bootstrap";
import PhoneBookServices from "./phoneBookServices";

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
    created() {
        this.loadContacts();
    },
    methods: {
        addContact() {
            this.isInvalidFirstName = this.newFirstName === "";
            this.isInvalidLastName = this.newLastName === "";
            this.isInvalidPhoneNumber = this.newPhoneNumber === "";
            if (this.isInvalidFirstName || this.isInvalidLastName || this.isInvalidPhoneNumber) {
                return;
            }

            var newPhoneNumber = this.newPhoneNumber;
            this.haveNumber = this.contacts.some(c => {
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

            PhoneBookServices.addContact(contact).done(responce => {
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
        loadContacts() {
            var self = this;
            this.saveMustBeDeletedIds();

            PhoneBookServices.getContacts(this.term).done(contacts => {
                self.contacts = contacts;
                self.markSelected();
                self.checkWasAllMarked();
            });
        },
        deleteContact(contact) {
            var self = this;
            contact.needShowModal = false;

            PhoneBookServices.deleteContact(contact).done(responce => {
                if (!responce.success) {
                    alert(responce.message);
                    return;
                }
                self.loadContacts();
            });
        },
        deleteCheckedContacts() {
            var self = this;
            self.needShowModalForDeleteChecked = false;
            self.checkAll = false;

            this.saveMustBeDeletedIds();

            PhoneBookServices.deleteCheckedContacts(this.checkedContacts).done(responce => {
                if (!responce.success) {
                    alert(responce.message);
                    return;
                }
                self.loadContacts();
            });
        },
        checkWasAllMarked() {
            if (this.contacts.length === 0) {
                this.checkAll = false;
            } else {
                this.checkAll = this.contacts.every(contact => {
                    return contact.mustBeDeleted === true;
                });
            }
        },
        checkedAllContacts() {
            var self = this;
            this.contacts.map(contact => {
                contact.mustBeDeleted = self.checkAll;
            });

        }, search() {
            this.loadContacts();
        },
        cancelSearch() {
            this.term = "";
            this.loadContacts();
        },
        showModal(item) {
            item.needShowModal = true;
        },
        hideModal(item) {
            item.needShowModal = false;
        },
        showDialogToCheckedDelete() {
            if (this.contacts.every(c => {
                return c.mustBeDeleted === false;
            })) {
                return;
            }
            this.needShowModalForDeleteChecked = true;
        },
        hideDialogToCheckedDelete() {
            this.needShowModalForDeleteChecked = false;
        },
        markSelected() {
            var self = this;
            self.contacts.forEach(contact => {
                contact.mustBeDeleted = self.checkedContacts.indexOf(contact.id) > -1;
            });
        },
        saveMustBeDeletedIds() {
            this.checkedContacts = this.contacts.filter(contact => {
                return contact.mustBeDeleted;
            }).map(contact => {
                return contact.id;
            });
        }
    }
});

