<template>
  <v-row justify="center">
    <v-col cols="9">
      <v-card>
        <v-card-text>
          <v-row justify="center">
            <v-col cols="3">
              <v-sheet
                min-width="220">
                <div class="my-2 ma-2">
                  <span>Последние изменения ключевой ставки используемые для рассчета: {{lastKeyRateDate}} - {{lastKeyRate}}</span>
                </div>
                <v-btn
                  color="primary"
                  @click="calc"
                >расчитать
                </v-btn>
                <v-btn
                  color="primary"
                  @click="clear"
                >Очистить
                </v-btn>

                <div class="py-1">
                  <v-menu
                    v-model="showEndDateCalendar"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="computedEndDate"
                        label="Дата расчета:"
                        prepend-icon=mdi-calendar-edit
                        readonly
                        v-on="on"
                        :dense="true"
                      ></v-text-field>
                    </template>
                    <v-date-picker locale="ru-ru" v-model="endDate"
                                   @input="showEndDateCalendar = false"></v-date-picker>
                  </v-menu>
                </div>


                <v-textarea
                  label="Вставьте данные:"
                  v-model="inputData"
                  :dense="true"
                  :loader-height="20"
                ></v-textarea>


              </v-sheet>
            </v-col>
            <v-col cols="7">
              <v-sheet>
                <v-simple-table
                  dense>
                  <tbody>
                  <tr v-for="item in outputTable">
                    <td>{{ item.startDate }}</td>
                    <td>{{ item.endDate }}</td>
                    <td>{{item.UNPlat}}</td>
                    <td>{{item.sumPercents}}</td>
                  </tr>
                  </tbody>
                </v-simple-table>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
    import moment from 'moment'
    import {
        getFormattedDataFromExcelCell,
        getExcelFormatDate,
        getRussianDate,
        getCorrectTimeZoneDate
    } from "../components/percentCalculationComponents/dateFunction";
    import {
        getCalcTable,
        getSumPercents,
        fullInfoRefinancingRateHistory
    } from "../components/percentCalculationComponents/defermentPercentCalculator";


    export default {
        name: "PackageDefermentTable",
        data() {
            return {
                inputData: "",
                isInvalidInputData: false,
                outputTable: [],
                endDate: getCorrectTimeZoneDate(Date.now()),
                showEndDateCalendar: false,
            }
        },
        methods: {
            calc() {
                this.outputTable = [];
                let totalUNPlat = 0;
                let totalSum = 0;
                let array = this.inputData.split(/\s*$\s*/mg);
                array.map(item => {
                    let subarray = item.split('\t');
                    if (subarray[0] !== "") {
                        let startDate = new Date(getFormattedDataFromExcelCell(subarray[0]));
                        let endDate = new Date("01/25/2020");
                        let sumPlat = parseFloat(subarray[1].replace(',', '.'));
                        let resultTable = getCalcTable(startDate, endDate, sumPlat);
                        let sum = getSumPercents(resultTable);
                        this.outputTable.push({
                            startDate: subarray[0],
                            endDate: getExcelFormatDate(endDate),
                            UNPlat: subarray[1],
                            sumPercents: sum.toString().replace('.', ',')
                        });
                        totalUNPlat += sumPlat;
                        totalSum += sum;
                    }
                });
                totalSum = Math.round(totalSum * 100) / 100;
                this.outputTable.push({
                    startDate: "ИТОГО:",
                    endDate: "",
                    UNPlat: totalUNPlat.toString().replace('.', ','),
                    sumPercents: totalSum.toString().replace('.', ',')
                });
            },
            clear() {
                this.inputData = "";
                this.outputTable = [];
            }
        },
        computed: {
            computedEndDate() {
                return this.endDate ? getRussianDate(this.endDate) : ''
            },
            lastKeyRateDate() {
                moment.locale("ru");
                return moment(fullInfoRefinancingRateHistory[fullInfoRefinancingRateHistory.length - 1].startDate).format('D MMM YYYY');
            },
            lastKeyRate() {
                return fullInfoRefinancingRateHistory[fullInfoRefinancingRateHistory.length - 1].refinancing_rate * 100 + " %";
            },
        }
    }
</script>

<style scoped>

</style>
