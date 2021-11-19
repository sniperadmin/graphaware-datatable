import { shallowMount, createLocalVue } from '@vue/test-utils'
import FunctionalWrapper from '@/components/FunctionalWrapper.vue'
import fakeData from "../src/utils/example-data.json"


let wrapper: any;

describe('FunctionalWrapper', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = shallowMount(FunctionalWrapper, {
      localVue,
      propsData: {
        data: fakeData,
      },
    })
  })

  it('should mount', () => {
    expect(wrapper.vm).toBeTruthy()
  });

  it('should display parent table', () => {
    const table = wrapper.find("[data-test='wrapper']")

    expect(table.exists()).toBe(true)
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
