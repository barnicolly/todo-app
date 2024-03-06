<template>
  <div v-if="!isEditing">
    <div>
      <input
          type="checkbox"
          :id="id"
          :checked="isCompleted"
          @change="updateDoneStatus(id)"/>
      <label :for="id">{{ title }}</label>
    </div>
    <div>
      <button
          type="button"
          @click="toggleToItemEditForm">
        Редактировать
      </button>
      <button type="button" @click="deleteToDo(id)">
        Удалить
      </button>
    </div>
  </div>
  <EditForm
      v-else
      :id="id"
      :title="title"
      @item-edited="itemEdited"
      @edit-cancelled="editCancelled"></EditForm>
</template>

<script>
import { mapMutations } from 'vuex';
import EditForm from './EditForm.vue';

export default {
  components: {
    EditForm,
  },
  props: {
    title: { required: true, type: String },
    completed: { default: false, type: Boolean },
    id: { required: true, type: String },
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
    ...mapMutations([
      'deleteToDo',
      'updateDoneStatus',
      'editToDo',
    ]),
    toggleToItemEditForm() {
      this.isEditing = true;
    },
    itemEdited(newTitle) {
      this.editToDo({ title: newTitle, toDoId: this.id });
      this.isEditing = false;
    },
    editCancelled() {
      this.isEditing = false;
    },
  },
};
</script>
