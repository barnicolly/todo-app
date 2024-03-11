<template>
  <form @submit.prevent="onSubmit">
    <input type="text" autocomplete="off" v-model.lazy.trim="title" />
    <button class="btn btn--add" type="button" @click="onSubmit">
      <font-awesome-icon icon="plus" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/store/todo';
import { Ref, ref } from 'vue';

const title: Ref<string> = ref('');
const store = useTodoStore();

function onSubmit() {
  if (title.value === '') {
    return;
  }
  store.addToDo(title.value);
  title.value = '';
}
</script>
