import { defineStore } from 'pinia'
export const userDataStore = defineStore('userData', {
    state: () => ({
        token: null,
        userData: null,
        artistId: null

    }),
    actions: {
    }, persist: true,
})