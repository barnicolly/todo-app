import { defineStore } from 'pinia';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import type { Todo } from '@/types/todo';
import { capitalize } from '@/helpers/string';
import { Filter } from '@/types/filter';

interface TodoState {
  todoItems: Todo[];
  filter: Filter;
}

export const useTodoStore = defineStore({
  id: 'todo',
  state: (): TodoState => ({
    todoItems: [] as Todo[],
    filter: Filter.All,
  }),
  actions: {
    async fetchTodoItems(limit = 5): Promise<void> {
      const items = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`,
      );
      this.todoItems = items.data.map((item: Todo) => ({
        ...item,
        id: item.id.toString(),
        title: capitalize(item.title),
      }));
    },
    addToDo(toDoLabel: string) {
      this.todoItems.push({
        id: uuidv4(),
        title: toDoLabel,
        completed: false,
      });
    },
    updateDoneStatus(toDoId: string) {
      const toDoToUpdate = this.todoItems.find(
        (item: Todo) => item.id === toDoId,
      );
      if (!toDoToUpdate) {
        return;
      }
      toDoToUpdate.completed = !toDoToUpdate.completed;
    },
    deleteToDo(toDoId: string) {
      const itemIndex = this.todoItems.findIndex(
        (item: Todo) => item.id === toDoId,
      );
      this.todoItems.splice(itemIndex, 1);
    },
    editToDo({ toDoId, title }: { toDoId: string; title: string }) {
      const toDoToUpdate = this.todoItems.find(
        (item: Todo) => item.id === toDoId,
      );
      if (!toDoToUpdate) {
        return;
      }
      toDoToUpdate.title = title;
    },
    setFilter(filter: Filter) {
      this.filter = filter;
    },
  },
  getters: {
    filteredTodos(): Todo[] {
      switch (this.filter) {
        case Filter.Active:
          return this.activeTodos;
        case Filter.Done:
          return this.allCompletedToDoItems;
        case Filter.All:
        default:
          return this.allToDoItems;
      }
    },
    activeTodos(): Todo[] {
      return this.todoItems.filter((todo) => !todo.completed);
    },
    allToDoItems: (state: TodoState): Todo[] => state.todoItems,
    allCompletedToDoItems(state: TodoState): Todo[] {
      return state.todoItems.filter((item: Todo) => item.completed);
    },
  },
});
