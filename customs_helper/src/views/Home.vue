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

              <v-card-text>
                <div>Дата курсов {{date}}</div>
                <div>USD: {{usd_rate}}</div>
                <div>EUR: {{eur_rate}}</div>
                <p>Указать курсы вручную <input type="checkbox" id="checkbox" v-model="isHandMadeRates"></p>

                <v-card v-show="isHandMadeRates" max-width="400" height="90" color="teal lighten-5">
                  <v-card-text>
                    <v-form>
                      <v-row>
                        <v-col col-2>
                          <v-text-field
                            label="USD:"
                            v-model="hand_usd_rate"
                            :error-messages="isInvalid_hand_usd_rate_message"
                          ></v-text-field>
                        </v-col>
                        <v-col col-2>
                          <v-text-field
                            label="EUR:"
                            v-model="hand_eur_rate"
                            :error-messages="isInvalid_hand_eur_rate_message"
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
              size="125"
              tile
            >
              <v-img src="../assets/calculator.jpg"></v-img>
            </v-avatar>
          </div>

          <v-card-text>
            <v-form>
              <v-text-field
                label="Раходы в USD:"
                v-model="usd_charges"
              ></v-text-field>

              <v-text-field
                label="Расходы в EUR:"
                v-model="eur_charges"
              ></v-text-field>

              <v-text-field
                label="Раходы в RUB:"
                v-model="rub_charges"
              ></v-text-field>
            </v-form>
            <v-card>
              <v-card-title
                class="headline"
                v-text=""
              >Таможенная стоимость: {{ result }}
                <span v-show="isHandMadeRates" class="red--text">*</span>
              </v-card-title>
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

    function moneyFormat(n) {
        return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
    }

    export default {
        name: 'home',
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
                isHandMadeRates: false
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
                    this.date = response.data.Date.substring(0, 10);

                    this.hand_usd_rate = this.cbr_usd_rate;
                    this.hand_eur_rate = this.cbr_eur_rate;
                })
                .catch(function (e) {
                    alert("Что-то пошло не так с загрузкой курсов. " + e);
                });
        },
    }
</script>
