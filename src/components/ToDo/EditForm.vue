<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input
        :id="id"
        type="text"
        autocomplete="off"
        v-model.lazy.trim="newTitle" />
    </div>
    <div>
      <button @click="onSubmit" type="button">Сохранить</button>
      <button type="button" @click="onCancel">Отмена</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, type Ref } from 'vue';
import type { Todo } from '@/types/todo';

type EditTodo = Omit<Todo, "completed">;

const props = defineProps<EditTodo>();

const newTitle: Ref = defineModel<string>('newTitle');
newTitle.value = props.title;

const emit = defineEmits<{
  'item-edited': [title: string];
  'edit-cancelled': [];
}>();

function onSubmit() {
  if (newTitle.value && newTitle.value !== props.title) {
    emit('item-edited', newTitle.value);
  }
}

function onCancel() {
  emit('edit-cancelled');
}
</script>
