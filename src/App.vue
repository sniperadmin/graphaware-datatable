<template>
  <DefaultLayout>
    <FunctionalWrapper
      :data="tableData"
    />
  </DefaultLayout>
</template>

<script lang="ts">
  import Vue from "vue";
  import DefaultLayout from "./layouts/DefaultLayout.vue"
  import FunctionalWrapper from "./components/FunctionalWrapper.vue"
  import fakeData from "@/utils/example-data.json"

  export default Vue.extend({
    name: 'App',
    components: {
      DefaultLayout,
      FunctionalWrapper
    },
    data() {
      return {
        tableData: fakeData,
      }
    }
  });
</script>
