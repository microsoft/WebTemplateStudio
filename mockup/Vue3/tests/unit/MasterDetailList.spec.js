import { shallowMount } from '@vue/test-utils'
import MasterDetailList from '@/components/MasterDetailList.vue'

describe('MasterDetailList.vue', () => {
  describe('when is active', () => {
    let wrapper;
    const sampleOrder = {imageSrc:"", title:"title0"}, isActive=true;
    beforeEach(()=>{
      wrapper = shallowMount(MasterDetailList, {
        props: { sampleOrder, isActive }
      })
    });

    it('renders props.title when passed', () => {
      expect(wrapper.text()).toMatch(sampleOrder.title)
    });

    it('check active css', () => {
      expect(wrapper.find('.active').exists()).toBe(true);
    });
  });

  describe('when is not active', () => {
    let wrapper;
    const sampleOrder = {imageSrc:"", title:"title1"}, isActive=false;
    beforeEach(()=>{
      wrapper = shallowMount(MasterDetailList, {
        props: { sampleOrder, isActive }
      })
    });

    it('renders props.title when passed', () => {
      expect(wrapper.text()).toMatch(sampleOrder.title)
    });

    it('check not active css', () => {
      expect(wrapper.find('.active').exists()).toBe(false);
    });
  });
});
