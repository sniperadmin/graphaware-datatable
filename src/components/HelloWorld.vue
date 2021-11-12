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
    methods: {
      hydrateHeadersPerObject(rawData: {data: object, kids: object}[]) {
        let allHeaders = []
        const heads = rawData.map((obj) => {
          return obj.data
        })

        heads.forEach((headerObj: object) => {
          let headersObjs = []
          for (const key in headerObj) {
            headersObjs.push({text: key, value: headerObj[key], sortable: true})
          }

          allHeaders.push({ headers: headersObjs })
        })

        return allHeaders
      },
      hydrateItemsPerObject(rawData: {data: object, kids: object}[]) {
        let finals = []
        const rawItems = this.data.map((obj) => {
          return obj.kids
        })

        rawItems.forEach(itemObj => {
          let itemObjs = []
          if (itemObj.has_relatives !== undefined) {
            itemObjs = [...itemObj.has_relatives.records]
          }
          finals.push(...itemObjs)
        })

        return finals
      }
    },
    computed: {
      computedHeaders() {
        let finals: object[] = []

        if (this.data) {
          finals = this.hydrateHeadersPerObject(this.data)

          finals.forEach(obj => {
            obj.items = [...this.hydrateItemsPerObject(this.data)]
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
