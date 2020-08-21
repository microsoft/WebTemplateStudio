import { shallowMount } from '@vue/test-utils'
import ListForm from '@/components/ListForm.vue'
import CONSTANTS from "@/constants";

describe('ListForm.vue', () => {
  it('renders props.title when passed', async () => {
    const value = "1";
    const emptyError = CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE;
    const wrapper = shallowMount(ListForm, {
      props: { value }
    })
    await wrapper.find('.form-control').trigger('click');
    expect(wrapper.text()).toMatch(emptyError);
  });
});
