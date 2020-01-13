<template>
  <div class="home">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="7" lg="5">
        <v-card min-width="585">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-text class="headline">Калькулятор расчета таможенной стоимости</v-card-text>
              <v-card-text>
                <v-simple-table dense>
                  <tr>
                    <td colspan="2">Дата курсов</td>
                    <td>{{date}}</td>
                  </tr>
                  <tr>
                    <td>USD:</td>
                    <td> {{cbr_usd_rate}}</td>
                    <td rowspan="2">
                      <v-tooltip
                        right>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            depressed
                            dark
                            fab
                            x-small
                            color="primary"
                            @click="refreshRate"
                            v-on="on"
                          >
                            <v-icon dark>mdi-cached</v-icon>
                          </v-btn>
                        </template>
                        <span>Обновить курсы</span>
                      </v-tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td>EUR:</td>
                    <td> {{cbr_eur_rate}}</td>
                  </tr>
                </v-simple-table>
                <v-checkbox v-model="isHandMadeRates" :label="'Указать курсы вручную'"></v-checkbox>

                <v-card v-show="isHandMadeRates" max-width="400" height="90" color="indigo lighten-5">
                  <v-card-text>
                    <v-form>
                      <v-row>
                        <v-col col-2 class="pb-0">

                          <v-text-field
                            class="pb-0"
                            label="USD:"
                            v-model="hand_usd_rate"
                            :error-messages="isInvalid_hand_usd_rate_message"
                            :dense="true"
                          ></v-text-field>
                        </v-col>
                        <v-col col-2 class="pb-0">
                          <v-text-field
                            label="EUR:"
                            v-model="hand_eur_rate"
                            :error-messages="isInvalid_hand_eur_rate_message"
                            :dense="true"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-card-text>

            </div>
            <v-avatar
              class="ma-3"
              size="200"
              tile
            >
              <v-img src="../assets/calculator.jpg"></v-img>
            </v-avatar>
          </div>

          <v-card-text class="pt-0">
            <v-form class="pt-0">
              <v-text-field
                class="pt-0"
                label="Расходы в USD:"
                v-model="usd_charges"
                hint="Введите выражение в формате 2+3."
                :clearable="true"
                prefix="$"
              ></v-text-field>

              <v-text-field
                label="Расходы в EUR:"
                v-model="eur_charges"
                hint="Введите выражение в формате 2+3."
                :clearable="true"
                prefix="€"
              ></v-text-field>

              <v-text-field
                label="Расходы в RUB:"
                v-model="rub_charges"
                hint="Введите выражение в формате 2+3."
                :clearable="true"
                prefix="₽"
              ></v-text-field>
            </v-form>
            <v-card>
              <v-row
              :align="'center'">
                <v-col
                  cols="auto"
                  class="mr-auto py-0">
                  <v-card-text
                class="headline black--text"
              >Таможенная стоимость: {{ result }}
                <span v-show="isHandMadeRates" class="red--text">*</span>
              </v-card-text>
                </v-col>
                <v-col
                  cols="auto"
                  class="mr-4 py-0">
              <v-tooltip
                right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    depressed
                    dark
                    fab
                    x-small
                    color="primary"
                    @click="clearAll"
                    v-on="on">
                    <v-icon>
                      mdi-autorenew
                    </v-icon>
                  </v-btn>
                </template>
                <span>Очистить все</span>
              </v-tooltip>
                </v-col>
              </v-row>
            </v-card>
            <span v-show="isHandMadeRates" class="red--text">* Расчет таможенной стоимости ведется по курсам заданным вручную!</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import axios from 'axios'
    import getRussianDate from "../components/customsValueCalcComponents/getRussianDate";
    import getMoneyFormat from "../components/customsValueCalcComponents/getMoneyFormat";
    import parseNumber from "../components/customsValueCalcComponents/parseNumber";
    import getExpression from "../components/customsValueCalcComponents/getExpression";

    export default {
        name: 'CustomsValueCalc',
        components: {
            HelloWorld
        },
        data() {
            return {
                hand_usd_rate: 0,
                hand_eur_rate: 0,
                cbr_usd_rate: 0,
                cbr_eur_rate: 0,
                usd_charges: "",
                eur_charges: "",
                rub_charges: "",
                date: "!!! Курсы валют не загрузились. Проверь курсы!!!",
                isHandMadeRates: false,
            }
        },
        computed: {
            result: function () {
                this.usd_charges = getExpression(this.usd_charges);
                this.eur_charges = getExpression(this.eur_charges);
                this.rub_charges = getExpression(this.rub_charges);

                var usd_costs = this.usd_charges === "" ? 0 : parseNumber(this.usd_charges);
                var eur_costs = this.eur_charges === "" ? 0 : parseNumber(this.eur_charges);
                var rub_costs = this.rub_charges === "" ? 0 : parseNumber(this.rub_charges);

                var result = usd_costs * this.usd_rate + eur_costs * this.eur_rate + rub_costs;

                return getMoneyFormat(result);
            },
            usd_rate: function () {
                if (this.isHandMadeRates) {
                    this.hand_usd_rate = getExpression(this.hand_usd_rate);
                    return parseNumber(this.hand_usd_rate);
                } else {
                    return this.cbr_usd_rate;
                }
            },
            eur_rate: function () {
                if (this.isHandMadeRates) {
                    this.hand_eur_rate = getExpression(this.hand_eur_rate);
                    return parseNumber(this.hand_eur_rate);
                } else {
                    return this.cbr_eur_rate;
                }
            },
            isInvalid_hand_usd_rate_message: function () {
                return this.hand_usd_rate === "" ? "Введите курс USD" : "";
            },
            isInvalid_hand_eur_rate_message: function () {
                return this.hand_eur_rate === "" ? "Введите курс EUR" : "";
            }
        },
        methods: {
            refreshRate: function () {
                axios
                    .get("https://www.cbr-xml-daily.ru/daily_json.js")
                    .then(response => {
                        this.cbr_usd_rate = response.data.Valute.USD.Value;
                        this.cbr_eur_rate = response.data.Valute.EUR.Value;
                        this.date = getRussianDate(response.data.Date);
                        this.hand_usd_rate = this.cbr_usd_rate;
                        this.hand_eur_rate = this.cbr_eur_rate;
                    })
                    .catch(function (e) {
                        alert("Что-то пошло не так с загрузкой курсов. " + e);
                    });
            },
            clearAll: function () {
                this.usd_charges = "";
                this.eur_charges = "";
                this.rub_charges = "";
            }
        },
        mounted: function () {
            this.refreshRate();
        },
    }
</script>
