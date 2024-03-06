import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default {
  state: {
    todoItems: [],
  },
  actions: {
    async fetchTodoItems({ commit }, limit = 5) {
      const items = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
      // const items = res.json();
      commit('updateTodoItems', items.data.map((item) => ({
        ...item,
        id: item.id.toString(),
      })));
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
  mutations: {
    addToDo(state, toDoLabel) {
      state.todoItems.push({
        id: uuidv4(),
        title: toDoLabel,
        completed: false,
      });
    },
    updateDoneStatus(state, toDoId) {
      const toDoToUpdate = state.todoItems.find((item) => item.id === toDoId);
      toDoToUpdate.completed = !toDoToUpdate.completed;
    },
    deleteToDo(state, toDoId) {
      const itemIndex = state.todoItems.findIndex((item) => item.id === toDoId);
      state.todoItems.splice(itemIndex, 1);
    },
    updateTodoItems(state, items) {
      state.todoItems = items;
    },
    editToDo(state, { toDoId, title }) {
      const toDoToUpdate = state.todoItems.find((item) => item.id === toDoId);
      toDoToUpdate.title = title;
    },
  },
};
