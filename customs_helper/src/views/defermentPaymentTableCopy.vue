<!--TODO Сделать чтобы таблица передавалась от компонента другому компоненту-->

<template>
  <div>
    <v-btn
      @click="getCopyTable">
      обновить
    </v-btn>
    <span>Copy</span>
    <div>
      {{foo}}
    </div>
    <v-simple-table>
      <tbody>
      <tr v-for="item in tableCopy" :key="item.startDate">
        <td>{{ item.payment }}</td>
        <td>{{ item.startDate }}</td>
        <td>{{ item.endDate }}</td>
        <td>{{item.days}}</td>
        <td>{{item.refinancing_rate}}</td>
        <td>{{item.sum}}</td>
      </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
    import defermentPaymentTableView from "./defermentPaymentTableView";

    export default {
        name: "DefermentPaymentTableCopy",
        data() {
            return {
                tableCopy: "",
                foo: 'x'
            };
        },
        methods: {
            getCopyTable() {
                console.log(defermentPaymentTableView.methods.getResultTable());
            }
        },
        computed: {},
        updated() {
            this.foo = defermentPaymentTableView.data().UNpayment
        }
    }
</script>

<style scoped>
</style>
