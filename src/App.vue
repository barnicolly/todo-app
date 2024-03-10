<template>
  <div id="app">
    <h1>To-Do List</h1>
    <AddForm></AddForm>
    <h2>{{ listSummary }}</h2>
    <ul>
      <li v-for="item in todoItems" :key="item.id">
        <ToDoItem :title="item.title" :completed="item.completed" :id="item.id"></ToDoItem>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ToDoItem from '@/components/ToDo/ToDoItem.vue';
import AddForm from '@/components/ToDo/AddForm.vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '@/store/todo';
import { onMounted, computed } from 'vue';

const store = useTodoStore();
const { todoItems } = storeToRefs(store);

onMounted(async (): Promise<void> => {
  await store.fetchTodoItems();
});

const listSummary = computed(
  (): string =>
    `Выполнено задач: ${store.allCompletedToDoItems.length}/${store.allToDoItems.length}`,
);
</script>
