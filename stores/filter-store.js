import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter', {
  state: () => ({
    _search: "",
    _filter: false,
  }),
  getters: {
    search: (state) => state._search, 
    filter: (state) => state._filter
  },
  actions: {
    searchRecipes() {

    }
  },
});
