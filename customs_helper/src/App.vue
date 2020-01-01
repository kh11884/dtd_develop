<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <div>
            <router-link tag="div" to="/">
              <v-row>
                <v-icon>mdi-currency-usd</v-icon>
                <v-icon>mdi-currency-eur</v-icon>
                <v-icon>mdi-currency-rub</v-icon>
                <v-list-item-content class="ml-2">
                  <v-list-item-title>Калькулятор ТС</v-list-item-title>
                </v-list-item-content>
              </v-row>
            </router-link>
            </div>
        </v-list-item>

        <v-list-item link>
          <div>
            <router-link tag="div" to="/HelloWorld">
              <v-row>
                <v-icon>mdi-percent-outline</v-icon>
                <v-icon>mdi-currency-usd-off</v-icon>
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
                  <v-icon>mdi-cash-multiple</v-icon>
                  <v-list-item-content class="ml-2">
                    <v-list-item-title>Расчет процентов<br/> для рассрочки платежа</v-list-item-title>
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
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Приложения</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
<!--      <v-container-->
<!--        class="fill-height"-->
<!--        fluid-->
<!--      >-->
<!--        <v-row-->
<!--          align="center"-->
<!--          justify="center"-->
<!--        >-->
<!--          <v-col class="text-center">-->
<!--            <v-tooltip left>-->
<!--              <template v-slot:activator="{ on }">-->
<!--                <v-btn-->
<!--                  :href="source"-->
<!--                  icon-->
<!--                  large-->
<!--                  target="_blank"-->
<!--                  v-on="on"-->
<!--                >-->
<!--                  <v-icon large>mdi-code-tags</v-icon>-->
<!--                </v-btn>-->
<!--              </template>-->
<!--              <span>Source</span>-->
<!--            </v-tooltip>-->

<!--            <v-tooltip right>-->
<!--              <template v-slot:activator="{ on }">-->
<!--                <v-btn-->
<!--                  icon-->
<!--                  large-->
<!--                  href="https://codepen.io/johnjleider/pen/zgxeLQ"-->
<!--                  target="_blank"-->
<!--                  v-on="on"-->
<!--                >-->
<!--                  <v-icon large>mdi-codepen</v-icon>-->
<!--                </v-btn>-->
<!--              </template>-->
<!--              <span>Codepen</span>-->
<!--            </v-tooltip>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-container>-->
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
    // import HelloWorld from './components/HelloWorld';

    export default {
        name: 'App',

        // components: {
        //     HelloWorld,
        // },

        props: {
            source: String,
        },

        data: () => ({
            drawer: null,
        }),
    };
</script>
