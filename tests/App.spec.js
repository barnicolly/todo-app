import { flushPromises, mount } from '@vue/test-utils';

import axios from 'axios';
import App from '@/App.vue';
import { createTestingPinia } from '@pinia/testing';
import each from 'jest-each';

const mockTodoItems = [
  { id: '1', title: 'title1', completed: false },
  { id: '2', title: 'title2', completed: true },
];

each([
  ['all', mockTodoItems],
  ['active', mockTodoItems.filter((todo) => !todo.completed)],
  ['done', mockTodoItems.filter((todo) => todo.completed)],
]).test('filter %s', async (filter, todoItems) => {
  jest.spyOn(axios, 'get').mockResolvedValue({ data: todoItems });
  const wrapper = mount(App, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
    },
  });
  expect(axios.get).toHaveBeenCalledTimes(1);
  await flushPromises();
  expect(wrapper.html()).toMatchSnapshot();
  jest.clearAllMocks();
});

describe('App.vue Snapshot', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('has same HTML structure', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockTodoItems });
    const wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('has same HTML structure, empty list', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: [] });
    const wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
