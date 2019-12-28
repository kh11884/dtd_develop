<template>

  <v-row justify="center" no-gutters>
    <v-col sm="8">
      <v-row align="center" no-gutters>
        <v-text-field
          label="Новая задача"
          v-model="newTodoText"
          @keydown.enter="addTodo"
          @keydown.esc="newTodoText=''"
        ></v-text-field>

        <v-btn @click="addTodo" class="ml-2">Добавить</v-btn>
      </v-row>
    </v-col>
  </v-row>

</template>

<script>
    import store from "../store/index";

    export default {
        name: "newTodo",
        data() {
            return {
                items: [],
                newTodoText: "",
                isInvalid: false,
            }
        },
        methods: {
            addTodo() {
                if (this.newTodoText === "") {
                    this.isInvalid = true;
                    return;
                }
                this.isInvalid = false;

                var newItem = {
                    text: this.newTodoText,
                    editTodoText: "",
                    isEditable: false,
                    needShowModal: false
                };
                store.commit("addItem", newItem);
                this.newTodoText = "";
            }
        }
    }


</script>

<style scoped>

</style>
