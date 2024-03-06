import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex';
import AddForm from '@/components/ToDo/AddForm.vue';

// todo-misha переделать селекторы как будут классы;
describe('AddForm.vue', () => {
  let wrapper;
  const defaultTitle = '';
  const changedTitle = 'changed-title';
  const addToDoMock = jest.fn();
  const $store = new Store({
    mutations: {
      addToDo: addToDoMock,
    },
  });

  beforeEach(() => {
    wrapper = shallowMount(AddForm, {
      global: {
        mocks: {
          $store,
        },
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
    expect(addToDoMock.mock.calls.length).toBe(1);
    expect(addToDoMock.mock.calls[0][1]).toBe(changedTitle);
    expect(wrapper.vm.title).toBe(defaultTitle);
  });
});

describe('AddForm.vue Snapshot', () => {
  it('has same HTML structure', () => {
    const wrapper = shallowMount(AddForm);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
