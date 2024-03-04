<template>
  <div v-if="!isEditing">
    <div>
      <input
          type="checkbox"
          :id="id"
          :checked="isDone"
          @change="$emit('checkbox-changed')"/>
      <label :for="id">{{ label }}</label>
    </div>
    <div>
      <button
          type="button"
          ref="editButton"
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
      :label="label"
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
    label: {required: true, type: String},
    done: {default: false, type: Boolean},
    id: {required: true, type: String},
  },
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    isDone() {
      return this.done;
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