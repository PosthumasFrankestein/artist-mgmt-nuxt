import { defineStore } from 'pinia'
export const userDataStore = defineStore('userData', {
    state: () => ({
        token: null
    }),
    actions: {
    }, persist: true,
})