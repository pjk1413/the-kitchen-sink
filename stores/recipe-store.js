import { defineStore } from "pinia";
import { useAuthStore } from "./auth-store";
import { useFilterStore } from "./filter-store";
// import { useFilterStore } from "./filter-store";

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    _recipeList: [],
    _selectedRecipe: {},
    _sources: {},
    _filter: {
      search: ''
    }, 
    _pagination: {}
  }),
  getters: {
    filter: (state) => state._filter,
    recipes: (state) => state._recipeList,
    selected: (state) => state._selectedRecipe,
    sources: (state) => state._sources
  },
  actions: {
    selectRecipe(recipe) {
      this._selectedRecipe = recipe
    },
    async getSources() {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      
      const { data, error } = await useFetch(`${config.public.apiBase}api/sources`, {
        headers: { Authorization: `Bearer ${authStore.accessToken}` }
      })
      if (data.value) {
        this._sources = data.value.results
      }
    },
    async loadMore() {
      const filterStore = useFilterStore();
      const search = filterStore.search
      let searchStr = '';

      if (search && search.length > 0) {
        searchStr = `&search=${search}`
      }

      const authStore = useAuthStore()
      const config = useRuntimeConfig()

        const { data, error } = await useFetch(`${this._pagination.next}${searchStr}`, 
        { headers: { Authorization: `Bearer ${authStore.accessToken}`}})

        this._pagination = {
          next: data.value.next,
          count: data.value.count
        }

        if (data.value) {
          this._recipeList = this._recipeList.concat(data.value.results)
        }
    },
    async getRecipes() {
      const filterStore = useFilterStore();
      const search = filterStore.search
      let searchStr = '';

      if (search && search.length > 0) {
        searchStr = `?search=${search}`
      }

      const authStore = useAuthStore()
      const config = useRuntimeConfig()

        const { data, error } = await useFetch(`${config.public.apiBase}api/recipes${searchStr}`, 
        { headers: { Authorization: `Bearer ${authStore.accessToken}`}})

        this._pagination = {
          next: data.value.next,
          count: data.value.count
        }

        if (data.value) {
          this._recipeList = data.value.results    
        }
    }

    
    // async editCollection(data) {
    //   return patch(
    //     `api/collections/${this.selectedCollection.id}/`,
    //     data,
    //     "Error editing collection",
    //     "Succesfully editted collection"
    //   ).then((response) => {
    //     this.selectCollection(response.data);

    //     const colId = this.collectionList.findIndex(
    //       (val) => val.id == this.selectedCollection.id
    //     );
    //     this.collectionList[colId] = response.data;
    //   });
    // },
    // async archiveCollection(id) {
    //   return delete_(
    //     `api/collections/${id}/`,
    //     "Error removing collection",
    //     "Succesfuly removed collection"
    //   ).then((response) => {
    //     this.collectionList.splice(
    //       this.collectionList.indexOf((val) => val.id == id),
    //       1
    //     );
    //   });
    // },
    // async getCollections() {
    //   return get("api/collections/", "Error retrieving collections", null).then(
    //     (response) => {
    //       this.collectionList = response.data;
    //     }
    //   );
    // },
    // async getRecipes() {
    //   return get("api/recipes/", "Error retrieving recipes", null).then(
    //     (response) => {
    //       this.recipeList = response.data;
    //     }
    //   );
    // },
    // async createRecipe(data) {
    //   return post(
    //     "api/recipes/",
    //     data,
    //     "Error creating a new recipe",
    //     "Successfully created a new recipe"
    //   ).then((response) => {
    //     if (response.status === 201) {
    //       this.recipeList.push(response.data);
    //     }
    //   });
    // },
    // async editRecipe(data) {
    //   return patch(
    //     `api/recipes/${data.id}/`,
    //     { title: data.title },
    //     "Error editing recipe",
    //     "Succesfully editted recipe"
    //   );
    // },
    // async archiveRecipe(recipe_id) {
    //   return delete_(
    //     `api/recipes/${recipe_id}/`,
    //     "Error removing recipe",
    //     "Succesfully removed recipe"
    //   ).then((response) => {
    //     this.recipeList.splice(
    //       this.recipeList.findIndex((val) => val.id === recipe_id),
    //       1
    //     );
    //   });
    // },
    // async addRecipeToCollection(recipe_id) {
    //   return patch(
    //     `api/collections/${this.selectedCollection.id}/`,
    //     { add: recipe_id },
    //     "Error adding recipe to collection",
    //     "Add recipe to collection"
    //   ).then((response) => {
    //     this.selectCollection(response.data);

    //     const colId = this.collectionList.findIndex(
    //       (val) => val.id == this.selectedCollection.id
    //     );
    //     this.collectionList[colId] = response.data;
    //   });
    // },
    // async removeRecipeFromCollection(recipe_id) {
    //   return patch(
    //     `api/collections/${this.selectedCollection.id}/`,
    //     { remove: recipe_id },
    //     "Error removing recipe from collection",
    //     "Removed recipe from collection"
    //   ).then((response) => {
    //     // returns whole collection
    //     this.selectCollection(response.data);

    //     const colId = this.collectionList.findIndex(
    //       (val) => val.id == this.selectedCollection.id
    //     );
    //     this.collectionList[colId] = response.data;
    //   });
    // },
    // async getSuggestionsByCollection() {
    //   return get(
    //     `api/suggestions/${this.selectedCollection.id}`,
    //     "Error retrieving suggestions",
    //     null
    //   ).then((response) => {
    //     this.suggestionList = response.data;
    //   });
    // },
    // async swapIngredient(ingredient, alternative) {
    //   return patch(
    //     `api/ingredients/${ingredient.id}/`,
    //     { alternative: alternative.id },
    //     "Error swapping ingredient for alternative",
    //     null
    //   ).then((response) => {
    //     const index = this.selected.recipes.findIndex(
    //       (val) => ingredient.recipe.id === val.id
    //     );
    //     const ingredientIndex = this.selected.recipes[
    //       index
    //     ].ingredients.findIndex((val) => ingredient.id === val.id);
    //     const alternativeIngredientIndex = this.selected.recipes[
    //       index
    //     ].ingredients.findIndex((val) => alternative.id === val.id);

    //     this.selected.recipes[index].ingredients[
    //       ingredientIndex
    //     ].is_alternative = true;
    //     this.selected.recipes[index].ingredients[ingredientIndex].replaces =
    //       this.selected.recipes[index].ingredients[
    //         alternativeIngredientIndex
    //       ].id;

    //     this.selected.recipes[index].ingredients[
    //       alternativeIngredientIndex
    //     ].is_alternative = false;
    //     this.selected.recipes[index].ingredients[
    //       alternativeIngredientIndex
    //     ].replaces = null;
    //   });
    // },
    // async toggleCheckIngredient(ingredient) {
    //   return patch(
    //     `api/details/${ingredient.id}/`,
    //     { is_checked: !ingredient.is_checked },
    //     "Error saving ingredient check",
    //     null
    //   ).then((response) => {
    //     this.selectedCollection.recipes.forEach((recipe) => {
    //       const id = recipe.ingredients.findIndex(
    //         (val) => val.id === ingredient.id
    //       );

    //       if (id > -1) {
    //         recipe.ingredients[id].is_checked =
    //           !recipe.ingredients[id].is_checked;
    //       }
    //     });
    //   });
    // },
  },
});
