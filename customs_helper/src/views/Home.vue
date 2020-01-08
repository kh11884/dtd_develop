<template>
  <div class="home">
    <v-row justify="center">
      <v-col cols="12" sm="9" md="7" lg="5">
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-text class="headline">ПОМОЩНИК ДЕКЛАРАНТА</v-card-text>
              <v-card-text>
                <div>Сайт находится в разработке</div>
                <div>Информация предоставляется справочно и не гарантирует успешный выпуск ДТ</div>
                <div>Замечания и предложения направляйте команде разработчиков</div>
              </v-card-text>
            </div>

            <v-avatar
              class="ma-3"
              size="200"
              tile
            >
              <v-img src="../assets/customs_2.jpg"></v-img>
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
        },
    }
</script>
