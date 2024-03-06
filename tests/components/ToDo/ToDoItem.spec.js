import { shallowMount, mount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { Store } from 'vuex';
import ToDoItem from '@/components/ToDo/ToDoItem.vue';

// todo-misha переделать селекторы как будут классы;
describe('ToDoItem.vue', () => {
  let wrapper;
  const id = faker.string.uuid();
  const title = faker.lorem.sentence();
  const completed = false;

  const deleteToDoMock = jest.fn();
  const editToDoMock = jest.fn();
  const updateDoneStatusMock = jest.fn();
  const $store = new Store({
    mutations: {
      deleteToDo: deleteToDoMock,
      editToDo: editToDoMock,
      updateDoneStatus: updateDoneStatusMock,
    },
  });

  beforeEach(() => {
    wrapper = shallowMount(ToDoItem, {
      props: {
        title,
        id,
        completed,
      },
      global: {
        mocks: {
          $store,
        },
      },
    });
  });

  it('should correct initialize, checked false', () => {
    const input = wrapper.find('input');
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
    const input = wrapper.find('input');
    expect(wrapper.vm.isEditing).toBeFalsy();
    expect(input.element.checked).toBeTruthy();
  });

  it('click edit btn', () => {
    wrapper.find('button:nth-child(1)').trigger('click');
    expect(wrapper.vm.isEditing).toBeTruthy();
  });

  it('click edit btn -> save', async () => {
    await wrapper.find('button:nth-child(1)').trigger('click');
    expect(wrapper.vm.isEditing).toBeTruthy();

    wrapper.vm.itemEdited('changed-title');
    expect(editToDoMock.mock.calls.length).toBe(1);
    expect(editToDoMock.mock.calls[0][1]).toStrictEqual({ title: 'changed-title', toDoId: id });
  });

  it('click checkbox, init checked false', async () => {
    const checkbox = wrapper.find('input');
    await checkbox.setChecked();
    expect(checkbox.element.checked).toBeTruthy();
    expect(updateDoneStatusMock.mock.calls.length).toBe(1);
    expect(updateDoneStatusMock.mock.calls[0][1]).toBe(id);
  });

  it('click checkbox, init checked true', async () => {
    wrapper = shallowMount(ToDoItem, {
      props: {
        title,
        id,
        completed: true,
      },
      global: {
        mocks: {
          $store,
        },
      },
    });
    const checkbox = wrapper.find('input');
    checkbox.element.checked = false;
    expect(updateDoneStatusMock.mock.calls.length).toBe(1);
    expect(updateDoneStatusMock.mock.calls[0][1]).toBe(id);
  });

  it('click delete btn', () => {
    wrapper.find('button:nth-child(2)').trigger('click');
    expect(deleteToDoMock.mock.calls.length).toBe(1);
    expect(deleteToDoMock.mock.calls[0][1]).toBe(id);
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
