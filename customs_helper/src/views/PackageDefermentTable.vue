<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="7" lg="5">
      <v-card min-width="585">
        <v-container class="pt-0">
          <v-row>
            <v-col class="pb-0">
              <v-card-text class="headline">Пакетный расчет процентов за отсрочку</v-card-text>
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

              <v-textarea
                label="Вставьте данные:"
                v-model="inputData"
                prepend-icon=mdi-application-import
                :placeholder="placeholder"
                :dense="true"
                :loader-height="20"
              ></v-textarea>
            </v-col>

            <v-col cols="4" class="ma-4">
              <v-avatar
                class="ma-0"
                size="180"
                tile
              >
                <v-img src="../assets/package1.jpg"></v-img>
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
                  @click="calc"
                >расчитать
                </v-btn>
              </div>
              <div class="my-2 ma-2">
                <v-btn
                  color="primary"
                  @click="clear"
                >Очистить
                </v-btn>
              </div>

              <div class="my-2 ma-2">
                <span>Последние изменения ключевой ставки используемые для расчета: {{lastKeyRateDate}} - {{lastKeyRate}}</span>
              </div>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>

      <v-spacer></v-spacer>

      <v-card v-if="showTable" min-width="620" elevation="4" class="mt-3" justify="center">
        <div class="pt-5 pl-5">
        </div>

        <v-data-table
          :headers="headTable"
          :items="outputTable"
          dense
          class="elevation-1"
          hide-default-footer
          :items-per-page="rows"
        >
        </v-data-table>

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
        getCorrectTimeZoneDate,
        getFormatedData,
        isValidDate,
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
                headTable: [
                    {text: 'Начало расчета', sortable: false, value: 'startDate'},
                    {text: 'Дата закрытия', sortable: false, value: 'endDate'},
                    {text: 'Сумма платежа', sortable: false, value: 'UNPlat'},
                    {text: 'Сумма процентов', sortable: false, value: 'sumPercents'},
                ],
                outputTable: [],
                endDate: getCorrectTimeZoneDate(Date.now()),
                showEndDateCalendar: false,
                rows: 1,
                showTable: false,
                placeholder: "Скопируйте из Excel два столбца: \n \"дата выпуска ДТ\" и \"сумма платежа\" \n и вставьте в это поле"
            }
        },
        methods: {
            calc() {
                if (this.inputData === "") {
                    return;
                }
                this.outputTable = [];
                let totalUNPlat = 0;
                let totalSum = 0;
                let array = this.inputData.split(/\s*$\s*/mg);
                array.map(item => {
                    let subarray = item.split('\t');
                    if (subarray[0] !== "") {
                        let startDate = new Date(getFormattedDataFromExcelCell(subarray[0]));
                        let endDate = new Date(getFormatedData(this.endDate));
                        let sumPlat;
                        if (subarray[1] === undefined) {
                            sumPlat = 0;
                        } else {
                            sumPlat = parseFloat(subarray[1].replace(',', '.'));
                        }
                        console.log(startDate);
                        if(!isValidDate(startDate)){
                            alert("Необходимо проверить входные данные. \nВ какой-то из строк дата может иметь некорректный формат.\nИтоговые значения могут быть некорректными");
                        }
                        if(isNaN(sumPlat)){
                            alert("Необходимо проверить входные данные. \nВ какой-то из строк сумма платежа может иметь некорректный формат.\nИтоговые значения могут быть некорректными");
                        }

                        console.log(startDate + " - " + sumPlat);

                        let resultTable = getCalcTable(startDate, endDate, sumPlat);
                        let stepSum = getSumPercents(resultTable);

                        let sum = stepSum > 0 ? stepSum : 0;

                        this.outputTable.push({
                            startDate: getExcelFormatDate(startDate),
                            endDate: getExcelFormatDate(endDate),
                            UNPlat: subarray[1],
                            sumPercents: sum.toString().replace('.', ',')
                        });

                        totalUNPlat += Math.round(sumPlat * 100) / 100;
                        totalSum += Math.round(sum * 100) / 100;
                    }
                });
                totalUNPlat = Math.round(totalUNPlat * 100) / 100;
                totalSum = Math.round(totalSum * 100) / 100;
                this.outputTable.push({
                    startDate: "ИТОГО:",
                    endDate: "",
                    UNPlat: totalUNPlat.toString().replace('.', ','),
                    sumPercents: totalSum.toString().replace('.', ',')
                });
                this.rows = this.outputTable.length;
                this.showTable = true;
            },
            clear() {
                this.showTable = false;
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
