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

    <AppFilters />
    <draggable
      v-if="filteredTodos.length"
      v-model="filteredTodos"
      item-key="id"
      class="todo-list__items">
      <template #item="{ element }">
        <ToDoItem
          :title="element.title"
          :completed="element.completed"
          :id="element.id"
          class="todo-list__item todo-item"></ToDoItem>
      </template>
    </draggable>
    <div v-else class="todo-list__empty">Список пуст</div>
    <div>
      <small class="todo-list__summary">{{ listSummary }}</small>
    </div>
    <hr />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import ToDoItem from '@/components/ToDo/ToDoItem.vue';
import AddForm from '@/components/ToDo/AddForm.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppFilters from '@/components/AppFilters.vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '@/store/todo';
import { onMounted, computed } from 'vue';
import { CAlert } from '@coreui/vue';
import { useAlertStore } from '@/store/alert';
import draggable from 'vuedraggable';

const store = useTodoStore();
const alertStore = useAlertStore();
const { filteredTodos } = storeToRefs(store);
const { alert } = storeToRefs(alertStore);

function closeAlert(): void {
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
