<template>
  <div class="print">
  <v-row justify="center">
    <v-col cols="12" sm="10" md="7" lg="5">
      <v-card min-width="585">
        <v-container class="pt-0">
          <v-row>
            <v-col class="pb-0">
              <v-card-text class="headline d-print-none">Чек-лист</v-card-text>
              <v-card-text class="headline">
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
                        name: "таможенная стоимость \n ____________________________расчет альтернативным способом"
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
                        name: "разрешительные документы в гр. 44 (относимость поставки, действительность в т.ч. с использованием официальных интернет ресурсов)"
                    },
                ]
            }
        },
    }
</script>

<style scoped>

</style>
