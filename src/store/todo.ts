import { defineStore } from 'pinia';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import type { Todo} from '@/types/todo';

interface TodoState {
  todoItems: Todo[];
}

export const useTodoStore = defineStore({
  id: 'todo',
  state: (): TodoState => ({
    todoItems: [] as Todo[],
  }),
  actions: {
    async fetchTodoItems(limit = 5): Promise<void> {
      const items = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`,
      );
      this.todoItems = items.data.map((item: Todo) => ({
        ...item,
        id: item.id.toString(),
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
      const toDoToUpdate = this.todoItems.find((item: Todo) => item.id === toDoId);
      if (!toDoToUpdate) {
        return;
      }
      toDoToUpdate.completed = !toDoToUpdate.completed;
    },
    deleteToDo(toDoId: string) {
      const itemIndex = this.todoItems.findIndex((item: Todo) => item.id === toDoId);
      this.todoItems.splice(itemIndex, 1);
    },
    editToDo({ toDoId, title }: { toDoId: string, title: string }) {
      const toDoToUpdate = this.todoItems.find((item: Todo) => item.id === toDoId);
      if (!toDoToUpdate) {
        return;
      }
      toDoToUpdate.title = title;
    },
  },
  getters: {
    allToDoItems: (state: TodoState) => state.todoItems,
    allCompletedToDoItems(state: TodoState) {
      return state.todoItems.filter((item: Todo) => item.completed);
    },
  },
});
