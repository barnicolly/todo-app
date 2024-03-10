<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      autocomplete="off"
      v-model.lazy.trim="title" />
    <button type="button" @click="onSubmit">Добавить</button>
  </form>
</template>

<script>
import { useTodoStore } from '@/store/todo';
import { mapActions } from 'pinia';

export default {
  methods: {
    ...mapActions(useTodoStore, [
      'addToDo',
    ]),
    onSubmit() {
      if (this.title === '') {
        return;
      }
      this.addToDo(this.title);
      this.title = '';
    },
  },
  data() {
    return {
      title: '',
    };
  },
};
</script>
