<template>
  <div>
    <newTodo/>
    <TodoList/>
  </div>
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
