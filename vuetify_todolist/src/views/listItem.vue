<template>
  <span>
  <v-list-item v-if="!item.isEditable">
    <v-btn @click="editTodo(item)" class="mr-2">
      <v-icon :color="'yellow darken-3'">mdi-lead-pencil</v-icon>
    </v-btn>

    <v-btn @click="showModal" class="mr-2">
      <v-icon :color="'red'">mdi-trash-can-outline</v-icon>
    </v-btn>

    <v-list-item-content>
      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>

  <v-list-item v-else>

    <v-btn
      @click="cancel(item)"
      class="mr-2"
    >
      <v-icon :color="'red'">mdi-cancel</v-icon>
    </v-btn>

    <v-btn
      @click="changeTodo(item)"
      class="mr-2"
    >
      <v-icon :color="'green'">mdi-check-bold</v-icon>
    </v-btn>

    <v-text-field
      v-model="editTodoText"
      @keydown.enter="changeTodo(item)"
    ></v-text-field>
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

    </span>
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
            }
        },
        methods: {
            removeTodo(item) {
                this.needShowModal = false;
                store.commit("removeItem", item.id);
            },
            editTodo: function (item) {
                this.editTodoText = item.text;
                item.isEditable = true;
            },
            cancel: function (item) {
                item.editTodoText = item.text;
                item.isEditable = false;
            },
            changeTodo: function (item) {
                if (item.editTodoText === "") {
                    this.showModal(item);
                    return;
                }
                var changedItem = {
                    id: item.id,
                    text: this.editTodoText
                };
                store.commit("changeItem", changedItem);
                item.isEditable = false;
            },
            showModal: function (item) {
                this.needShowModal = true;
            }
        }
    }
</script>

<style scoped>

</style>
