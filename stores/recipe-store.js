import { defineStore } from "pinia";
import { useAuthStore } from "./auth-store";
import { useFilterStore } from "./filter-store";
import { useNotificationStore } from "./notification-store";
import { useLoadingStore } from "./loading-store";

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    _recipeList: [],
    _selectedRecipe: {},
    _sources: {},
    _filter: {
      search: ''
    }, 
    _pagination: {},
    _recipe_statistics: {},
    _importRecipe: null,
  }),
  getters: {
    filter: (state) => state._filter,
    recipes: (state) => state._recipeList,
    selected: (state) => state._selectedRecipe,
    sources: (state) => state._sources,
    statistics: (state) => state._recipe_statistics,
    createdRecipe: (state) => state._importRecipe
  },
  actions: {
    selectRecipe(recipe) {
      this._selectedRecipe = recipe
    },
    async getSources() {
      console.log("GETTING SOURCES")
      const config = useRuntimeConfig()
      
      const { data, error } = await useFetch(`${config.public.apiBase}api/sources`)

      if (data.value) {
        this._sources = data.value.results
      }
    },
    setSources(sources) {
      this._sources = sources
    },
    async loadMore() {
      const filterStore = useFilterStore();
      const search = filterStore.search
      let searchStr = '';

      if (search && search.length > 0) {
        searchStr = `&search=${search}`
      }

        const { data, error } = await useFetch(`${this._pagination.next}${searchStr}`)

        this._pagination = {
          next: data.value.next,
          count: data.value.count
        }

        if (data.value) {
          this._recipeList = this._recipeList.concat(data.value.results)
        }
    },
    async getRecipe(id, imported=false) {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      const notificationStore = useNotificationStore()

        const { data, error } = await useFetch(`${config.public.apiBase}api/recipes/${id}/`, 
        { headers: { Authorization: `Bearer ${authStore.accessToken}`}})

        if (data.value) {
          if (imported) {
            this._importRecipe = data.value
            notificationStore.open('secureLayoutBanner', "Succesfully imported recipe", 'positive', 'Dismiss', true)
          } else {
            this._selectedRecipe = data.value
          }
        } else {
          this._importRecipe = null
          notificationStore.open('secureLayoutBanner', "Error importing recipe, please try again", 'negative', 'Dismiss', true)
        }
    },
    async getRecipes() {
      const loadingStore = useLoadingStore();
      loadingStore.setLoadingRecipes(true)
      const filterStore = useFilterStore();
      const search = filterStore.search
      let searchStr = '';

      if (search && search.length > 0) {
        searchStr = `?search=${search}`
      }
      const config = useRuntimeConfig()

        const { data, error } = await useFetch(`${config.public.apiBase}api/recipes${searchStr}`)

        this._pagination = {
          next: data.value.next,
          count: data.value.count
        }

        if (data.value) {
          this._recipeList = data.value.results
          loadingStore.setLoadingRecipes(false)             
        }
    },
    setRecipes(recipes, pagination) {
      const loadingStore = useLoadingStore();
      this._recipeList = recipes
      this._pagination = pagination
      loadingStore.setLoadingRecipes(false) 
    },
    async importRecipe(url) {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()

      const { data, error} = await useFetch(`${config.public.apiBase}api/recipes/`, {
        method: 'POST', body: { url: url }, headers: { Authorization: `Bearer ${authStore.accessToken}`} 
    })

    if (data.value) {
      if (data.value.recipe == null) {
        this._importRecipe = null
      } else {
        await this.getRecipe(data.value.recipe, true)
      }
    }
  }
  },
});
