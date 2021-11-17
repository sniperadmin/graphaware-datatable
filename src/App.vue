<template>
  <DefaultLayout>
    <TheDataTable
      :data="tableData"
    />
  </DefaultLayout>
</template>

<script lang="ts">
  import Vue from "vue";
  import DefaultLayout from "./layouts/DefaultLayout.vue"
  import TheDataTable from "./components/TheDataTable.vue"
  import fakeData from "@/utils/example-data.json"

  export default Vue.extend({
    name: 'App',
    components: {
      DefaultLayout,
      TheDataTable
    },
    data() {
      return {
        tableData: fakeData,
      }
    }
  });
</script>
