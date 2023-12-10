<template>
  <div class="border-bottom text-body">
    <q-toolbar class=" q-py-sm">
      <q-btn v-if="authStore.verify" :icon="addRecipe ? 'cancel' : 'add_circle'" round flat @click="addRecipe = !addRecipe"></q-btn>
      <CollectionSelect v-if="authStore.verify" />

      <q-space />
      <FormSearchInput />
      <q-btn v-if="collectionStore.selected" @click="activateFilter"
        :icon="filterStore.filter ? 'filter_alt' : 'filter_alt_off'" flat round></q-btn>
    </q-toolbar>
    <div>
      <q-slide-transition>
        <div v-if="addRecipe" class="position-relative">
          <div class="flex justify-center">
            <q-btn class="q-px-xl q-py-xs" outline size="sm" rounded icon="expand_less"
              @click="addRecipe = false" />
          </div>
          <div class="border q-ma-md">
            <RecipeImport />
            
          </div>
          <!-- <RecipeFilter /> -->
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
import { useAuthStore } from '~/stores/auth-store';

const { currentRoute } = useRouter();
const modalStore = useModalStore();
const filterStore = useFilterStore()
const collectionStore = useCollectionStore()
const recipeStore = useRecipeStore();
const authStore = useAuthStore();

const addRecipe = ref(false);

const activateFilter = () => {
  filterStore._filter = !filterStore.filter

  if (currentRoute.value.name.includes('shoppinglist')) {
    // console.log("filter ingredients")
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