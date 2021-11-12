<template>
  <DefaultLayout>
    <HelloWorld
      :headers="dessertHeaders"
      :items="desserts"
      :data="tableData"
    />
  </DefaultLayout>
</template>

<script lang="ts">
  import Vue from "vue";
  import DefaultLayout from "./layouts/DefaultLayout.vue"
  import fakeData from "@/utils/example-data.json"

  export default Vue.extend({
    name: 'App',
    components: {
      DefaultLayout
    },
    data() {
      return {
        tableData: fakeData,
        dessertHeaders: [{
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {
            text: 'Calories',
            value: 'calories'
          },
          {
            text: 'Fat (g)',
            value: 'fat'
          },
          {
            text: 'Carbs (g)',
            value: 'carbs'
          },
          {
            text: 'Protein (g)',
            value: 'protein'
          },
          {
            text: 'Iron (%)',
            value: 'iron'
          },
          {
            text: '',
            value: 'data-table-expand'
          },
        ],
        desserts: [{
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
        ],
      }
    }
  });
</script>