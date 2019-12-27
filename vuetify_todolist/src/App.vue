<template>
  <v-app>
    <p class="title text-center mt-3">Список задач</p>
    <newTodo/>
    <TodoList/>
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
