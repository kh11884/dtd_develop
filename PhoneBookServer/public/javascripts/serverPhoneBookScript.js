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
        haveNumber: false
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
            // this.items.forEach(function (item) {
            //     if (item.phoneNumber === newPhoneNumber) {
            //         haveNumber = true;
            //     }
            // });
            this.haveNumber = haveNumber;
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
        search: function(){
            this.loadContacts();
        },
        showModal: function (item) {
            item.needShowModal = true;
        },
        hideModal: function (item) {
            item.needShowModal = false;
        }
    }
});

