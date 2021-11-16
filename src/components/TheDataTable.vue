<template>
  <v-container>
    <v-data-table
      :headers="computedHeaders(data).headers"
      :items="computedItems(data)[0].map(o => o.data)"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      data-test="parent"
      item-key="Identification number"
      @click:row="(item, slot) => {
        if (Object.keys(item.kids).length) {
          slot.expand(!slot.isExpanded)
        }
      }"
      show-expand
      single-expand
      calculate-widths
      dense
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <template v-for="(relVal, relKey, relIndex) in item.kids">
            <v-subheader>
              {{ relKey }}
            </v-subheader>

            <v-data-table
              :headers="computedHeaders(relVal.records).headers"
              :items="computedItems(relVal.records)[0].map(m => m.data)"
              :single-expand="singleExpand"
              :expanded.sync="childExpanded"
              item-key="Relative ID"
              @click:row="(i, s) => s.expand(!s.isExpanded)"
              show-expand
              hide-default-footer
              class="elevation-1 mb-4"
            >
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <template v-for="(firstVal, firstKey, firstIndex) in item.kids">
                    <v-subheader>
                      {{ relKey }}
                    </v-subheader>
                  </template>
                </td>
              </template>
            </v-data-table>
          </template>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { hydrateHeadersPerObject, hydrateItemsPerObject } from '@/utils/recursive-hydrators'

  export default Vue.extend({
    name: 'TheDataTable',
    props: {
      data: {
        type: Array,
        required: true,
      }
    },

    computed: {
      computedHeaders() {
        return (data) => {
          if (data) {
            return hydrateHeadersPerObject(data)[0]
          }
        }
      },
      computedItems() {
        return (data) => {
          if (data) {
            return hydrateItemsPerObject(data)
          }
        }
      }
    },
    data() {
      return {
        expanded: [],
        childExpanded: [],
        singleExpand: false,
      }
    },
  })
</script>
