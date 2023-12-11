<template>
  <NavRecipe />
  <div>
    <div class="row">
      <div v-if="!loading" class="col-md-3 col-sm-6 col-xs-12" v-for="recipe in recipeStore.recipes" :key="recipe.id">
        <div class="q-pa-sm">
          <RecipeCard :recipe=recipe />
        </div>
      </div>
      <div v-else class="full-width">
        <div class="q-mx-auto text-center q-ma-xl w-100">
          <q-spinner color="primary" size="3em" :thickness="10" />
        </div>
      </div>
      <RecipeButtonLoadMore />
      <!-- <recipe-instructions-dialog /> -->
      <!-- <recipe-edit-dialog /> -->
    </div>
  </div>
</template>

<script setup>
import { useRecipeStore } from '~/stores/recipe-store';
import { useLoadingStore } from '~/stores/loading-store';

definePageMeta({ layout: 'home', isSecure: false })
const recipeStore = useRecipeStore()
const loadingStore = useLoadingStore();



const loading = computed(() => {
  return loadingStore.loadingRecipes
})

// need to use nextTick to properly render initial data
await nextTick(() => {
  recipeStore.getSources()
  recipeStore.getRecipes()
})

</script>

<style scoped></style>