<template>
  <div class="home">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="7" lg="5">
        <v-card min-width="585">
          <div class="d-flex flex-no-wrap justify-space-between ">
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


          <v-row justify="center">
            <router-link tag="div" to="/CustomsValueCalc">
              <v-btn
                large
                class="ma-2"
                color="primary"
                @click="loader = 'loading'"
              >
                Калькулятор ТС
              </v-btn>
            </router-link>


            <router-link tag="div" to="/defermentPaymentTableView">
              <v-btn
                large
                color="primary"
                class="ma-2 white--text"
                @click="loader = 'loading3'"
              >
                Расчет процентов<br>для отсрочки
              </v-btn>
            </router-link>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'home',
    }
</script>
