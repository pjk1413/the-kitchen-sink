import { defineStore } from "pinia";

export const useRecipeUtilityStore = defineStore("recipeUtilityStore", {
  state: () => ({
    isDrawer: false,
    isFilter: false,
    searchText: "",
    createCollectionStatus: false,
    optimizeListStatus: false,
    editStatus: false,
    recipeSteps: false,
    selectedRecipe: null,
    ingredientFilterStatus: false,
  }),
  getters: {
    drawer: (state) => state.isDrawer,
    filter: (state) => state.isFilter,
    search: (state) => state.searchText,
    optimize: (state) => state.optimizeListStatus,
    createCollection: (state) => state.createCollectionStatus,
    steps: (state) => state.recipeSteps,
    recipe: (state) => state.selectedRecipe,
    edit: (state) => state.editStatus,
    ingregidentFilter: (state) => state.ingredientFilterStatus,
  },
  actions: {
    toggleOptimizeListDialog() {
      this.optimizeListStatus = !this.optimizeListStatus;
    },
    toggleCreateCollectionDialog() {
      this.createCollectionStatus = !this.createCollectionStatus;
    },
    toggleRecipeStepsDialog(recipe) {
      this.selectedRecipe = recipe;
      this.recipeSteps = !this.recipeSteps;
    },
    toggleRecipeEditDialog(recipe) {
      this.selectedRecipe = recipe;
      this.editStatus = !this.editStatus;
    },
    toggleIngredientFilter() {
      this.ingredientFilterStatus = !this.ingredientFilterStatus;
    },
    toggleDrawer() {
      this.isDrawer = !this.isDrawer;
    },
    openDrawer() {
      this.isDrawer = true;
    },
    closeDrawer() {
      this.isDrawer = false;
    },
    toggleFilter() {
      this.isFilter = !this.isFilter;
    },
    setSearch(search) {
      this.searchText = search;
    },
  },
});
