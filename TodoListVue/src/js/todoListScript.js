new Vue({
    el: "#app",
    data: {
        items: [],
        newTodoText: "",
        editTodoText: "",
        isInvalid: false,
        showModal: false,
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
            });
            this.newTodoText = "";
        },
        removeTodo: function (item) {
            this.items = this.items.filter(function (x) {
                return x !== item;
            })
        },
        showModal: function (item) {
            this.showModal = true;
        },
        unShowModal: function () {
            this.showModal = false;
        },
        editTodo: function (item) {
            item.editTodoText = item.text;
            item.isEditable = true;
        },
        changeTodo: function (item) {
            item.text = item.editTodoText;
            item.isEditable = false;
        }
    }
});

Vue.component('modal', {
    template: '#modal-template'
});

