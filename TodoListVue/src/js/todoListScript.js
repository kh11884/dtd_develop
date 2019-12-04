new Vue({
    el: "#app",
    data: {
        items: [],
        newTodoText: "",
        isInvalid: false
    },
    methods: {
        addTodo: function () {

            if(this.newTodoText === ""){
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
            $("#confirmDialog").show();

            this.items = this.items.filter(function (x) {
                return x !== item;
            })
        }
    }
});