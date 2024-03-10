<template>
  <form @submit.prevent="onSubmit">
    <input type="text" autocomplete="off" v-model.lazy.trim="title" />
    <button type="button" @click="onSubmit">Добавить</button>
  </form>
</template>

<script setup>
import { useTodoStore } from '@/store/todo';
import { ref } from 'vue';

const title = ref('');
const store = useTodoStore();

function onSubmit() {
  if (title.value === '') {
    return;
  }
  store.addToDo(title.value);
  title.value = '';
}
</script>
