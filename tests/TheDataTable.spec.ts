import { shallowMount, createLocalVue } from '@vue/test-utils'
import SingleDataTable from '@/components/SingleDataTable.vue'
import fakeData from "../src/utils/example-data.json"
// import { hydrateHeadersPerObject, hydrateItemsPerObject } from '@/utils/recursive-hydrators'

// const headers = hydrateHeadersPerObject(fakeData)
// const items = hydrateItemsPerObject(fakeData)

let wrapper: any;

describe('SingleDataTable', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = shallowMount(SingleDataTable, {
      localVue,
      propsData: {
        data: fakeData,
        headers: [],
        items: []
      }
    })
  })

  xit('should mount', () => {
    expect(wrapper.vm).toBeTruthy()
  });

  xit('should display parent table', () => {
    const table = wrapper.find("[data-test='parent']")
    expect(table.exists()).toBe(true)
    console.log(table.props('headers'));
    expect(table.props('headers')).toStrictEqual([
      {
        text: 'Identification number',
        value: 'Identification number',
        sortable: true
      },
      { text: 'Name', value: 'Name', sortable: true },
      { text: 'Gender', value: 'Gender', sortable: true },
      { text: 'Risk', value: 'Risk', sortable: true },
      { text: 'Hair length', value: 'Hair length', sortable: true },
      { text: 'IQ', value: 'IQ', sortable: true },
      { text: 'Admission date', value: 'Admission date', sortable: true },
      { text: 'Last breakdown', value: 'Last breakdown', sortable: true },
      { text: 'Yearly fee', value: 'Yearly fee', sortable: true },
      {
        text: 'Knows the Joker?',
        value: 'Knows the Joker?',
        sortable: true
      },
      { text: 'kids', value: 'kids', sortable: true, align: ' d-none' },
      { text: 'Actions', value: 'actions', sortable: false }
    ])
  })
})
