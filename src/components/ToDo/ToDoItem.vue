<template>
  <div v-if="!isEditing">
    <div>
      <input
          type="checkbox"
          :id="id"
          :checked="isCompleted"
          @change="$emit('checkbox-changed')"/>
      <label :for="id">{{ title }}</label>
    </div>
    <div>
      <button
          type="button"
          @click="toggleToItemEditForm">
        Редактировать
      </button>
      <button type="button" @click="deleteToDo">
        Удалить
      </button>
    </div>
  </div>
  <edit-form
      v-else
      :id="id"
      :title="title"
      @item-edited="itemEdited"
      @edit-cancelled="editCancelled"></edit-form>
</template>

<script>
import EditForm from "./EditForm.vue";

export default {
  components: {
    EditForm,
  },
  props: {
    title: {required: true, type: String},
    completed: {default: false, type: Boolean},
    id: {required: true, type: String},
  },
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    isCompleted() {
      return this.completed;
    },
  },
  methods: {
    deleteToDo() {
      this.$emit("item-deleted");
    },
    toggleToItemEditForm() {
      this.isEditing = true;
    },
    itemEdited(newLabel) {
      this.$emit("item-edited", newLabel);
      this.isEditing = false;
    },
    editCancelled() {
      this.isEditing = false;
    },
  },
};
</script>