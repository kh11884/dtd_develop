<template>
  <v-spacer>
    <v-row justify="center" no-gutters>
      <v-col sm="8">
        <v-row align="center" no-gutters>
          <v-text-field
            label="Новая задача"
            v-model="newTodoText"
            @keyup.enter="addTodo"
            @keydown.esc="newTodoText=''"
            :error-messages="errorMessage"
          ></v-text-field>

          <v-btn @click="addTodo" class="ml-2">Добавить</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-spacer>
</template>

<script>
    import store from "../store/index";

    export default {
        name: "newTodo",
        data() {
            return {
                newTodoText: "",
                isInvalid: false,
                errorMessage: ""
            };
        },
        methods: {
            addTodo() {
                this.validate();
                if (this.isInvalid) {
                    return;
                }

                var newItem = {
                    text: this.newTodoText,
                    editTodoText: "",
                    isEditable: false,
                    needShowModal: false
                };
                store.commit("addItem", newItem);
                this.newTodoText = "";
            },
            validate() {
                if (this.newTodoText === "") {
                    this.isInvalid = true;
                    this.errorMessage = "Заполните поле";
                    return;
                }
                this.isInvalid = false;
                this.errorMessage = "";
            }
        }
    };
</script>

<style scoped>

</style>
