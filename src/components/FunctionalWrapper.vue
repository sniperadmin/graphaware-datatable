<template>
  <v-container>
    <!-- SECTION: Parent table -->
    <SingleDataTable :headers="headersCopy" :items="dataCopy" item-key="Identification number" />
    <!-- SECTION: ./Parent table -->
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { hydrateHeadersPerObject, hydrateItemsPerObject } from '@/utils/recursive-hydrators'
  import SingleDataTable from './SingleDataTable.vue'

  export default Vue.extend({
    name: "FunctionalWrapper",
    components: {
      SingleDataTable
    },
    props: {
        data: {
            type: Array,
            required: true,
        }
    },
    data() {
      return {
        headersCopy: null,
        dataCopy: null
      };
    },
    methods: {
      initialize() {
        this.headersCopy = this.generatedHeaders(this.data);
        this.dataCopy = this.generatedItems(this.data).map(o => o.data);
      },
      generatedHeaders(data) {
        if (data) {
          return hydrateHeadersPerObject(data);
        }
      },
      generatedItems(data) {
        if (data) {
          return hydrateItemsPerObject(data);
        }
      }
    },

    created() {
      this.initialize();
    },
})
</script>
