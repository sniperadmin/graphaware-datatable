import { shallowMount, createLocalVue } from '@vue/test-utils'
import TheDataTable from '@/components/TheDataTable.vue'
import fakeData from "../src/utils/example-data.json"

let wrapper: any;

describe('TheDataTable', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = shallowMount(TheDataTable, {
      localVue,
      propsData: {
        data: fakeData
      }
    })
  })

  it('should mount', () => {
    expect(wrapper.vm).toBeTruthy()
  });

  it('should display parent table', () => {
    const table = wrapper.find("[data-test='parent']")
    expect(table.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    console.log(table.props('headers'));
    expect(table.props('headers')).toEqual([
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
      { text: 'kids', value: 'kids', sortable: true, align: ' d-none' }
    ])
  })
})
