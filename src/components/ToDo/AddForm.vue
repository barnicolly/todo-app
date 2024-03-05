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
export default {
  methods: {
    onSubmit() {
      if (this.title === "") {
        return;
      }
      this.$emit("todo-added", this.title);
      this.title = "";
    },
  },
  data() {
    return {
      title: "",
    };
  },
};
</script>
