new Vue({
    el: "#app",
    data: {
        items: [],
        newTodoText: "",
        isInvalid: false,
    },
    methods: {
        addTodo: function () {
            if (this.newTodoText === "") {
                this.isInvalid = true;
                return;
            }
            this.isInvalid = false;

            this.items.push({
                text: this.newTodoText,
                editTodoText: "",
                isEditable: false,
                needShowModal: false
            });
            this.newTodoText = "";
        },
        removeTodo: function (item) {
            item.needShowModal = false;
            this.items = this.items.filter(function (x) {
                return x !== item;
            });
        },
        showModal: function (item) {
            item.needShowModal = true;
        },
        hideModal: function (item) {
            item.isEditable = false;
            item.needShowModal = false;
        },
        editTodo: function (item) {
            item.editTodoText = item.text;
            item.isEditable = true;
        },
        changeTodo: function (item) {
            if (item.editTodoText === "") {
                this.showModal(item);
                return;
            }
            item.text = item.editTodoText;
            item.isEditable = false;
        }
    }
});

