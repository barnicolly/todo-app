<template>
  <div id="app">
    <h1>To-Do List</h1>
    <add-form @todo-added="addToDo"></add-form>
    <h2 tabindex="-1">{{ listSummary }}</h2>
    <ul>
      <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item
            :title="item.title"
            :completed="item.completed"
            :id="item.id"
            @checkbox-changed="updateDoneStatus(item.id)"
            @item-deleted="deleteToDo(item.id)"
            @item-edited="editToDo(item.id, $event)">
        </to-do-item>
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoItem from "./components/ToDo/ToDoItem.vue";
import AddForm from "./components/ToDo/AddForm.vue";
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "app",
  components: {
    ToDoItem,
    AddForm,
  },
  data() {
    return {
      ToDoItems: [],
    };
  },
  async mounted() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
    const items = await res.json();
    this.ToDoItems = items.map((item) => {
      return {
        ...item,
        id: uuidv4(),
      }
    });
  },
  methods: {
    addToDo(toDoLabel) {
      this.ToDoItems.push({
        id: uuidv4(),
        title: toDoLabel,
        completed: false,
      });
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToUpdate.completed = !toDoToUpdate.completed;
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId);
      this.ToDoItems.splice(itemIndex, 1);
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToEdit.title = newLabel;
    },
  },
  computed: {
    listSummary() {
      const numberFinishedItems = this.ToDoItems.filter(
          (item) => item.completed
      ).length;
      return `Выполнено задач: ${numberFinishedItems}/${this.ToDoItems.length}`;
    },
  },
};
</script>