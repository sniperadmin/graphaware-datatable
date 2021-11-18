<template>
  <v-container>
    <!-- SECTION: Parent table -->
    <SingleDataTable :headers="headersCopy" :items="dataCopy">
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <template v-for="(relVal, relKey, relIndex) in item.kids">
            <v-subheader>
              {{ relKey }}
            </v-subheader>

            <SingleDataTable
              item-key="Relative ID"
              :headers="computedHeaders(relVal.records).headers"
              :items="computedItems(relVal.records).map(m => m.data)"
            >
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <template v-for="(firstVal, firstKey, firstIndex) in item.kids">
                    <v-subheader>
                      {{ relKey }}
                    </v-subheader>

                    <SingleDataTable
                      item-key="Patient ID"
                      :headers="computedHeaders(firstVal.records).headers"
                      :items="computedItems(firstVal.records).map(m => m.data)"
                    >
                    </SingleDataTable>
                  </template>
                </td>
              </template>

            </SingleDataTable>
          </template>
        </td>
      </template>
    </SingleDataTable>
    <!-- SECTION: ./Parent table -->
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { hydrateHeadersPerObject, hydrateItemsPerObject, deleteObject } from '@/utils/recursive-hydrators'
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
            expanded: [],
            childExpanded: [],
            firstExpanded: [],
            singleExpand: false,
            headersCopy: null,
            dataCopy: null
        };
    },
    methods: {
        initialize() {
            this.headersCopy = this.computedHeaders(this.data).headers;
            this.dataCopy = this.computedItems(this.data).map(o => o.data);
        },
        deleteItem(item) {
            return deleteObject(this.dataCopy, item);
        },
        computedHeaders(data) {
            if (data) {
                return hydrateHeadersPerObject(data)[0];
            }
        },
        computedItems(data) {
            if (data) {
                return hydrateItemsPerObject(data)[0];
            }
        }
    },
    created() {
      this.initialize();
    },
})
</script>
