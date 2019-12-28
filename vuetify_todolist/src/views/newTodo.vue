<template>
<!--  <v-container class="v-size&#45;&#45;small">-->
<!--    <v-col-->
<!--      justify="center"-->
<!--      no-gutters>-->
<!--      <v-row-->
<!--      align="center">-->
          <v-btn @click="addTodo" class="mr-3">Добавить</v-btn>
          <v-text-field
            label="Новая задача"
            v-model="newTodoText"
            @keydown.enter="addTodo"
          ></v-text-field>
<!--      </v-row>-->
<!--    </v-col>-->
<!--  </v-container>-->
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
