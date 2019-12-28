<template>
  <v-app>
    <v-container class="lighten-1">
      <p class="title text-center mt-2 mb-0">Список задач:</p>
      <newTodo/>
      <TodoList/>
    </v-container>
  </v-app>
</template>

<script>
    import 'vuetify/dist/vuetify.min.css'
    import TodoList from './views/TodoList'
    import newTodo from './views/newTodo'

    export default {
        name: 'App',
        components: {
            newTodo,
            TodoList
        },
    }
</script>
