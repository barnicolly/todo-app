import { createStore } from 'vuex'
import todo from './modules/todo'

export const store = createStore({
    modules: {
        todo,
    }
})