<template>
  <div v-if="!isEditing">
    <div>
      <input
        type="checkbox"
        :id="id"
        :checked="isCompleted"
        @change="updateDoneStatus(id)" />
      <label :for="id">{{ title }}</label>
    </div>
    <div>
      <button type="button" @click="toggleToItemEditForm">Редактировать</button>
      <button type="button" @click="deleteToDo(id)">Удалить</button>
    </div>
  </div>
  <EditForm
    v-else
    :id="id"
    :title="title"
    @item-edited="itemEdited"
    @edit-cancelled="editCancelled"></EditForm>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/store/todo';
import { computed, ref } from 'vue';
import type { Todo } from '@/types/todo';
import EditForm from './EditForm.vue';

const props = defineProps<Todo>();

const isCompleted = computed(() => props.completed);
const isEditing = ref(false);

const store = useTodoStore();
const { deleteToDo, updateDoneStatus } = store;

function toggleToItemEditForm() {
  isEditing.value = true;
}
function editCancelled() {
  isEditing.value = false;
}

function itemEdited(newTitle: string) {
  store.editToDo({ title: newTitle, toDoId: props.id });
  isEditing.value = false;
}
</script>
