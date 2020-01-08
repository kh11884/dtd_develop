<template>

</template>

<script>
    export default {
        name: "formatDate",
        function getRussianData(data) {
        moment.locale('ru');
        return moment(data.substring(0, 10)).format("DD MMMM YYYY");
    }
    }
</script>

<style scoped>

</style>
