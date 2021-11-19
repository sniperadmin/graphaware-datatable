<template>
  <v-container>
    <!-- SECTION: Parent table -->
    <SingleDataTable data-test="wrapper" :headers="headersCopy" :items="dataCopy" item-key="Identification number" />
    <!-- SECTION: ./Parent table -->
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { hydrateHeadersPerObject, hydrateItemsPerObject } from '../utils/recursive-hydrators'
  import { DataRecord } from '../services/types/definitions'
  import SingleDataTable from './SingleDataTable.vue'

  export default Vue.extend<any, any, any, any>({
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
        headersCopy: [] as object[],
        dataCopy: [] as object[],
      };
    },
    methods: {
      initialize() {
        this.headersCopy = this.generatedHeaders(this.data)
        this.dataCopy = this.generatedItems(this.data).map((o: DataRecord) => o.data)
      },
      generatedHeaders(data: DataRecord[]): void|object[] {
        if (data) {
          return hydrateHeadersPerObject(data);
        }
      },
      generatedItems(data: DataRecord[]): void|object[] {
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
