<template>
    <div v-if="!allRecipes" class="text-center q-mx-auto q-ma-lg full-width" >
        <q-btn 
        @click="recipeStore.loadMore()" 
        class="full-width margin-x" 
        style="max-width: 400px;" rounded outline>LOAD MORE</q-btn>
    </div>
</template>

<script setup>
import { useRecipeStore } from '~/stores/recipe-store';


const recipeStore = useRecipeStore()

const allRecipes = computed(() => {
    return recipeStore._recipeList.length == recipeStore._pagination.count
})
</script>

<style lang="scss" scoped>

.margin-x {
    width: 90% !important;
    margin-left: 5px !important;
    margin-right: 5px !important;
}
</style>