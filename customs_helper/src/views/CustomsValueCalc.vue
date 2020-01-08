<template>
  <div class="home">
    <v-row justify="center">
      <v-col cols="12" sm="9" md="7" lg="5">
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-text class="headline">Калькулятор расчета таможенной стоимости</v-card-text>
              <v-card-text>
                <div>Дата курсов {{date}}</div>
                <div>USD: {{usd_rate}}</div>
                <div>EUR: {{eur_rate}}</div>
                <v-checkbox v-model="isHandMadeRates" :label="'Указать курсы вручную'"></v-checkbox>

                <v-card v-show="isHandMadeRates" max-width="400" height="90" color="indigo lighten-5">
                  <v-card-text>
                    <v-form>
                      <v-row>
                        <v-col col-2>

                          <v-text-field
                            label="USD:"
                            v-model="hand_usd_rate"
                            :error-messages="isInvalid_hand_usd_rate_message"
                            :dense="true"
                          ></v-text-field>
                        </v-col>
                        <v-col col-2>
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

          <v-card-text>
            <v-form>
              <v-text-field
                label="Расходы в USD:"
                v-model="usd_charges"
                hint="Введите выражение в формате 2+3. Для дроби используйте точку."
                :clearable="true"
                prefix="$"
              ></v-text-field>

              <v-text-field
                label="Расходы в EUR:"
                v-model="eur_charges"
                hint="Введите выражение в формате 2+3. Для дроби используйте точку."
                :clearable="true"
                prefix="€"
              ></v-text-field>

              <v-text-field
                label="Расходы в RUB:"
                v-model="rub_charges"
                hint="Введите выражение в формате 2+3. Для дроби используйте точку."
                :clearable="true"
                prefix="₽"
              ></v-text-field>
            </v-form>
            <v-card>
              <v-card-text
                class="headline black--text"
              >Таможенная стоимость: {{ result }}
                <span v-show="isHandMadeRates" class="red--text">*</span>
              </v-card-text>
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
    import moment from 'moment'

    function moneyFormat(n) {
        return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
    }

    function getRussianData(data) {
        moment.locale('ru');
        return moment(data.substring(0, 10)).format("DD MMMM YYYY");
    }

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
                var usd_costs = this.usd_charges === "" ? 0 : eval(this.usd_charges);
                var eur_costs = this.eur_charges === "" ? 0 : eval(this.eur_charges);
                var rub_costs = this.rub_charges === "" ? 0 : eval(this.rub_charges);

                var result = usd_costs * this.usd_rate + eur_costs * this.eur_rate + rub_costs;

                return moneyFormat(result);
            },
            usd_rate: function () {
                return this.isHandMadeRates ? this.hand_usd_rate : this.cbr_usd_rate;
            },
            eur_rate: function () {
                return this.isHandMadeRates ? this.hand_eur_rate : this.cbr_eur_rate;
            },
            isInvalid_hand_usd_rate_message: function () {
                return this.hand_usd_rate === "" ? "Введите курс USD" : "";
            },
            isInvalid_hand_eur_rate_message: function () {
                return this.hand_eur_rate === "" ? "Введите курс EUR" : "";
            }
        },
        mounted: function () {
            axios
                .get("https://www.cbr-xml-daily.ru/daily_json.js")
                .then(response => {
                    this.cbr_usd_rate = response.data.Valute.USD.Value;
                    this.cbr_eur_rate = response.data.Valute.EUR.Value;
                    this.date = getRussianData(response.data.Date);
                    this.hand_usd_rate = this.cbr_usd_rate;
                    this.hand_eur_rate = this.cbr_eur_rate;
                })
                .catch(function (e) {
                    alert("Что-то пошло не так с загрузкой курсов. " + e);
                });
        },
    }
</script>
