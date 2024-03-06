import { flushPromises, mount } from '@vue/test-utils';

import axios from 'axios';
import App from '../src/App.vue';
import store from '../src/store';

const mockTodoItems = [
  { id: '1', title: 'title1', completed: false },
  { id: '2', title: 'title2', completed: true },
];

describe('App.vue Snapshot', () => {
  it('has same HTML structure', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockTodoItems });
    const wrapper = mount(App, {
      global: {
        plugins: [store],
      },
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    await flushPromises();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
