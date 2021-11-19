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
  import Stats from 'stats.js'

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
    },
    mounted() {
      const stats = new Stats()
      stats.showPanel(0)

      document.getElementById('app').appendChild(stats.dom)
      stats.dom.style.left = ''
      stats.dom.style.right = '0px'
      stats.dom.style.top = '20%'
      function animate() {
        stats.begin();
        // monitored code goes here
        stats.end();
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    }
  });
</script>
