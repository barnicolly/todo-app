import { shallowMount } from '@vue/test-utils';
import AppFilters from '@/components/AppFilters.vue';
import { createTestingPinia } from '@pinia/testing';

describe('AppFilters.vue', () => {
  it('should correct initialize', () => {
    const wrapper = shallowMount(AppFilters, {
      props: {
        activeFilter: 'All',
      },
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

    const button = wrapper.find('.toggle-group__button:nth-child(1)');
    expect(wrapper.vm.activeFilter).toBe('All');
    expect(wrapper.vm.filters).toStrictEqual(['All', 'Active', 'Done']);
    expect(button.element.classList).toContain('toggle-group__button--primary');
  });

  it('click active filter', async () => {
    const wrapper = shallowMount(AppFilters, {
      props: {
        activeFilter: 'All',
      },
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

    const activeFilterButton = wrapper.find(
      '.toggle-group__button:nth-child(2)',
    );
    await activeFilterButton.trigger('click');
    expect(activeFilterButton.element.classList).toContain(
      'toggle-group__button--primary',
    );
    expect(wrapper.vm.activeFilter).toBe('Active');
  });
});

describe('AppFilters.vue Snapshot', () => {
  it('has same HTML structure', () => {
    const wrapper = shallowMount(AppFilters, {
      props: {
        activeFilter: 'All',
      },
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
