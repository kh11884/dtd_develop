<template>
  <div class="print">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="7" lg="5">
        <v-card min-width="585" :class="{'green lighten-5': allSelected}">
          <v-container class="pt-0">
            <v-row>
              <v-col class="pb-0">
                <v-card-text class="py-0">
                  <v-row>
                    <v-col>
                      <div></div>
                    </v-col>
                    <v-col>
                      <div class="headline">Чек-лист</div>
                    </v-col>
                    <v-col>
                      <div class="my-2 ma-2">
                        <v-btn
                          color="primary"
                          class="d-print-none"
                          @click="print"
                        >Печать
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-text class="headline py-0">
                  <v-row>
                    <v-text-field
                      label="AWB:"
                      :dense="true"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-text-field
                      label="Внутренний номер ДТ:"
                      :dense="true"
                    ></v-text-field>
                  </v-row>
                </v-card-text>
                <v-card-text>
                  <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="items"
                    show-select
                    :items-per-page="15"
                    hide-default-footer
                    hide-default-header
                    item-key="name"
                    :single-select="singleSelect"
                    :class="{'green--text': allSelected}"
                  >
                  </v-data-table>
                </v-card-text>

              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    export default {
        name: "checkList",
        data() {
            return {
                selected: [],
                singleSelect: false,
                headers: [
                    {
                        text: 'Проверка',
                        value: 'name',
                    },
                ],
                items: [
                    {
                        name: "количество мест"
                    },
                    {
                        name: "вес"
                    },
                    {
                        name: "декларант"
                    },
                    {
                        name: "номер накладной в гр.44 (общей / индивидуальной)"
                    },
                    {
                        name: "дата накладной"
                    },
                    {
                        name: "стоимость (гр. 42)"
                    },
                    {
                        name: "Валюта (гр. 22)"
                    },
                    {
                        name: "Бесплатность/платность поставки (гр. 24, ДТС1/ДТС2)"
                    },
                    {
                        name: "таможенная стоимость (расчет альтернативным способом)"
                    },
                    {
                        name: "ТН ВЭД  <-->   гр. 31 (проверка соотвествия кода ТН ВЭД описанию в гр. 31)"
                    },
                    {
                        name: "Партийный/Серийный номера"
                    },
                    {
                        name: "количество товара"
                    },
                    {
                        name: "разрешительные документы в гр. 44 (лицензия, СГР, сертификация, документы по льготам)"
                    },
                ]
            }
        },
        methods: {
            print() {
                window.print();
            }
        },
        computed: {
            allSelected() {
                return this.selected.length === this.items.length;
            }
        }
    }
</script>

<style scoped>

</style>
