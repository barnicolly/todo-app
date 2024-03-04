<template>
  <div id="app">
    <h1>To-Do List</h1>
    <add-form @todo-added="addToDo"></add-form>
    <h2 id="list-summary" ref="listSummary" tabindex="-1">{{ listSummary }}</h2>
    <ul aria-labelledby="list-summary">
      <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item
            :label="item.label"
            :done="item.done"
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
import uniqueId from "lodash.uniqueid";

function generateUniqueId() {
  return uniqueId("todo-");
}

export default {
  name: "app",
  components: {
    ToDoItem,
    AddForm,
  },
  data() {
    return {
      ToDoItems: [
        {id: generateUniqueId(), label: "Создать прототип приложения", done: true},
        {
          id: generateUniqueId(),
          label: "Добавить ESLint",
          done: true,
        },
        {id: generateUniqueId(), label: "Обернуть в docker", done: true},
        {id: generateUniqueId(), label: "Написать тесты", done: false},
      ],
    };
  },
  methods: {
    addToDo(toDoLabel) {
      this.ToDoItems.push({
        id: generateUniqueId(),
        label: toDoLabel,
        done: false,
      });
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToUpdate.done = !toDoToUpdate.done;
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId);
      this.ToDoItems.splice(itemIndex, 1);
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToEdit.label = newLabel;
    },
  },
  computed: {
    listSummary() {
      const numberFinishedItems = this.ToDoItems.filter(
          (item) => item.done
      ).length;
      return `Выполнено задач: ${numberFinishedItems}/${this.ToDoItems.length}`;
    },
  },
};
</script>