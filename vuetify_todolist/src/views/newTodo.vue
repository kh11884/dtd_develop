<template>
  <div>
    <p class="text-center">Тут должна быть форма для добавления новой TODO</p>

    <form>
      <v-text-field
        v-model="name"
        v-validate="'required|max:10'"
        :counter="10"
        :error-messages="errors.collect('name')"
        label="Name"
        data-vv-name="name"
        required
      ></v-text-field>

      <v-btn >Добавить</v-btn>
    </form>
  </div>
</template>

<script>
    export default {
        name: "newTodo"
    }
</script>

<style scoped>

</style>
