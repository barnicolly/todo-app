import { faker } from '@faker-js/faker';
import axios from 'axios';
import { flushPromises } from '@vue/test-utils';

import { setActivePinia, createPinia } from 'pinia';
import { useTodoStore } from '@/store/todo';
import { Todo } from '@/types/todo';

describe('Todo state, actions', () => {
  beforeEach(() => {
    const todoItems = [
      { id: '1', title: 'title1', completed: false },
    ] as Todo[];
    setActivePinia(createPinia());
    const store = useTodoStore();
    store.todoItems = todoItems;
  });

  it('addToDo', () => {
    const store = useTodoStore();
    const todoTitle = faker.lorem.sentence();
    store.addToDo(todoTitle);
    const currentToDoItems = store.todoItems;
    expect(currentToDoItems.length).toBe(2);
    const lastTodo = currentToDoItems.slice(-1)[0];
    expect(lastTodo.title).toBe(todoTitle);
    expect(lastTodo.completed).toBeFalsy();
  });

  it('updateDoneStatus', () => {
    const store = useTodoStore();
    const toDoItems = store.todoItems;
    const firstTodo = toDoItems[0];
    store.updateDoneStatus(firstTodo.id);
    expect(firstTodo.completed).toBeTruthy();
    store.updateDoneStatus(firstTodo.id);
    expect(firstTodo.completed).toBeFalsy();
  });

  it('editToDo', () => {
    const store = useTodoStore();
    const newTodoTitle = faker.lorem.sentence();
    const toDoItems = store.todoItems;
    const firstTodo = toDoItems[0];
    store.editToDo({ toDoId: firstTodo.id, title: newTodoTitle });
    expect(firstTodo.title).toBe(newTodoTitle);
  });

  it('deleteToDo', () => {
    const store = useTodoStore();
    expect(store.todoItems.length).toBe(1);
    const firstTodo = store.todoItems[0];
    store.deleteToDo(firstTodo.id);
    expect(store.todoItems.length).toBe(0);
  });

  it('fetchTodoItems', async () => {
    const store = useTodoStore();
    store.$reset();
    const todoItems = [
      { id: '1', title: 'title1', completed: false },
    ] as Todo[];
    jest.spyOn(axios, 'get').mockResolvedValue({ data: todoItems });
    await store.fetchTodoItems();
    expect(axios.get).toHaveBeenCalledTimes(1);
    await flushPromises();
    const currentToDoItems = store.todoItems;
    expect(currentToDoItems.length).toBe(todoItems.length);
  });

  it('updateTodoItems', () => {
    const store = useTodoStore();
    store.$reset();
    const todoItems = [
      { id: '1', title: 'title1', completed: false },
    ] as Todo[];
    store.updateTodoItems(todoItems);
    const currentToDoItems = store.todoItems;
    expect(currentToDoItems.length).toBe(todoItems.length);
    expect(currentToDoItems).toStrictEqual(todoItems);
  });
});

describe('Todo state, getters', () => {
  beforeEach(() => {
    const todoItems = [
      { id: '1', title: 'title1', completed: false },
      { id: '2', title: 'title2', completed: true },
      { id: '3', title: 'title3', completed: true },
    ] as Todo[];
    setActivePinia(createPinia());
    const store = useTodoStore();
    store.todoItems = todoItems;
  });

  it('allToDoItems', () => {
    const store = useTodoStore();
    const { todoItems } = store;
    const currentToDoItems = store.allToDoItems;
    expect(currentToDoItems.length).toBe(3);
    expect(currentToDoItems).toStrictEqual(todoItems);
  });

  it('allCompletedToDoItems', () => {
    const store = useTodoStore();
    const currentToDoItems = store.allCompletedToDoItems;
    expect(currentToDoItems.length).toBe(2);
  });
});
