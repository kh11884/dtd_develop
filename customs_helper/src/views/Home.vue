<template>
  <div class="home">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="7" lg="5">
        <v-card min-width="585">
          <div class="d-flex flex-no-wrap justify-space-between ">
            <div>
              <v-card-text class="headline">ПОМОЩНИК ДЕКЛАРАНТА</v-card-text>
              <v-card-text>
                <div>Ресурс находится в разработке</div>
                <div>Информация предоставляется справочно и не гарантирует успешный выпуск ДТ</div>
                <div>Ждем Ваших замечаний и предложений</div>
                <!--                <a v-bind:href="'/dtd/img/check.docx'" download="check.docx" class="btn btn-light btn-sm mr-1 mt-2">Скачать</a>-->

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

          <v-item-group>
            <v-container>
              <v-row justify="center">
                <v-col
                  cols="12"
                  md="4">
                  <router-link tag="div" to="/CustomsValueCalc">
                    <v-card
                      color="primary"
                      dark
                      @click="loader = 'loading'"
                      class="text-center"
                    >
                      <v-card-title class="justify-center">Калькулятор</v-card-title>
                      <v-card-text>
                        таможенной стоимости
                      </v-card-text>

                    </v-card>
                  </router-link>
                </v-col>

                <v-col
                  cols="12"
                  md="4">
                  <router-link tag="div" to="/defermentPaymentTableView">
                    <v-card
                      color="primary"
                      dark
                      @click="loader = 'loading'"
                      class="text-center"
                    >
                      <v-card-title class="justify-center">Отсрочка</v-card-title>
                      <v-card-text>
                        расчет для одной ДТ
                      </v-card-text>
                    </v-card>
                  </router-link>
                </v-col>

                <v-col
                  cols="12"
                  md="4">
                  <router-link tag="div" to="/PackageDefermentTable">
                    <v-card
                      color="primary"
                      dark
                      @click="loader = 'loading'"
                      class="text-center"
                    >
                      <v-card-title class="justify-center">Отсрочка</v-card-title>
                      <v-card-text>
                        расчет для пакета ДТ
                      </v-card-text>

                    </v-card>
                  </router-link>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>

          <v-item-group>
            <v-container>
              <v-row justify="center">
                <v-col
                  cols="12"
                  md="4">
                  <router-link tag="div" to="/checkList">
                    <v-card
                      color="primary"
                      dark
                      @click="loader = 'loading'"
                      class="text-center"
                    >
                      <v-card-title class="justify-center">Чек-лист</v-card-title>
                      <v-card-text>
                        проверка ДТ
                      </v-card-text>

                    </v-card>
                  </router-link>
                </v-col>
                <v-col
                  cols="12"
                  md="4">
                  <router-link tag="div" to="/">
                    <v-card
                      color="grey"
                      @click="loader = 'loading'"
                      class="text-center"
                    >
                      <v-card-title class="justify-center">Рассрочка</v-card-title>
                      <v-card-text>
                        расчет для одной ДТ<br>
                        (в разработке)
                      </v-card-text>
                    </v-card>
                  </router-link>
                </v-col>
                <v-col
                  cols="12"
                  md="4">
                  <router-link tag="div" to="/">
                    <v-card
                      color="grey"
                      @click="loader = 'loading'"
                      class="text-center"
                    >
                      <v-card-title class="justify-center">Рассрочка</v-card-title>
                      <v-card-text>
                        расчет для пакета ДТ<br>
                        (в разработке)
                      </v-card-text>
                    </v-card>
                  </router-link>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>

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
