<template>
  <v-spacer>
    <v-list-item v-if="!isEditable">
      <v-row>
        <v-spacer class="min-vh-100">{{ item.text }}</v-spacer>

        <v-btn @click="editTodo(item)" class="mr-2">
          <v-icon :color="'yellow darken-3'">mdi-lead-pencil</v-icon>
        </v-btn>

        <v-btn @click="showModal" class="mr-2">
          <v-icon :color="'red'">mdi-trash-can-outline</v-icon>
        </v-btn>

      </v-row>
    </v-list-item>

    <v-list-item v-else>
      <v-text-field
        v-model="editTodoText"
        @keydown.enter="changeTodo(item)"
        @keydown.esc="isEditable=false"
      ></v-text-field>

      <v-btn
        @click="cancel(item)"
        class="ml-2"
      >
        <v-icon :color="'red'">mdi-cancel</v-icon>
      </v-btn>

      <v-btn
        @click="changeTodo(item)"
        class="ml-2"
      >
        <v-icon :color="'green'">mdi-check-bold</v-icon>
      </v-btn>

    </v-list-item>
    <v-dialog
      v-model="needShowModal"
      max-width="320"
    >
      <v-card>
        <v-card-title class="title">Подтвердите удаление<br/>элемента</v-card-title>

        <v-card-text>
          Вы действительно хотите удалить элемент?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="needShowModal = false"
          >
            Отмена
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="removeTodo(item)"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-spacer>
</template>

<script>
    import store from "../store/index";

    export default {
        name: "listItem",
        props: {
            item: {}
        },
        data() {
            return {
                needShowModal: false,
                isEditable: false,
                editTodoText: ""
            };
        },
        methods: {
            removeTodo(item) {
                this.needShowModal = false;
                store.commit("removeItem", item.id);
            },
            editTodo: function (item) {
                this.editTodoText = item.text;
                this.isEditable = true;
            },
            cancel: function (item) {
                item.editTodoText = item.text;
                this.isEditable = false;
            },
            changeTodo: function (item) {
                if (this.editTodoText === "") {
                    this.showModal(item);
                    return;
                }
                var changedItem = {
                    id: item.id,
                    text: this.editTodoText
                };
                store.commit("changeItem", changedItem);
                this.isEditable = false;
            },
            showModal: function () {
                this.needShowModal = true;
            }
        }
    };
</script>

<style scoped>

</style>
