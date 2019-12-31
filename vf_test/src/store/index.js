import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);





export default new Vuex.Store({
  state: {
    //входные данные нужно заменить на взятые из формы
    payment: 10000,
    issueDate: new Date("01/01/2018"),
    applicationDate: new Date("10/29/2019"),


    refinancingRateHistory: getRefinancingRateHistory()
  },
  mutations: {}
  ,
  actions: {}
  ,
  modules: {}
})

function getRefinancingRateHistory() {
  return [
    {
      startDate: new Date("6/10/1999"),
      refinancing_rate: 0.55,
    },
    {
      startDate: new Date("1/24/2000"),
      refinancing_rate: 0.45,
    },
    {
      startDate: new Date("3/7/2000"),
      refinancing_rate: 0.38,
    },
    {
      startDate: new Date("3/21/2000"),
      refinancing_rate: 0.33,
    },
    {
      startDate: new Date("7/10/2000"),
      refinancing_rate: 0.28,
    },
    {
      startDate: new Date("11/4/2000"),
      refinancing_rate: 0.25,
    },
    {
      startDate: new Date("4/9/2002"),
      refinancing_rate: 0.23,
    },
    {
      startDate: new Date("8/7/2002"),
      refinancing_rate: 0.21,
    },
    {
      startDate: new Date("2/17/2003"),
      refinancing_rate: 0.18,
    },
    {
      startDate: new Date("6/21/2003"),
      refinancing_rate: 0.16,
    },
    {
      startDate: new Date("1/15/2004"),
      refinancing_rate: 0.14,
    },
    {
      startDate: new Date("6/15/2004"),
      refinancing_rate: 0.13,
    },
    {
      startDate: new Date("12/26/2005"),
      refinancing_rate: 0.12,
    },
    {
      startDate: new Date("6/26/2006"),
      refinancing_rate: 0.115,
    },
    {
      startDate: new Date("10/23/2006"),
      refinancing_rate: 0.11,
    },
    {
      startDate: new Date("1/29/2007"),
      refinancing_rate: 0.105,
    },
    {
      startDate: new Date("6/19/2007"),
      refinancing_rate: 0.1,
    },
    {
      startDate: new Date("2/4/2008"),
      refinancing_rate: 0.1025,
    },
    {
      startDate: new Date("4/29/2008"),
      refinancing_rate: 0.105,
    },
    {
      startDate: new Date("6/10/2008"),
      refinancing_rate: 0.1075,
    },
    {
      startDate: new Date("7/14/2008"),
      refinancing_rate: 0.11,
    },
    {
      startDate: new Date("11/12/2008"),
      refinancing_rate: 0.12,
    },
    {
      startDate: new Date("12/1/2008"),
      refinancing_rate: 0.13,
    },
    {
      startDate: new Date("4/24/2009"),
      refinancing_rate: 0.125,
    },
    {
      startDate: new Date("5/14/2009"),
      refinancing_rate: 0.12,
    },
    {
      startDate: new Date("6/5/2009"),
      refinancing_rate: 0.115,
    },
    {
      startDate: new Date("7/13/2009"),
      refinancing_rate: 0.11,
    },
    {
      startDate: new Date("8/10/2009"),
      refinancing_rate: 0.1075,
    },
    {
      startDate: new Date("9/15/2009"),
      refinancing_rate: 0.105,
    },
    {
      startDate: new Date("9/30/2009"),
      refinancing_rate: 0.1,
    },
    {
      startDate: new Date("10/30/2009"),
      refinancing_rate: 0.095,
    },
    {
      startDate: new Date("11/25/2009"),
      refinancing_rate: 0.09,
    },
    {
      startDate: new Date("12/28/2009"),
      refinancing_rate: 0.0875,
    },
    {
      startDate: new Date("02/24/2010"),
      refinancing_rate: 0.085,
    },
    {
      startDate: new Date("03/29/2010"),
      refinancing_rate: 0.0825,
    },
    {
      startDate: new Date("04/30/2010"),
      refinancing_rate: 0.08,
    },
    {
      startDate: new Date("06/01/2010"),
      refinancing_rate: 0.0775,
    },
    {
      startDate: new Date("02/28/2011"),
      refinancing_rate: 0.08,
    },
    {
      startDate: new Date("05/03/2011"),
      refinancing_rate: 0.0825,
    },
    {
      startDate: new Date("12/26/2011"),
      refinancing_rate: 0.08,
    },
    {
      startDate: new Date("09/14/2012"),
      refinancing_rate: 0.0825,
    },
    {
      startDate: new Date("04/07/2013"),
      refinancing_rate: 0.0825,
    },
    {
      startDate: new Date("01/01/2016"),
      refinancing_rate: 0.11,
    },
    {
      startDate: new Date("06/14/2016"),
      refinancing_rate: 0.105,
    },
    {
      startDate: new Date("09/19/2016"),
      refinancing_rate: 0.10,
    },
    {
      startDate: new Date("01/01/2017"),
      refinancing_rate: 0.10,
    },
    {
      startDate: new Date("03/27/2017"),
      refinancing_rate: 0.0975,
    },
    {
      startDate: new Date("05/02/2017"),
      refinancing_rate: 0.0925,
    },
    {
      startDate: new Date("06/19/2017"),
      refinancing_rate: 0.09,
    },
    {
      startDate: new Date("09/18/2017"),
      refinancing_rate: 0.085,
    },
    {
      startDate: new Date("10/30/2017"),
      refinancing_rate: 0.0825,
    },
    {
      startDate: new Date("12/18/2017"),
      refinancing_rate: 0.0775,
    },
    {
      startDate: new Date("02/12/2018"),
      refinancing_rate: 0.075,
    },
    {
      startDate: new Date("03/26/2018"),
      refinancing_rate: 0.0725,
    },
    {
      startDate: new Date("09/17/2018"),
      refinancing_rate: 0.075,
    },
    {
      startDate: new Date("12/17/2018"),
      refinancing_rate: 0.0775,
    },
    {
      startDate: new Date("06/17/2019"),
      refinancing_rate: 0.075,
    },
    {
      startDate: new Date("07/29/2019"),
      refinancing_rate: 0.0725,
    },
    {
      startDate: new Date("09/09/2019"),
      refinancing_rate: 0.07,
    },
    {
      startDate: new Date("10/28/2019"),
      refinancing_rate: 0.065,
    }
    ,
    {
      startDate: new Date("12/16/2019"),
      refinancing_rate: 0.0625,
    }
  ];
}
