<template>
  <div id="app">
    <h1>To-Do List</h1>
    <AddForm></AddForm>
    <h2>{{ listSummary }}</h2>
    <ul>
      <li v-for="item in allToDoItems" :key="item.id">
        <ToDoItem
            :title="item.title"
            :completed="item.completed"
            :id="item.id">
        </ToDoItem>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ToDoItem from '@/components/ToDo/ToDoItem.vue';
import AddForm from '@/components/ToDo/AddForm.vue';

export default {
  name: 'app',
  components: {
    ToDoItem,
    AddForm,
  },
  async mounted() {
    await this.fetchTodoItems();
  },
  methods: {
    ...mapActions([
      'fetchTodoItems',
    ]),
  },
  computed: {
    ...mapGetters([
      'allToDoItems',
      'allCompletedToDoItems',
    ]),
    listSummary() {
      return `Выполнено задач: ${this.allCompletedToDoItems.length}/${this.allToDoItems.length}`;
    },
  },
};
</script>
