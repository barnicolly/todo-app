<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input
          :id="id"
          ref="labelInput"
          type="text"
          autocomplete="off"
          v-model.lazy.trim="newLabel"/>
    </div>
    <div>
      <button type="button" @click="onCancel">
        Отмена
      </button>
      <button type="submit">
        Сохранить
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    label: {
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
      newLabel: this.label,
    };
  },
  methods: {
    onSubmit() {
      if (this.newLabel && this.newLabel !== this.label) {
        this.$emit("item-edited", this.newLabel);
      }
    },
    onCancel() {
      this.$emit("edit-cancelled");
    },
  },
  mounted() {
    const labelInputRef = this.$refs.labelInput;
    labelInputRef.focus();
  },
};
</script>