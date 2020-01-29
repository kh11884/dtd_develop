<!--TODO: Вынести таблицу для вставки в графу 47 альты в отдельный VUE компонент-->
<!--TODO: Добавить корректныю печать чек-лист-->
<!--TODO: Добавить рассчет процентов по рассрочке-->
<!--TODO: Добавить пакетный рассчет процентов по рассрочке-->
<!--TODO: Добавить проверку изменения ставки рефинансирования-->


<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="7" lg="5">
      <v-card min-width="585" class="d-print-none">
        <v-container class="pt-0">
          <v-row>
            <v-col>
              <v-card-text class="headline">Расчет процентов по отсрочке платежа</v-card-text>

              <v-menu
                v-model="showIssueDateCalendar"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="computedIssueDate"
                    label="Дата выпуска ДТ:"
                    prepend-icon=mdi-calendar-edit
                    readonly
                    v-on="on"
                    :error-messages="isInvalidIssuedDateMessage"
                    :dense="true"
                  ></v-text-field>
                </template>
                <v-date-picker locale="ru-ru" v-model="issuedDate"
                               @input="showIssueDateCalendar = false"></v-date-picker>
              </v-menu>

              <div class="py-1">
                <v-menu
                  v-model="showCloseDateCalendar"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="computedCloseDate"
                      label="Дата закрытия процедуры:"
                      prepend-icon=mdi-calendar-edit
                      readonly
                      v-on="on"
                      :error-messages="isInvalidClosedDateMessage"
                      :dense="true"

                    ></v-text-field>
                  </template>
                  <v-date-picker locale="ru-ru" v-model="closedDate"
                                 @input="showCloseDateCalendar = false"></v-date-picker>
                </v-menu>
              </div>

              <v-text-field
                label="Условно-начисленный платеж:"
                prepend-icon="mdi-currency-rub"
                v-model="UNpayment"
                :error-messages="isInvalidUNPaymentMessage"
                :dense="true"
              ></v-text-field>

            </v-col>
            <v-col cols="4" class="ma-4">
              <v-avatar
                class="ma-0"
                size="180"
                tile
              >
                <v-img src="../assets/calc2.jpg"></v-img>
              </v-avatar>

            </v-col>
          </v-row>

          <v-card-text class="pt-0">
            <v-row
              :align="'end'"
              :justify="'start'">
              <div class="my-2 ma-2">
                <v-btn
                  color="primary"
                  :loading="loading"
                  @click="calc"
                >Расчитать
                </v-btn>
              </div>
              <div class="my-2 ma-2">
                <v-btn
                  color="primary"
                  @click="reset"
                >Сброс
                </v-btn>
              </div>

              <div class="my-2 ma-2">
                <v-dialog width="660">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="primary"
                      v-on="on"
                    >
                      для гр. 47
                    </v-btn>
                  </template>

                  <v-card>
                    <v-container>
                        <v-simple-table
                          dense
                          class="p-5">
                          <tbody>
                          <tr v-for="item in resultTable" :key="item.startDate">
                            <td>5012</td>
                            <td>{{ item.payment }}</td>
                            <td>{{item.refinancing_rate}}</td>
                            <td></td>
                            <td>{{item.sum}}</td>
                            <td>ИУ</td>
                            <td>{{item.days}}</td>
                            <td></td>
                            <td></td>
                            <td>{{item.simpleRate}}</td>
                          </tr>
                          </tbody>
                        </v-simple-table>
                    </v-container>
                  </v-card>
                </v-dialog>
              </div>

              <div class="my-2 ma-2">
                <span>Последние изменения ключевой ставки используемые для рассчета: {{lastKeyRateDate}} - {{lastKeyRate}}</span>
              </div>
            </v-row>

          </v-card-text>
        </v-container>
      </v-card>
      <v-spacer></v-spacer>

      <v-sheet v-if="isCalced" min-width="585" elevation="4" class="mt-3">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
            <tr>
              <td colspan="4" class="font-weight-black">Рассчет процентов за отсрочку таможенного платежа (5010 вид)
              </td>
              <td colspan="2" class="font-weight-black">{{computedCloseDate}}</td>
            </tr>
            <tr v-for="item in infoes" :key="item.name">
              <td colspan="4">{{ item.name }}</td>
              <td colspan="2">{{ item.value }}</td>
            </tr>
            <tr>
              <td colspan="4" class="text-center font-weight-black">Прс = Сп х Д х Ст / (360 х 100%)</td>
              <td colspan="2" class="text-center font-weight-black"></td>
            </tr>

            <tr class="text-center font-weight-black">
              <td>Сп</td>
              <td>Начало периода</td>
              <td>Конец периода</td>
              <td>Д</td>
              <td>ст,%</td>
              <td>Прс</td>
            </tr>
            <tr v-for="item in resultTable" :key="item.startDate">
              <td>{{ item.payment }}</td>
              <td>{{ item.startDate }}</td>
              <td>{{ item.endDate }}</td>
              <td>{{item.days}}</td>
              <td>{{item.refinancing_rate}}</td>
              <td>{{item.sum}}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-sheet>
    </v-col>

  </v-row>


</template>

<script>
    import moment from 'moment'
    import lodash from 'lodash';
    import parseNumber from "../components/percentCalculationComponents/parseNumber";
    import {
        getFormatedData,
        getCorrectTimeZoneDate,
        getRussianDate
    } from "../components/percentCalculationComponents/dateFunction";
    import {
        getCalcTable,
        getSumDaysTable,
        getSumPercents,
        fullInfoRefinancingRateHistory
    } from "../components/percentCalculationComponents/defermentPercentCalculator";

    export default {
        name: "defermentPaymentTableView",
        data() {
            return {
                infoes: [
                    {
                        name: "Сумма условно-начисленных платежей",
                        value: 0,
                    },
                    {
                        name: "Сумма платежа по которому предоставлена отсрочка",
                        value: 0,
                    },
                    {
                        name: "количество дней отсрочки",
                        value: 0
                    },
                    {
                        name: "Сумма процентов за отсрочку таможенного платежа",
                        value: 0,
                    },
                ],
                showIssueDateCalendar: false,
                showCloseDateCalendar: false,
                loading: false,
                issuedDate: getCorrectTimeZoneDate(new Date("12/14/2015")),
                closedDate: getCorrectTimeZoneDate(Date.now()),
                UNpayment: 1000,
                resultTable: "",
                isInvalidIssuedDateMessage: "",
                isInvalidClosedDateMessage: "",
                isInvalidUNPaymentMessage: "",
                isCalced: false,
            }
        },
        computed: {
            headTable: function () {
                return 'Рассчет процентов за отсрочку таможенного платежа (5010 вид)' + this.computedCloseDate;
            },
            computedIssueDate() {
                return this.issuedDate ? getRussianDate(this.issuedDate) : ''
            },
            computedCloseDate() {
                return this.closedDate ? getRussianDate(this.closedDate) : ''
            },
            lastKeyRateDate() {
                return moment(fullInfoRefinancingRateHistory[fullInfoRefinancingRateHistory.length - 1].startDate).format('D MMM YYYY');
            },
            lastKeyRate() {
                return fullInfoRefinancingRateHistory[fullInfoRefinancingRateHistory.length - 1].refinancing_rate * 100 + " %";
            },
            formatedUNPayment() {
                return parseNumber(this.UNpayment);
            }
        },
        methods: {
            calc: function () {
                this.isCalced = false;
                this.loading = true;
                this.isInvalidIssuedDateMessage = this.issuedDate === "" ? "Укажите дату выпуска ДТ" : "";
                this.isInvalidClosedDateMessage = this.closedDate === "" ? "Укажите дату закрытия процедуры" : "";
                this.isInvalidUNPaymentMessage = this.UNpayment === "" ? "Укажите сумму платежа" : "";
                if (this.isInvalidIssuedDateMessage || this.isInvalidClosedDateMessage || this.isInvalidUNPaymentMessage) {
                    this.loading = false;
                    return;
                }
                this.resultTable = getCalcTable(new Date(getFormatedData(this.issuedDate)),
                    new Date(getFormatedData(this.closedDate)),
                    this.formatedUNPayment);

                this.infoes[0].value = this.formatedUNPayment;
                this.infoes[1].value = this.formatedUNPayment;
                this.infoes[2].value = getSumDaysTable(this.resultTable);
                this.infoes[3].value = getSumPercents(this.resultTable);
                this.loading = false;
                this.isCalced = true;
            },
            reset: function () {
                this.isCalced = false;
                this.issuedDate = "";
                this.closedDate = moment(new Date()).format().substring(0, 10);
                this.UNpayment = "";
            },
        }
    }
</script>

<style scoped>

</style>
