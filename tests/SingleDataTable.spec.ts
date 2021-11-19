import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import SingleDataTable from '@/components/SingleDataTable.vue'


let wrapper: any;

describe('SingleDataTable', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = shallowMount(SingleDataTable, {
      localVue,
      propsData: {
        headers: [],
        items: []
      },
    })
  })

  xit('should mount', () => {
    expect(wrapper.vm).toBeTruthy()
  });

  xit('should display parent table', () => {
    const table = wrapper.find("[data-test='parent']")

    expect(table.exists()).toBe(true)
  })
})
