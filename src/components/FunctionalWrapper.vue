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
              :headers="generatedHeaders(relVal.records)"
              :items="relVal.records.map(m => m.data)"
            >
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <template v-for="(firstVal, firstKey, firstIndex) in item.kids">
                    <v-subheader>
                      {{ relKey }}
                    </v-subheader>

                    <SingleDataTable
                      item-key="Phone ID"
                      :headers="generatedHeaders(firstVal.records)"
                      :items="firstVal.records.map(m => m.data)"
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
