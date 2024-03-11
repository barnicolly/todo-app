<template>
  <div class="todo-list">
    <h1 class="todo-list__header">Список дел</h1>

    <CAlert
      color="danger"
      :visible="alert !== ''"
      dismissible
      @close="closeAlert">
      <div>{{ alert }}</div>
    </CAlert>
    <AddForm class="todo-list__add-form"></AddForm>

    <draggable v-model="todoItems" item-key="id">
      <template #item="{ element }">
        <ToDoItem
          :title="element.title"
          :completed="element.completed"
          :id="element.id"
          class="todo-list__item todo-item"></ToDoItem>
      </template>
    </draggable>
    <small>{{ listSummary }}</small>
    <div>
      <small>
        Элементы можно переносить, редактирование по клику на текст элемента
      </small>
    </div>
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
import { CAlert } from '@coreui/vue';
import { useAlertStore } from '@/store/alert';
import draggable from 'vuedraggable';

const store = useTodoStore();
const alertStore = useAlertStore();
const { todoItems } = storeToRefs(store);
const { alert } = storeToRefs(alertStore);

function closeAlert() {
  alertStore.removeAlert();
}

onMounted(async (): Promise<void> => {
  await store.fetchTodoItems();
});

const listSummary = computed(
  (): string =>
    `Выполнено задач: ${store.allCompletedToDoItems.length} из ${store.allToDoItems.length}`,
);
</script>
