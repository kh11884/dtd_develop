<template>
  <v-row justify="center">
    <v-col sm="8">
      <v-list>
        <listItem
          v-for="item in items"
          :key="item.id"
          :item="item"/>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
    import store from "../store/index";
    import listItem from './listItem'

    export default {
        name: 'TodoList',
        components: {
            listItem
        },
        computed: {
            items: function () {
                return store.state.items;
            }
        }
    }
</script>

<style scoped>

</style>
