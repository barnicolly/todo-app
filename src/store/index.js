import { createStore } from 'vuex';
import todo from '@/store/modules/todo';

export default createStore({
  modules: {
    todo,
  },
});
