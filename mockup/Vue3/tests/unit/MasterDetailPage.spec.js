import { shallowMount } from '@vue/test-utils'
import MasterDetailPage from '@/components/MasterDetailPage.vue'

describe('MasterDetailPage.vue', () => {
  it('renders props.title when passed', () => {
    const sampleOrder = {id:5, longDescription:"desc1", orderDate:"date1", orderTotal:"1", shipTo:"1", status:"1", title:"title1"};
    const wrapper = shallowMount(MasterDetailPage, {
      props: { sampleOrder }
    })
    expect(wrapper.text()).toMatch(sampleOrder.title)
  });
});
