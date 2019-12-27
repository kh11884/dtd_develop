<template>
  <v-container>
    <v-form>
      <v-row>
        <v-text-field
          label="Новая задача"
          v-model="newTodoText"
          @keydown.enter="addTodo"
        ></v-text-field>
        <v-btn @click="addTodo">Добавить</v-btn>
      </v-row>
    </v-form>
    <p>{{$store.state.items}}</p>
  </v-container>
</template>

<script>
    import store from "../store/index";

    export default {
        name: "newTodo",
        data () {
            return {
                items: [],
                newTodoText: "",
                isInvalid: false,
            }
        },
        methods: {
            addTodo () {
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
