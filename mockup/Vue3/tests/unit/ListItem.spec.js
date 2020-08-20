import { shallowMount } from '@vue/test-utils'
import ListItem from '@/components/ListItem.vue'

describe('ListItem.vue', () => {
  it('renders props.listItem when passed', () => {
    const listItem = {id:5, text:"title1"};
    const wrapper = shallowMount(ListItem, {
      props: { listItem }
    })
    expect(wrapper.text()).toMatch(listItem.text)
  });
});
