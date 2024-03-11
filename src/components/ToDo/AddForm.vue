<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      autocomplete="off"
      v-model.trim="title"
      placeholder="Новая задача" />
    <button class="btn btn--add" type="button" @click="onSubmit">
      <font-awesome-icon icon="plus" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/store/todo';
import { ModelRef } from 'vue';
import { useAlertStore } from '@/store/alert';

const title: ModelRef<string, string> = defineModel({
  default: '',
});
const store = useTodoStore();
const alertStore = useAlertStore();

function onSubmit() {
  if (title.value === undefined || title.value === '') {
    alertStore.showAlert('Введите текст новой задачи');
    return;
  }
  store.addToDo(title.value);
  alertStore.removeAlert();
  title.value = '';
}
</script>
