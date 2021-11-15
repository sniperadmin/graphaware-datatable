<template>
  <v-container>
    <v-data-table
      :headers="computedHeaders.headers"
      :items="computedItems[0]"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="Identification number"
      @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
      show-expand
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          More info about {{ item }}
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { hydrateHeadersPerObject, hydrateItemsPerObject } from '@/utils/recursive-hydrators'

  export default Vue.extend({
    name: 'HelloWorld',
    props: {
      headers: {
        type: Array,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      }
    },

    computed: {
      computedPayload() {
        let finals: object[] = []

        if (this.data) {
          finals = hydrateHeadersPerObject(this.data)

          finals.forEach(obj => {
            obj.items = [...hydrateItemsPerObject(this.data)]
          })

          return finals
        }
      },
      computedHeaders() {
        if (this.data) {
          return hydrateHeadersPerObject(this.data)[0]
        }
      },
      computedItems() {
        if (this.data) {
          return hydrateItemsPerObject(this.data)
        }
      }
    },
    data() {
      return {
        expanded: [],
        singleExpand: false,
      }
    },
  })
</script>
