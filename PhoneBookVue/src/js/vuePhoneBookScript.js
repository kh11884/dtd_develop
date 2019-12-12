new Vue({
    el: "#app",
    data: {
        items: [],
        newFirstName: "",
        newLastName: "",
        newPhoneNumber: "",
        isInvalidFirstName: false,
        isInvalidLastName: false,
        isInvalidPhoneNumber: false,
        haveNumber: false
    },
    methods: {
        addItem: function () {
            this.isInvalidFirstName = this.newFirstName === "";
            this.isInvalidLastName = this.newLastName === "";
            this.isInvalidPhoneNumber = this.newPhoneNumber === "";
            if (this.isInvalidFirstName || this.isInvalidLastName || this.isInvalidPhoneNumber) {
                return;
            }

            var newPhoneNumber = this.newPhoneNumber;
            var haveNumber = false;
            this.items.forEach(function (item) {
                if (item.phoneNumber === newPhoneNumber) {
                    haveNumber = true;
                }
            });
            this.haveNumber = haveNumber;
            if (this.haveNumber) {
                return;
            }

            this.items.push({
                firstName: this.newFirstName,
                lastName: this.newLastName,
                phoneNumber: this.newPhoneNumber,
                needShowModal: false
            });
            this.newFirstName = "";
            this.newLastName = "";
            this.newPhoneNumber = "";
        },
        removeItem: function (item) {
            item.needShowModal = false;
            this.items = this.items.filter(function (x) {
                return x !== item;
            });
        },
        showModal: function (item) {
            item.needShowModal = true;
        },
        hideModal: function (item) {
            item.needShowModal = false;
        }
    }
});

