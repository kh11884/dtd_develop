<template>
  <v-list-item>
    <v-btn @click="removeTodo(item)" class="mr-2">
      X
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
