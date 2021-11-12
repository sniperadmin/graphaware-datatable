import { mount, createLocalVue } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

let wrapper: any;

describe('HelloWorld', () => {
  beforeEach(() => {
    const localVue = createLocalVue()
    wrapper = mount(HelloWorld, {
      localVue,
    })
  })

  it('should mount', () => {
    expect(wrapper.vm).toBeTruthy()
  });

})
