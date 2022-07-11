
import { createStore } from 'vuex'
import toyStore from './toy-store.js'
export const myStore = createStore({
    strict: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        toyStore
    }
})
