import { faker } from '@faker-js/faker';
import { createStore } from 'vuex';
import axios from 'axios';
import { flushPromises } from '@vue/test-utils';
import todoState from '@/store/modules/todo';

const { getters } = todoState;

describe('Todo state, mutators', () => {
  let store;

  beforeEach(() => {
    const todoItems = [
      { id: '1', title: 'title1', completed: false },
    ];
    store = createStore({ ...todoState, ...{ state: { todoItems } } });
  });

  it('addToDo', () => {
    const todoTitle = faker.lorem.sentence();
    store.commit('addToDo', todoTitle);
    const currentToDoItems = getters.allToDoItems(store.state);
    expect(currentToDoItems.length).toBe(2);
    const lastTodo = currentToDoItems.slice(-1)[0];
    expect(lastTodo.title).toBe(todoTitle);
    expect(lastTodo.completed).toBeFalsy();
  });

  it('updateDoneStatus', () => {
    const toDoItems = getters.allToDoItems(store.state);
    const firstTodo = toDoItems[0];
    store.commit('updateDoneStatus', firstTodo.id);
    expect(firstTodo.completed).toBeTruthy();
    store.commit('updateDoneStatus', firstTodo.id);
    expect(firstTodo.completed).toBeFalsy();
  });

  it('editToDo', () => {
    const newTodoTitle = faker.lorem.sentence();
    const toDoItems = getters.allToDoItems(store.state);
    const firstTodo = toDoItems[0];
    store.commit('editToDo', { toDoId: firstTodo.id, title: newTodoTitle });
    expect(firstTodo.title).toBe(newTodoTitle);
  });

  it('deleteToDo', () => {
    expect(store.state.todoItems.length).toBe(1);
    const firstTodo = store.state.todoItems[0];
    store.commit('deleteToDo', firstTodo.id);
    expect(store.state.todoItems.length).toBe(0);
  });

  it('updateTodoItems', () => {
    const toDoItems = getters.allToDoItems(store.state);
    expect(toDoItems.length).toBe(1);
    const newTodoItems = [
      { id: '1', title: 'title1', completed: false },
      { id: '2', title: 'title1', completed: true },
    ];
    store.commit('updateTodoItems', newTodoItems);
    const currentToDoItems = getters.allToDoItems(store.state);
    expect(currentToDoItems.length).toBe(newTodoItems.length);
  });
});

describe('Todo state, actions', () => {
  const todoItems = [
    { id: '1', title: 'title1', completed: false },
  ];

  let store;

  beforeEach(() => {
    store = createStore(todoState);
  });

  it('fetchTodoItems', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: todoItems });
    store.dispatch('fetchTodoItems');
    expect(axios.get).toHaveBeenCalledTimes(1);
    await flushPromises();
    const currentToDoItems = getters.allToDoItems(store.state);
    expect(currentToDoItems.length).toBe(todoItems.length);
  });
});

describe('Todo state, getters', () => {
  const todoItems = [
    { id: '1', title: 'title1', completed: false },
    { id: '2', title: 'title2', completed: true },
    { id: '3', title: 'title3', completed: true },
  ];
  let store;

  beforeEach(() => {
    store = createStore({ ...todoState, ...{ state: { todoItems } } });
  });

  it('allToDoItems', () => {
    const currentToDoItems = getters.allToDoItems(store.state);
    expect(currentToDoItems.length).toBe(3);
    expect(currentToDoItems).toStrictEqual(todoItems);
  });

  it('allCompletedToDoItems', () => {
    const currentToDoItems = getters.allCompletedToDoItems(store.state);
    expect(currentToDoItems.length).toBe(2);
  });
});
