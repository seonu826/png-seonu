import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
    state: () => ({
        filter: 'all',
    }),
    actions: {
        setFilter(value) {
            this.filter = value
        },
        resetFilter() {
            this.filter = 'all'
        },
    },
})