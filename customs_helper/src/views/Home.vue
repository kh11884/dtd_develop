<template>
  <div class="home">
    <v-row justify="center">
      <v-col cols="6">
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="'Калькулятор расчета ТС'"
              ></v-card-title>

              <v-card-subtitle v-text="'Страничка находится в стадии разработки'"></v-card-subtitle>
            </div>

            <v-avatar
              class="ma-3"
              size="125"
              tile
            >
              <v-img src="../assets/vesna.jpg"></v-img>
            </v-avatar>
          </div>
        </v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        components: {
            HelloWorld
        }
    }
</script>
