new Vue({
    el: "#app",
    data: {
        items: [],
        newFirstName: "",
        newLastName: "",
        newPhoneNumber: "",
        isInvalid: false,
    },
    methods: {
        addItem: function () {

            if (this.newFirstName === "") {
                this.isInvalid = true;
                return;
            }
            this.isInvalid = false;

            this.items.push({
                firstName: this.newFirstName,
                lastName: this.newLastName,
                phoneNumber: this.newPhoneNumber,
                isEditable: false,
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
        unShowModal: function (item) {
            item.isEditable = false;
            item.needShowModal = false;
        },
        editTodo: function (item) {
            item.editTodoText = item.text;
            item.isEditable = true;
        },
        changeTodo: function (item) {
            if(item.editTodoText === ""){
                this.showModal(item);
                return;
            }
            item.text = item.editTodoText;
            item.isEditable = false;
        }
    }
});