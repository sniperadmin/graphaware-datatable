<template>
  <v-data-table
    :headers="headersCopy"
    :items="dataCopy"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    data-test="parent"
    :item-key="itemKey"
    show-expand
    calculate-widths
    :hide-default-footer="hideFooter"
    dense
    class="elevation-1"
    v-bind="{ ...$attrs }"
    v-on="$listeners"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="handleDelete(item)"
      >
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <template v-for="(val, firstKey) in item.kids">
          <v-subheader>
            {{ firstKey }}
          </v-subheader>

          <SingleDataTable
            :item-key="calcItemKey(val.records)"
            :headers="generatedHeaders(val.records)"
            :items="generatedItems(val.records).map(m => m.data)"
            hide-footer
            class="mb-8"
          ></SingleDataTable>
        </template>
      </td>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue'
import { hydrateHeadersPerObject, hydrateItemsPerObject } from '@/utils/recursive-hydrators'

export default Vue.extend({
  name: 'SingleDataTable',
  inheritAttrs: false,
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    itemKey: {
      type: String,
      default: ''
    },
    hideFooter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: [],
      singleExpand: false,
      headersCopy: this.headers,
      dataCopy: this.items
    }
  },
  methods: {
    handleDelete(item) {
      console.log(this.dataCopy.indexOf(item));
      this.dataCopy.splice(this.dataCopy.indexOf(item), 1)
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
    },
    calcItemKey(arr) {
      const key = Object.keys(this.generatedHeaders(arr)[0]).find(a => a == 'text')
      return this.generatedHeaders(arr)[0][key]
    }
  }
})
</script>
