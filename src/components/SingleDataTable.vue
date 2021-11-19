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
    @click:row="handleRowClicking"
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
import Vue, { PropOptions } from 'vue'
import { hydrateHeadersPerObject, hydrateItemsPerObject } from '../utils/recursive-hydrators'
import { HeaderObject, DataRecord } from '../services/types/definitions'

export default Vue.extend({
  name: 'SingleDataTable',
  inheritAttrs: false,
  props: {
    headers: {
      type: Array,
      required: true,
    } as PropOptions<object[]>,
    items: {
      type: Array,
      required: true,
    } as PropOptions<object[]>,
    itemKey: {
      type: String,
      default: ''
    }as PropOptions<string>,
    hideFooter: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>
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
    handleDelete(item: object) {
      console.log(this.dataCopy.indexOf(item));
      return this.dataCopy.splice(this.dataCopy.indexOf(item), 1);
    },
    generatedHeaders(data: DataRecord[]): HeaderObject[] {
      return hydrateHeadersPerObject(data)!;
    },
    generatedItems(data: DataRecord[]): object[] {
      return hydrateItemsPerObject(data)!;
    },
    calcItemKey(arr: DataRecord[]) {
      const pickObj: HeaderObject = this.generatedHeaders(arr)[0]
      const key: string = Object.keys(pickObj).find(a => a == 'text')!
      return pickObj[key]
    },
    handleRowClicking(item: any, slot: any) {
      if (Object.keys(item.kids) && Object.keys(item.kids).length)
        slot.expand(!slot.isExpanded)
      }
    }
})
</script>
