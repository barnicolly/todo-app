<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off"
      v-model.lazy.trim="title" />
    <button type="submit">Добавить</button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
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
