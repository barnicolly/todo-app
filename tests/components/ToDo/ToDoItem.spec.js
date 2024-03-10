import { shallowMount, mount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import ToDoItem from '@/components/ToDo/ToDoItem.vue';
import { createTestingPinia } from '@pinia/testing';
import { useTodoStore } from '@/store/todo';

describe('ToDoItem.vue', () => {
  let wrapper;
  const id = faker.string.uuid();
  const title = faker.lorem.sentence();
  const completed = false;

  beforeEach(() => {
    wrapper = shallowMount(ToDoItem, {
      props: {
        title,
        id,
        completed,
      },
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
  });

  it('should correct initialize, checked false', () => {
    const input = wrapper.find('.todo-item__checkbox');
    expect(wrapper.vm.isEditing).toBeFalsy();
    expect(input.element.checked).toBeFalsy();
  });

  it('should correct initialize, checked true', () => {
    wrapper = shallowMount(ToDoItem, {
      props: {
        title,
        id,
        completed: true,
      },
    });
    const input = wrapper.find('.todo-item__checkbox');
    expect(wrapper.vm.isEditing).toBeFalsy();
    expect(input.element.checked).toBeTruthy();
  });

  it('click edit label', () => {
    wrapper.find('.todo-item__label').trigger('click');
    expect(wrapper.vm.isEditing).toBeTruthy();
  });

  it('click edit btn -> save', async () => {
    await wrapper.find('.todo-item__label').trigger('click');
    expect(wrapper.vm.isEditing).toBeTruthy();

    const store = useTodoStore();
    wrapper.vm.itemEdited('changed-title');
    expect(store.editToDo).toHaveBeenCalledTimes(1);
    expect(store.editToDo).toHaveBeenCalledWith({
      title: 'changed-title',
      toDoId: id,
    });
  });

  it('click checkbox, init checked false', async () => {
    const checkbox = wrapper.find('.todo-item__checkbox');
    await checkbox.setChecked();

    const store = useTodoStore();
    expect(checkbox.element.checked).toBeTruthy();
    expect(store.updateDoneStatus).toHaveBeenCalledTimes(1);
    expect(store.updateDoneStatus).toHaveBeenCalledWith(id);
  });

  it('click checkbox, init checked true', async () => {
    wrapper = shallowMount(ToDoItem, {
      props: {
        title,
        id,
        completed: true,
      },
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    const checkbox = wrapper.find('.todo-item__checkbox');
    await checkbox.setValue(false);
    expect(checkbox.element.checked).toBeFalsy();
    const store = useTodoStore();
    expect(store.updateDoneStatus).toHaveBeenCalledTimes(1);
    expect(store.updateDoneStatus).toHaveBeenCalledWith(id);
  });

  it('click delete btn', () => {
    wrapper.find('.btn--delete').trigger('click');
    const store = useTodoStore();
    expect(store.deleteToDo).toHaveBeenCalledTimes(1);
    expect(store.deleteToDo).toHaveBeenCalledWith(id);
  });
});

describe('ToDoItem.vue Snapshot', () => {
  it('has same HTML structure, without edit', () => {
    const wrapper = mount(ToDoItem, {
      props: {
        title: 'some-title',
        id: 'some-uuid',
        completed: false,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('has same HTML structure, edit', async () => {
    const wrapper = mount(ToDoItem, {
      props: {
        title: 'some-title',
        id: 'some-uuid',
        completed: false,
      },
    });
    await wrapper.find('button:nth-child(1)').trigger('click');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
