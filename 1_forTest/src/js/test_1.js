function moneyFormat(n) {
    return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
}

var CurrencyCalculator = new Vue({
  el: '#CurrencyCalculator',
  data: {
    usd_rate: 0,
    eur_rate: 0,
    usd_charges: "",
    eur_charges: "",
    rub_charges: "",
    date: "!!! Курсы валют не загрузились. Проверь курсы!!!",
    isHandMadeRates: false
  },
  computed: {
    result: function (){
    var usd_costs = this.usd_charges === ""? 0: eval(this.usd_charges);
    var eur_costs = this.eur_charges === ""? 0: eval(this.eur_charges);
    var rub_costs = this.rub_charges === ""? 0: eval(this.rub_charges);

    var result = usd_costs * this.usd_rate + eur_costs * this.eur_rate + rub_costs;

    return moneyFormat(result);
    },
  }
})

var options = {year: 'numeric', month: 'short', day: 'numeric'};

$.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(data) {
    CurrencyCalculator.usd_rate = data.Valute.USD.Value;
    CurrencyCalculator.eur_rate = data.Valute.EUR.Value;
    console.log(data.Date);
    CurrencyCalculator.date = data.Date.substring(0, 10);
});
