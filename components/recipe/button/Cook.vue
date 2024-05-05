<template>
    <q-btn size="sm" @click="cook" round flat color="white" class="float-btn bg-black" icon="outdoor_grill" />
</template>

<script setup>
import { useModalStore } from '~/stores/modal-store';
import { useRecipeStore } from '~/stores/recipe-store';

const props = defineProps({
  recipe: Object
})

const modalStore = useModalStore();
const recipeStore = useRecipeStore();

const cook = (event) => {
  console.log("COOK")
  event.stopPropagation();
  modalStore.open('recipeInstructions')
  recipeStore.selectRecipe(props.recipe)
}

</script>

<style lang="scss" scoped>
.float-btn {
  position: absolute;
  top: 5px;
  left: 5px;
//   border-radius: 20px !important;
}

.img-style {
  float: right;
  width: 100px;
}
</style>