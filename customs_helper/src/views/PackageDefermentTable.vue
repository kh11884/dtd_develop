<template>
  <div>
    <v-row justify="center">
      <v-col cols="6">
        <v-sheet>
          <v-textarea
            label="Вставьте таблицу:"
            v-model="inputData"
            :dense="true"
            :loader-height="20"
          ></v-textarea>
        </v-sheet>
      </v-col>
    </v-row>
    <v-btn
      color="primary"
      @click="calc"
    >Сброс
    </v-btn>
  </div>

</template>

<script>
    import {
        getFormattedDataFromExcelCell,
    } from "../components/percentCalculationComponents/dateFunction";
    import {
        getCalcTable,
        getSumPercents,
    } from "../components/percentCalculationComponents/defermentPercentCalculator";


    export default {
        name: "PackageDefermentTable",
        data() {
            return {
                inputData: "",
                isInvalidInputData: false,
                outputTable: []

            }
        },
        methods: {
            calc() {
                let array = this.inputData.split(/\s*$\s*/mg);
                array.map(item => {
                    let subarray = item.split('\t');
                    if(subarray[0] !== ""){
                        let startDate = new Date(getFormattedDataFromExcelCell(subarray[0]));
                        let endDate = new Date("01/25/2020");
                        let sumPlat = parseFloat(subarray[1].replace(',','.'));
                        console.log(startDate);
                        console.log(endDate);
                        console.log(sumPlat);
                        let resultTable = getCalcTable(startDate, endDate, sumPlat);
                        console.log(resultTable);
                        let sum = getSumPercents(resultTable);
                        console.log(sum);
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
