import { shallowMount } from '@vue/test-utils'
import GridComponent from '@/components/GridComponent.vue'

describe('GridComponent.vue', () => {
  it('renders props.title when passed', () => {
    const header = "header1", description="description1";
    const wrapper = shallowMount(GridComponent, {
      props: { header, description }
    })
    expect(wrapper.text()).toMatch(header);
    expect(wrapper.text()).toMatch(description);
  });
});
