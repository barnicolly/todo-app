import {v4 as uuidv4} from 'uuid';

export default {
    state: {
        todoItems: [],
    },
    actions: {
        async fetchTodoItems({commit}, limit = 5) {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
            const items = await res.json();
            commit('updateTodoItems', items.map((item) => ({
                    ...item,
                    id: uuidv4(),
                }))
            );
        },
    },
    getters: {
        allToDoItems(state) {
            return state.todoItems
        },
        allCompletedToDoItems(state) {
            return state.todoItems
                .filter(
                    (item) => item.completed
                )
        },
    },
    mutations: {
        addToDo(state, toDoLabel) {
            state.todoItems.push({
                id: uuidv4(),
                title: toDoLabel,
                completed: false,
            });
        },
        updateDoneStatus(state, toDoId) {
            const toDoToUpdate = state.todoItems.find((item) => item.id === toDoId);
            toDoToUpdate.completed = !toDoToUpdate.completed;
        },
        deleteToDo(state, toDoId) {
            const itemIndex = state.todoItems.findIndex((item) => item.id === toDoId);
            state.todoItems.splice(itemIndex, 1);
        },
        updateTodoItems(state, items) {
            state.todoItems = items
        },
        editToDo(state, {toDoId, title}) {
            const toDoToUpdate = state.todoItems.find((item) => item.id === toDoId);
            toDoToUpdate.title = title;
        },
    },
}