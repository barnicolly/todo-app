<template>
  <aside class="todo-list__filters">
    <section class="toggle-group">
      <button
        v-for="filter in filters"
        :key="filter"
        class="toggle-group__button"
        :class="{ 'toggle-group__button--primary': activeFilter === filter }"
        @click="setFilter(filter)">
        {{ filter }}
      </button>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { Filter } from '@/types/filter';
import { ref } from 'vue';
import { useTodoStore } from '@/store/todo';
import { storeToRefs } from 'pinia';

const store = useTodoStore();
const { filter: activeFilter } = storeToRefs(store);

const filters = ref([Filter.All, Filter.Active, Filter.Done]);

function setFilter(filter: Filter): void {
  store.setFilter(filter);
}
</script>
