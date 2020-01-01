<template>
<!--  <tbody>-->
<!--  <tr v-for="item in resultTable" :key="item.startDate">-->
<!--    <td>{{ item.payment }}</td>-->
<!--    <td>{{ item.startDate }}</td>-->
<!--    <td>{{ item.endDate }}</td>-->
<!--    <td>{{item.days}}</td>-->
<!--    <td>{{item.refinancing_rate}}</td>-->
<!--    <td>{{item.sum}}</td>-->
<!--  </tr>-->
<!--  </tbody>-->
  <span>{{xxx}}</span>
</template>


<script>
    import store from "../store/index";

    export default {
        name: 'HelloWorld',

        data: () => ({
            xxx: 2
        }),
    };
</script>
