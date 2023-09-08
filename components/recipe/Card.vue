<template>
  <div class="card-style text-body">
    <div @click="recipeStore.selectRecipe(props.recipe); modalStore.open('recipePreview');"
      class="card-height background-style rounded-borders shadow-1"
      :style="`background-image: linear-gradient(transparent 10%, black), url('${props.recipe.image_url}');`">
      <div class="q-pa-sm bottom-slot full-width">
        <div>
          <div class="flex full-width justify-end">
            <q-btn :loading="toggling.adding" v-if="!isInSelectedCollection && !favoriteIsSelected && collectionStore.selected" round @click="add"
              flat color="white" icon="add">
            </q-btn> <!-- add to list / remove from list -->
            <q-btn :loading="toggling.removing" v-if="isInSelectedCollection && !favoriteIsSelected && collectionStore.selected" round @click="remove"
              flat color="white" icon="remove">

            </q-btn>
            <q-btn :loading="toggling.favorite" round @click="favorite" flat color="white" :icon="isFavorite ? 'favorite' : 'favorite_border'">

            </q-btn>
            <!-- favorite / unfavorite -->
          </div>
        </div>

        <div class="text-h6 text-right text-weight-light text-white q-mx-md q-mb-md">{{ title }}</div>

      </div>
    </div>
    <!-- link to site where recipe is found -->
    <RecipeButtonSite :link="props.recipe.url" :source="props.recipe.source" />
    <div>
      <!-- makes full screen / via recipe and cook -->
      <RecipeButtonCook :recipe="props.recipe" />
    </div>
  </div>
</template>

<script setup>
import { useRecipeStore } from '~/stores/recipe-store';
import { useModalStore } from '~/stores/modal-store';
import { useCollectionStore } from '~/stores/collection-store';

const props = defineProps({
  recipe: Object
})

const modalStore = useModalStore()
const recipeStore = useRecipeStore()
const collectionStore = useCollectionStore();

const title = ref("")
const subtitle = ref("")
const toggling = ref({favorite: false, adding: false, removing: false})

onMounted(() => {
  let result = props.recipe.title.split("with")
  if (result.length > 1) {
    title.value = result[0]
    subtitle.value = result[1]
  } else {
    title.value = props.recipe.title
  }
})

const tags = computed(() => {
  let results = props.recipe.diets
  if (props.recipe.is_vegan) {
    results.push("vegan")
  }
  if (props.recipe.is_vegetarian) {
    results.push("vegetarian")
  }
  return results
})

const favoriteIsSelected = computed(() => {
  if (collectionStore.selected && collectionStore.favorite.id === collectionStore.selected.id) {
    return true
  } else {
    return false
  }
})

const isFavorite = computed(() => {
  if (collectionStore.favorite && collectionStore.favorite.recipes.findIndex(val => val.id === props.recipe.id) != -1) {
    return true
  } else {
    return false
  }
})

const isInSelectedCollection = computed(() => {

  if (collectionStore.selected && collectionStore.selected.recipes.findIndex(val => val.id === props.recipe.id) != -1) {
    return true
  } else {
    return false
  }
}
)

const add = (event) => {
  toggling.value.adding = true
  event.stopPropagation();
  collectionStore.addRecipeToCollection(props.recipe.id, false).finally(() => {
    toggling.value.adding = false
  })
}

const remove = (event) => {
  toggling.value.removing = true
  event.stopPropagation();
  collectionStore.removeRecipeFromCollection(props.recipe.id, false).finally(() => {
    toggling.value.removing = false
  })
}

const favorite = (event) => {
  toggling.value.favorite = true
  event.stopPropagation();
  if (isFavorite.value) {
    collectionStore.removeRecipeFromCollection(props.recipe.id, true).finally(() => {
    toggling.value.favorite = false
  })
  } else {
    collectionStore.addRecipeToCollection(props.recipe.id, true).finally(() => {
    toggling.value.favorite = false
  })
  }
}

</script>

<style lang="scss" scoped>
.background-style {
  background-repeat: no-repeat;
  background-size: cover;
}

.card-height {
  height: 300px;
}

.card-style {
  min-width: 250px;
  // width: 100%;
  border-radius: 10px;
  position: relative;
  transition: all .2s ease-in-out;
  cursor: pointer;
}

.card-style:hover {
  transform: scale(1.02);
}

.bottom-slot {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>