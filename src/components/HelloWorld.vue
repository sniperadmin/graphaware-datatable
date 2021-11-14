<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
      show-expand
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          More info about {{ item.name }}
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
      computedHeaders() {
        let finals: object[] = []

        if (this.data) {
          finals = hydrateHeadersPerObject(this.data)

          finals.forEach(obj => {
            obj.items = [...hydrateItemsPerObject(this.data)]
          })

          return finals
        }
      },
    },
    data() {
      return {
        expanded: [],
        singleExpand: false,
      }
    },
  })
</script>
