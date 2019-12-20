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
        haveNumber: false,
        itemId: 1
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
            this.haveNumber = this.items.some(function (item) {
                return item.phoneNumber === newPhoneNumber;
            });
            if (this.haveNumber) {
                return;
            }

            this.items.push({
                firstName: this.newFirstName,
                lastName: this.newLastName,
                phoneNumber: this.newPhoneNumber,
                needShowModal: false,
                id: this.itemId
            });
            this.newFirstName = "";
            this.newLastName = "";
            this.newPhoneNumber = "";
            this.itemId++;
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

