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

    <template v-for="(_, scopedSlotName) in $scopedSlots" #[scopedSlotName]="slotData">
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>

    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue'

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
      default: 'Identification number'
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
    }
  }
})
</script>
