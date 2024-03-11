<template>
  <div id="app" class="todo-list">
    <h1 class="todo-list__header">Список дел</h1>
    <AddForm class="todo-list__add-form"></AddForm>
    <ul>
      <li v-for="item in todoItems" :key="item.id">
        <ToDoItem
          :title="item.title"
          :completed="item.completed"
          :id="item.id"
          class="todo-list__item todo-item"></ToDoItem>
      </li>
    </ul>
    <small>{{ listSummary }}</small>
    <div>
      <small>
        Исходный код:&nbsp;
        <a target="_blank" href="https://github.com/barnicolly/vue-todo-app">
          https://github.com/barnicolly/vue-todo-app
        </a>
      </small>
    </div>
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
    `Выполнено задач: ${store.allCompletedToDoItems.length} из ${store.allToDoItems.length}`,
);
</script>
