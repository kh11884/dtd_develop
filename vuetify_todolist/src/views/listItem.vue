<template  >
  <v-list-item>
    <v-btn @click="editTodo(item)" class="mr-2">
      <v-icon :color="'yellow darken-3'">mdi-lead-pencil</v-icon>
    </v-btn>
    <v-btn @click="removeTodo(item)" class="mr-2">
      <v-icon :color="'red'">mdi-trash-can-outline</v-icon>
    </v-btn>
    <v-list-item-title>
      {{ item.text }}
    </v-list-item-title>
  </v-list-item>
</template>

<script>
    import store from "../store/index";

    export default {
        name: "listItem",


        props: {
            item: {}
        },
        methods: {
            removeTodo(item) {
                // item.needShowModal = false;
                store.commit("removeItem", item.id);
            }
        }
    }
</script>

<style scoped>

</style>
