<template>
    <q-input
        style="min-width: 200px"
        color="dark"
        v-model="filterStore._search"
        input-class="text-right"
        class="q-ml-md text-dark w-25"
        debounce="500"
        label="Type to search"
        clearable
        @clear="cleared"
        @update:model-value="update"
      >
        <template v-slot:append>
          <q-icon v-if="filterStore.search === ''" name="search" class="text-dark" />
        </template>
      </q-input>
</template>

<script setup>
import { useFilterStore } from '~/stores/filter-store'
import { useRecipeStore } from '~/stores/recipe-store'
const filterStore = useFilterStore()
const recipeStore = useRecipeStore()

onMounted(() => {
    filterStore._search = ''
})

const cleared = () => {
    recipeStore.getRecipes()
    filterStore._search = ''
}

const update = () => {
    recipeStore.getRecipes()
}
</script>

<style lang="scss" scoped>

</style>