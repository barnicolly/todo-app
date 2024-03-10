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

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newTitle: this.title,
    };
  },
  methods: {
    onSubmit() {
      if (this.newTitle && this.newTitle !== this.title) {
        this.$emit('item-edited', this.newTitle);
      }
    },
    onCancel() {
      this.$emit('edit-cancelled');
    },
  },
};
</script>
