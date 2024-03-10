<template>
  <div id="app">
    <h1>To-Do List</h1>
    <AddForm></AddForm>
    <h2>{{ listSummary }}</h2>
    <ul>
      <li v-for="item in todoItems" :key="item.id">
        <ToDoItem :title="item.title" :completed="item.completed" :id="item.id">
        </ToDoItem>
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoItem from '@/components/ToDo/ToDoItem.vue';
import AddForm from '@/components/ToDo/AddForm.vue';
import { mapActions, mapState, mapStores, storeToRefs } from 'pinia';
import { useTodoStore } from '@/store/todo';

export default {
  name: 'app',
  components: {
    ToDoItem,
    AddForm,
  },
  setup() {
    const store = useTodoStore();

    const { todoItems } = storeToRefs(store);
    // const { toggleCompleted, deleteTodo } = store;

    return { todoItems };
  },
  computed: {
    ...mapStores(useTodoStore),
    ...mapState(useTodoStore, ['allToDoItems', 'allCompletedToDoItems']),
    listSummary() {
      return `Выполнено задач: ${this.allCompletedToDoItems.length}/${this.allToDoItems.length}`;
    },
  },
  async mounted() {
    await this.fetchTodoItems();
  },
  methods: {
    ...mapActions(useTodoStore, ['fetchTodoItems']),
  },
};
</script>
