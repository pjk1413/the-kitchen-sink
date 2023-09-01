<template>
    <NavRecipe />
    <div>
    <div class="row">
      <div
        class="col-md-3 col-sm-6 col-xs-12"
        v-for="recipe in recipeStore.recipes"
        :key="recipe.id"
      >
        <div class="q-pa-sm">
          <RecipeCard :recipe=recipe />
        </div>
      </div>
      <RecipeButtonLoadMore />
      <recipe-instructions-dialog />
      <recipe-edit-dialog />
    </div>
  </div>
</template>

<script setup>
import { useRecipeStore } from '~/stores/recipe-store';
// import { recipes as _recipes } from '~/assets/data/sampleRecipeData'
definePageMeta({ layout: 'secure', isSecure: true })
const recipeStore = useRecipeStore()

// need to use nextTick to properly render initial data
await nextTick(() => {
  recipeStore.getSources()
  recipeStore.getRecipes()
})

</script>

<style lang="scss" scoped>

</style>