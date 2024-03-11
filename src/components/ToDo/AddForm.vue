<template>
  <form @submit.prevent="onSubmit">
    <input type="text" autocomplete="off" v-model.trim="title" />
    <button class="btn btn--add" type="button" @click="onSubmit">
      <font-awesome-icon icon="plus" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/store/todo';
import { ModelRef } from 'vue';

const title: ModelRef<string | undefined, string> = defineModel({
  default: '',
});
const store = useTodoStore();

function onSubmit() {
  if (title.value === undefined || title.value === '') {
    return;
  }
  store.addToDo(title.value);
  title.value = '';
}
</script>
