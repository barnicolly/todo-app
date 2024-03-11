import { shallowMount } from '@vue/test-utils';
import AppFooter from '@/components/AppFooter.vue';

describe('AppFooter.vue Snapshot', () => {
  it('has same HTML structure', () => {
    const wrapper = shallowMount(AppFooter);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
