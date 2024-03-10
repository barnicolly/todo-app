<template>
  <form @submit.prevent="onSubmit">
    <div class="todo-item__content-inner">
      <div class="todo-item__edit-input-wrapper">
        <input
          class="todo-item__edit-input"
          :id="id"
          type="text"
          autocomplete="off"
          v-model.lazy.trim="newTitle" />
      </div>
      <div class="todo-item__controls">
        <button class="btn btn--save" @click="onSubmit" type="button">
          Сохранить
        </button>
        <button class="btn btn--cancel" type="button" @click="onCancel">
          Отмена
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { type Ref } from 'vue';
import type { Todo } from '@/types/todo';

type EditTodoProps = Omit<Todo, 'completed'>;

const props = defineProps<EditTodoProps>();

const newTitle: Ref = defineModel<string>('newTitle');
newTitle.value = props.title;

const emit = defineEmits<{
  'item-edited': [title: string];
  'edit-cancelled': [];
}>();

function onSubmit() {
  if (newTitle.value) {
    emit('item-edited', newTitle.value);
  }
}

function onCancel() {
  emit('edit-cancelled');
}
</script>
