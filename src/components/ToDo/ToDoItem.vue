<template>
  <div>
    <input
      class="todo-item__checkbox"
      type="checkbox"
      :id="id"
      :checked="isCompleted"
      @change="updateDoneStatus(id)" />

    <div v-if="!isEditing" class="todo-item__content">
      <label class="todo-item__label" @click="toggleToItemEditForm">{{
        title
      }}</label>
      <div class="todo-item__controls">
        <button class="btn btn--delete" type="button" @click="deleteToDo(id)">
          <font-awesome-icon icon="trash-alt" />
        </button>
      </div>
    </div>
    <EditForm
      class="todo-item__content"
      v-else
      :id="id"
      :title="title"
      @item-edited="itemEdited"
      @edit-cancelled="editCancelled"></EditForm>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/store/todo';
import { computed, ref } from 'vue';
import { type Todo } from '@/types/todo';
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
