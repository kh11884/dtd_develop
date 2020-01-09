<!--TODO: Добавить ставку и дату круйней ставки-->
<!--TODO: Добавить таблицу для вставки в графу 47 альты-->
<!--TODO: Добавить пакетный рассчет процентов-->
<!--TODO: Добавить рассчет процентов по отсрочке-->


<template>

  <v-row justify="center">
    <v-col cols="12" sm="10" md="7" lg="5">
      <v-card min-width="585">
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
            </v-row>

          </v-card-text>
          <v-card-text class="error--text">!!! Добавить дату и ставку крайнего значения ключевой ставки, для наглядности работы отчета</v-card-text>
        </v-container>
      </v-card>
      <v-spacer></v-spacer>

      <v-sheet v-if="isCalced" min-width="585" elevation="4" class="mt-3">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
            <tr>
              <td colspan="6" class="font-weight-black">{{headTable}}</td>
            </tr>
            <tr v-for="item in infoes" :key="item.name">
              <td colspan="4">{{ item.name }}</td>
              <td colspan="2">{{ item.value }}</td>
            </tr>
            <tr>
              <td colspan="6" class="text-center font-weight-black">Прс = Сп х Д х Ст / (360 х 100%)</td>
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
    import percentCalculationTable from "../components/percentCalculationTable";
    import store from "../store";
    import lodash from 'lodash';

    function getFullInfoRefinancingRateHistory() {
        var refinancingRateHistory = store.state.refinancingRateHistory;
        refinancingRateHistory.reduce(function (memo, item) {
            memo.endDate = new Date(item.startDate);
            memo.endDate.setDate(memo.endDate.getDate() - 1);
            memo.days = Math.round((item.startDate - memo.startDate) / (1000 * 3600 * 24));
            return item;
        });
        //-- добавим в последний элемент конечную дату и число дней для нее, для стандартизированного подхода к дальнейшим рассчетам от элемента
        //-- можно добавить в кол-во дней 1, а в конечную дату текущую дату, чтобы не было лишних рассчетов.
        var endDate = new Date("12/31/2025"); //-- Дата до которой будет работает таблица
        var lastElement = refinancingRateHistory[refinancingRateHistory.length - 1];
        lastElement.endDate = endDate;
        lastElement.days = Math.round((lastElement.endDate - lastElement.startDate) / (1000 * 3600 * 24));

        return refinancingRateHistory;
    }

    function getFilteredHistory(issueDate, applicationDate) {
        var filterHistory = getFullInfoRefinancingRateHistory().filter(function (item) {
            return issueDate <= item.endDate
                && item.startDate <= applicationDate;
        });
        var filteredHistory = _.cloneDeep(filterHistory);

        filteredHistory[0].startDate = issueDate;
        filteredHistory[0].days = Math.round((filteredHistory[0].endDate - issueDate) / (1000 * 3600 * 24)) + 1;

        filteredHistory[filteredHistory.length - 1].endDate = applicationDate;
        filteredHistory[filteredHistory.length - 1].days = Math.round((applicationDate - filteredHistory[filteredHistory.length - 1].startDate) / (1000 * 3600 * 24)) + 1;

        return filteredHistory;
    }

    function getCalcTable(issueDate, applicationDate, payment) {
        issueDate.setDate(issueDate.getDate() + 1);
        var period = getFilteredHistory(issueDate, applicationDate);
        var options = {year: 'numeric', month: 'short', day: 'numeric'};
        var result = [];

        period.forEach(function (item) {
            result.push({
                payment: payment,
                startDate: item.startDate.toLocaleString('ru-RU', options),
                endDate: item.endDate.toLocaleString('ru-RU', options),
                days: item.days,
                refinancing_rate: (item.refinancing_rate * 100).toFixed(2) + " %",
                sum: (payment * item.days * item.refinancing_rate / 360).toFixed(2)
            });
        });
        return result;
    }

    function getFormatedData(unformattedData) {
        var year = unformattedData.substring(0, 4);
        var month = unformattedData.substring(5, 7);
        var day = unformattedData.substring(8, 10);
        return month + "/" + day + "/" + year;
    }

    function getSumDaysTable(tableData) {
        return tableData.reduce(function (result, tableRow) {
            return result + parseFloat(tableRow.days);
        }, 0);
    }

    function getSumPercents(tableData) {
        return Math.round(tableData.reduce(function (result, tableRow) {
            return result + parseFloat(tableRow.sum);
        }, 0) * 100) / 100;
    }

    export default {
        name: "defermentPaymentTableView",
        comments: {
            percentCalculationTable
        },
        components: {percentCalculationTable},
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
                issuedDate: (new Date(new Date("12/14/2015") - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
                closedDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
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
                return 'Рассчет процентов за отсрочку таможенного платежа (5010 вид) от ' + this.computedCloseDate;
            },
            computedIssueDate() {
                moment.locale('ru');
                return this.issuedDate ? moment(this.issuedDate).format('D MMM YYYY') : ''
            },
            computedCloseDate() {
                moment.locale('ru');
                return this.closedDate ? moment(this.closedDate).format('D MMM YYYY') : ''
            },
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
                    this.UNpayment);

                this.infoes[0].value = this.UNpayment;
                this.infoes[1].value = this.UNpayment;
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
            }
        }
    }
</script>

<style scoped>

</style>
