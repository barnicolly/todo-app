import { defineStore } from 'pinia';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const useTodoStore = defineStore({
  id: 'todo',
  state: () => ({
    todoItems: [],
  }),
  actions: {
    async fetchTodoItems(limit = 5) {
      const items = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
      this.todoItems = items.data.map((item) => ({
        ...item,
        id: item.id.toString(),
      }));
    },
    addToDo(toDoLabel) {
      this.todoItems.push({
        id: uuidv4(),
        title: toDoLabel,
        completed: false,
      });
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.todoItems.find((item) => item.id === toDoId);
      if (!toDoToUpdate) {
        return;
      }
      toDoToUpdate.completed = !toDoToUpdate.completed;
    },
    deleteToDo(toDoId) {
      const itemIndex = this.todoItems.findIndex((item) => item.id === toDoId);
      this.todoItems.splice(itemIndex, 1);
    },
    editToDo({ toDoId, title }) {
      const toDoToUpdate = this.todoItems.find((item) => item.id === toDoId);
      if (!toDoToUpdate) {
        return;
      }
      toDoToUpdate.title = title;
    },
  },
  getters: {
    allToDoItems: (state) => state.todoItems,
    allCompletedToDoItems(state) {
      return state.todoItems
        .filter(
          (item) => item.completed,
        );
    },
  },
});
