import { defineStore } from 'pinia';

export const exampleLoader = {
  id: 'unique_id',
  isLoading: false,
  type: 'bar'
}

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loaders: [],

  }),
  getters: {
    all: (state) => state.loaders,
    loading: (state, id) => {
      return state.loaders.filter((value, index, arr) => value.id === id)
    }
  },
  actions: {
    create(id, type) {
      this.loaders.push({ id: id, type: type, isLoading: true })
    },
    remove(id) {
      const indx = this.loaders.findIndex((value, index, obj) => {
        return value.id === id
      })

      this.loaders.splice(this.loaders.indexOf(indx), 1)
    }
  },
});
