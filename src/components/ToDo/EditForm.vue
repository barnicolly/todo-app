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

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const newTitle = defineModel('newTitle');
newTitle.value = props.title;

const emit = defineEmits(['item-edited', 'edit-cancelled']);

function onSubmit() {
  if (newTitle.value && newTitle.value !== props.title) {
    emit('item-edited', newTitle.value);
  }
}

function onCancel() {
  emit('edit-cancelled');
}
</script>
