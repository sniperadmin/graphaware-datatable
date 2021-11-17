<template>
  <v-container>
    <!-- SECTION: Parent table -->
    <v-data-table
      :headers="headersCopy"
      :items="dataCopy"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      data-test="parent"
      item-key="Identification number"
      show-expand
      calculate-widths
      dense
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <template v-for="(relVal, relKey, relIndex) in item.kids">
            <v-subheader>
              {{ relKey }}
            </v-subheader>

            <!-- SECTION: Relatives -->
            <v-data-table
              :headers="computedHeaders(relVal.records).headers"
              :items="computedItems(relVal.records).map(m => m.data)"
              :single-expand="singleExpand"
              :expanded.sync="childExpanded"
              item-key="Relative ID"
              @click:row="(i, s) => s.expand(!s.isExpanded)"
              show-expand
              hide-default-footer
              class="elevation-1 mb-4"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <template v-for="(firstVal, firstKey, firstIndex) in item.kids">
                    <v-subheader>
                      {{ firstKey }}
                    </v-subheader>

                    <!-- SECTION: Phones -->
                    <v-data-table
                      :headers="computedHeaders(firstVal.records).headers"
                      :items="computedItems(firstVal.records).map(m => m.data)"
                      :single-expand="singleExpand"
                      :expanded.sync="firstExpanded"
                      item-key="Phone ID"
                      @click:row="(i, s) => s.expand(!s.isExpanded)"
                      show-expand
                      hide-default-footer
                      class="elevation-1 mb-4"
                    >
                      <!-- ... -->
                    </v-data-table>
                    <!-- SECTION: ./Phones -->
                  </template>
                </td>
              </template>
            </v-data-table>
            <!-- SECTION: ./Relatives -->
          </template>
        </td>
      </template>
    </v-data-table>
    <!-- SECTION: ./Parent table -->
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { hydrateHeadersPerObject, hydrateItemsPerObject, deleteObject } from '@/utils/recursive-hydrators'

  export default Vue.extend({
    name: 'TheDataTable',
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
      }
    },

    methods: {
      initialize() {
        this.headersCopy = this.computedHeaders(this.data).headers
        this.dataCopy = this.computedItems(this.data).map(o => o.data)
      },
      deleteItem(item) {
        const res = deleteObject(this.dataCopy, item)
        console.log(res);
      },
      computedHeaders(data) {
        if (data) {
          return hydrateHeadersPerObject(data)[0]
        }
      },
      computedItems(data) {
        if (data) {
          return hydrateItemsPerObject(data)[0]
        }
      }
    },

    created() {
      this.initialize()
    },
  })
</script>
