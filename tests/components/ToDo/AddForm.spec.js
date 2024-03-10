import { shallowMount } from '@vue/test-utils';
import AddForm from '@/components/ToDo/AddForm.vue';
import { createTestingPinia } from '@pinia/testing';
import { useTodoStore } from '@/store/todo';

// todo-misha переделать селекторы как будут классы;
describe('AddForm.vue', () => {
  let wrapper;
  const defaultTitle = '';
  const changedTitle = 'changed-title';

  beforeEach(() => {
    wrapper = shallowMount(AddForm, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
  });

  it('should correct initialize', () => {
    expect(wrapper.vm.title).toBe(defaultTitle);
  });

  it('change title', async () => {
    const input = wrapper.find('input');

    input.element.value = changedTitle;
    await input.trigger('change');

    expect(wrapper.vm.title).toBe(changedTitle);
  });

  it('click add btn', async () => {
    const input = wrapper.find('input');
    input.element.value = changedTitle;
    await input.trigger('change');
    expect(wrapper.vm.title).toBe(changedTitle);

    wrapper.find('button[type="button"]').trigger('click');

    const store = useTodoStore();

    expect(store.addToDo).toHaveBeenCalledTimes(1);
    expect(store.addToDo).toHaveBeenCalledWith(changedTitle);
    expect(wrapper.vm.title).toBe(defaultTitle);
  });
});

describe('AddForm.vue Snapshot', () => {
  it('has same HTML structure', () => {
    const wrapper = shallowMount(AddForm);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
