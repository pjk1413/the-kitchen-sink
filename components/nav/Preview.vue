<template>
    <q-drawer
        class="rounded-borders"
        side="right"
        :width="350"
        :overlay="true"
        v-model="modalStore.recipePreview.isOpen"
      >
      
      <q-card class="q-ma-md rounded-borders border-override">
        <div class="">
            <q-btn round color="white" icon="chevron_right" 
        size="sm" class="close-btn text-black" @click="modalStore.close('recipePreview')"></q-btn>
        </div>
        
      <q-img :src="recipeStore.selected.image_url" class="border-override">
        <div class="absolute-bottom text-h6 text-weight-light text-right">
          {{ recipeStore.selected.title }}
        </div>
      </q-img>
      <div class="q-ma-sm">
        <q-badge rounded class="badge-spacing" v-for="tag in tags" :key="tag">{{ tag }}</q-badge>
      </div>
      <q-card-section class="q-pt-none">
        <q-item class="q-pa-none">
           <q-item-section avatar side>
            <RecipeSiteAvatar />
           </q-item-section>
        <q-item-section>
          <q-item-label>{{ recipeStore.selected.author }}</q-item-label>
          <q-item-label caption lines="1">Author</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label caption>{{ recipeStore.selected.total_time }} minutes</q-item-label>
          <q-item-label caption>{{ recipeStore.selected.yields }} servings</q-item-label>
        </q-item-section>

        </q-item>
        <!-- author, link, tags(category, diets), host/source, time, servings -->
        <!-- <q-btn @click="console.log(recipeStore.selected)">SHOW</q-btn> -->
      </q-card-section>

      <q-card-section>
        <div class="text-h6 text-weight-light">
            Ingredients
        </div>
        <div class="q-ml-md text-weight-light">
            <div v-for="ingredient in recipeStore.selected.ingredients" :key="ingredient">
            {{ ingredient.ingredient.name }} {{ ingredient.amount }} {{ ingredient.unit }}
        </div>
        </div>
        

      </q-card-section>

      <q-card-section>
        <div class="text-h6 text-weight-light">
            Instructions
        </div>
        <q-list class="q-ml-md text-weight-light" separator>
            <q-item v-for="instruct in recipeStore.selected.instructions" :key="instruct">
                {{ instruct }}
            </q-item>
        </q-list>
      </q-card-section>

      <q-card-section v-if="recipeStore.selected.parsed_nutrients">
        <div class="text-h6 text-weight-light">
            Nutrients
        </div>
        <div class="q-ml-md text-weight-light">
            <div v-for="nutrient in recipeStore.selected.parsed_nutrients" :key="nutrient">
            {{ nutrient.name }} {{ nutrient.quantity }} {{ nutrient.unit }}
        </div>
        </div>
      </q-card-section>
      
    </q-card>
      </q-drawer>
</template>

<script setup>
import { useRecipeStore } from '~/stores/recipe-store';
import { useModalStore } from '~/stores/modal-store';

const tags = ref([])
const modalStore = useModalStore()
const recipeStore = useRecipeStore()

onMounted(() => {
    tags.value = ['vegetarian', 'vegan', 'asian', 'american', 'main course']
    return tags
})

</script>

<style lang="scss">
    .border-override {
        border-top-left-radius: 5px !important;
        border-top-right-radius: 5px !important;
    }

     .q-drawer {
        background: transparent !important;
        background-image: linear-gradient(to right, transparent , white) !important;
    }

    .close-btn {
        position: fixed;
        top: 50vh;
        left: 0px;
        z-index: 4000;
    }

    .badge-spacing {
        margin-left: 1px;
        margin-right: 1px;
    }
</style>