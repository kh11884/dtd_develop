<template>

  <v-row justify="center">
    <v-col cols="12" sm="10" md="7" lg="5">
      <v-card>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col col-2>
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
                  <v-date-picker locale="ru-ru" v-model="issuedDate" @input="showIssueDateCalendar = false"></v-date-picker>
                </v-menu>
              </v-col>


              <v-col col-2>
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
                      label="Дата закрытия:"
                      prepend-icon=mdi-calendar-edit
                      readonly
                      v-on="on"
                      :error-messages="isInvalidclosedDateMessage"
                      :dense="true"

                    ></v-text-field>
                  </template>
                  <v-date-picker locale="ru-ru" v-model="closedDate" @input="showCloseDateCalendar = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col col-2>
                <v-text-field
                  label="УН Платеж:"
                  v-model="UNpayment"
                  :error-messages="isInvalidUNPaymentMessage"
                  :dense="true"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-btn
            small
            color="primary"
            :loading="loading"
            @click="calc"
          >Расчитать
          </v-btn>
        </v-card-text>

      </v-card>
      <v-spacer></v-spacer>

      <v-sheet min-width="585" elevation="4" class="mt-3">
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
        var filteredHistory = getFullInfoRefinancingRateHistory().filter(function (item) {
            return issueDate <= item.endDate && item.startDate <= applicationDate
        });

        filteredHistory[0].startDate = issueDate;
        filteredHistory[0].days = Math.round((filteredHistory[0].endDate - issueDate) / (1000 * 3600 * 24)) + 1;

        filteredHistory[filteredHistory.length - 1].endDate = applicationDate;
        filteredHistory[filteredHistory.length - 1].days = Math.round((applicationDate - filteredHistory[filteredHistory.length - 1].startDate) / (1000 * 3600 * 24)) + 1;

        return filteredHistory;
    }

    function getCalcTable(openDate, closeDate, payment) {
        var issueDate = new Date(openDate);
        var applicationDate = new Date(closeDate);

        console.log(issueDate);
        console.log(closeDate);

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
        var options = {year: 'numeric', month: 'short', day: 'numeric'};
        return unformattedData.toLocaleString('ru-RU', options);
    }

    function getSumDays(issueDate, applicationDate) {
        return Math.round((applicationDate - issueDate) / (1000 * 3600 * 24)) + 1;
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
                        value: "значение суммы",
                    },
                    {
                        name: "Сумма платежа по которому предоставлена отсрочка",
                        value: "Значение платежа",
                    },
                    {
                        name: "количество дней отсрочки",
                        value: getSumDays(store.state.issueDate, store.state.applicationDate),
                    },
                    {
                        name: "Сумма процентов за отсрочку таможенного платежа",
                        value: "сумма процентов",
                    },
                ],
                showIssueDateCalendar: false,
                showCloseDateCalendar: false,
                loading: false,
                issuedDate: new Date("01/01/2018").toISOString().substring(0, 10),
                closedDate: new Date().toISOString().substring(0, 10),
                UNpayment: 1000,
                currentData: getFormatedData(store.state.applicationDate),
                resultTable: "",
                isInvalidIssuedDateMessage: "",
                isInvalidclosedDateMessage: "",
                isInvalidUNPaymentMessage: "",
            }
        },
        computed: {
            headTable: function () {
                return 'Рассчет процентов за отсрочку таможенного платежа (5010 вид) от ' + this.computedCloseDate;
            },
            computedIssueDate () {
                moment.locale('ru');
                return this.issuedDate ? moment(this.issuedDate).format('D MMM YYYY') : ''
            },
            computedCloseDate () {
                moment.locale('ru');
                return this.closedDate ? moment(this.closedDate).format('D MMM YYYY') : ''
            },
        },
        methods: {
            calc: function () {
                this.loading = true;
                this.isInvalidIssuedDateMessage = this.issuedDate === "" ? "Укажите дату выпуска ДТ" : "";
                this.isInvalidclosedDateMessage = this.closedDate === "" ? "Укажите дату закрытия процедуры" : "";
                this.isInvalidUNPaymentMessage = this.UNpayment === "" ? "Укажите сумму платежа" : "";
                if(this.isInvalidIssuedDateMessage || this.isInvalidclosedDateMessage || this.isInvalidUNPaymentMessage){
                    this.loading = false;
                    return;
                }
                this.resultTable = getCalcTable(this.issuedDate, this.closedDate, this.UNpayment);
                this.loading = false;
            }
        }
    }
</script>

<style scoped>

</style>
