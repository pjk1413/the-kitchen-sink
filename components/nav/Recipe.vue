<template>
  <div class="border-bottom">
    <q-toolbar class=" q-py-sm">

      <CollectionSelect />

      <q-space />
      <FormSearchInput />
      <q-btn v-if="collectionStore.selected" @click="activateFilter"
        :icon="filterStore.filter ? 'filter_alt' : 'filter_alt_off'" flat round></q-btn>
    </q-toolbar>
    <div>
      <q-slide-transition>
        <div v-if="modalStore.recipeDrawer.isOpen" class="position-relative">
          <div class="flex justify-center">
            <q-btn class="q-px-xl q-py-xs" outline size="sm" rounded icon="expand_less"
              @click="modalStore.close('recipeDrawer')" />
          </div>
          <RecipeFilter />
        </div>
      </q-slide-transition>

    </div>
  </div>
</template>

<script setup>
import { useRecipeStore } from '~/stores/recipe-store';
import { useCollectionStore } from '~/stores/collection-store';
import { useFilterStore } from '~/stores/filter-store';
import { useModalStore } from '~/stores/modal-store';

const { currentRoute } = useRouter();
const modalStore = useModalStore();
const filterStore = useFilterStore()
const collectionStore = useCollectionStore()
const recipeStore = useRecipeStore();

const activateFilter = () => {
  filterStore._filter = !filterStore.filter

  if (currentRoute.value.name.includes('shoppinglist')) {
    console.log("filter ingredients")
  } else {
    if (filterStore.filter && collectionStore.selected) {
      recipeStore._recipeList = collectionStore.selected.recipes
    } else {
      recipeStore.getRecipes()
    }
  }

}

</script>

<style lang="scss" scoped>
.border-bottom {
  // border-bottom: 1px solid black;
  // border-bottom: 2px solid $primary;
  // border: 1px solid black;
}
</style>