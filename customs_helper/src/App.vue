<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="d-print-none"
    >
      <v-list dense>
        <v-list-item link>
          <div>
            <router-link tag="div" to="/">
              <v-row>
                <v-icon>mdi-home</v-icon>
                <v-list-item-content class="ml-2">
                  <v-list-item-title>На стартовую</v-list-item-title>
                </v-list-item-content>
              </v-row>
            </router-link>
          </div>
        </v-list-item>

        <v-list-item link>
          <div>
            <router-link tag="div" to="/CustomsValueCalc">
              <v-row>
                <v-icon>mdi-cash-multiple</v-icon>
                <v-list-item-content class="ml-2">
                  <v-list-item-title>Калькулятор ТС</v-list-item-title>
                </v-list-item-content>
              </v-row>
            </router-link>
            </div>
        </v-list-item>

        <v-list-item link>
          <div>
            <router-link tag="div" to="/defermentPaymentTableView">
              <v-row>
                <v-icon>mdi-percent-outline</v-icon>
                <v-list-item-content class="ml-2">
                  <v-list-item-title>Расчет процентов<br/> для отсрочки платежа</v-list-item-title>
                </v-list-item-content>
              </v-row>
            </router-link>
          </div>
        </v-list-item>

        <v-list-item
          disabled="disabled">
          <div>
            <router-link tag="div" to="/About">
              <v-list-item-action>
                <v-row>
                  <v-icon>mdi-percent-outline</v-icon>
                  <v-list-item-content class="ml-2">
                    <v-list-item-title>Расчет процентов<br/> для рассрочки платежа</v-list-item-title>
                  </v-list-item-content>
                </v-row>
              </v-list-item-action>
            </router-link>
          </div>
        </v-list-item>

        <v-list-item>
          <div>
            <router-link tag="div" to="/PackageDefermentTable">
              <v-list-item-action>
                <v-row>
                  <v-icon>mdi-percent-outline</v-icon>
                  <v-list-item-content class="ml-2">
                    <v-list-item-title>Групповой расчет процентов<br/> для отсрочки платежа</v-list-item-title>
                  </v-list-item-content>
                </v-row>
              </v-list-item-action>
            </router-link>
          </div>
        </v-list-item>

        <v-list-item
          disabled="disabled">
          <div>
            <router-link tag="div" to="/About">
              <v-list-item-action>
                <v-row>
                  <v-icon>mdi-percent-outline</v-icon>
                  <v-list-item-content class="ml-2">
                    <v-list-item-title>Групповой расчет процентов<br/> для рассрочки платежа</v-list-item-title>
                  </v-list-item-content>
                </v-row>
              </v-list-item-action>
            </router-link>
          </div>
        </v-list-item>

        <v-list-item>
          <div>
            <router-link tag="div" to="/checkList">
              <v-list-item-action>
                <v-row>
                  <v-icon>mdi-clipboard-check-multiple-outline</v-icon>
                  <v-list-item-content class="ml-2">
                    <v-list-item-title>Чек-лист</v-list-item-title>
                  </v-list-item-content>
                </v-row>
              </v-list-item-action>
            </router-link>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
      class="d-print-none"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Приложения</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer
      color="indigo"
      app
      class="d-print-none"
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
    export default {
        name: 'App',

        props: {
            source: String,
        },

        data: () => ({
            drawer: null,
        }),
    };
</script>
