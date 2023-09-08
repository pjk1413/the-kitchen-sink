<template>
    <div class="card-style text-body">
    <div
      class="card-height background-style rounded-borders shadow-1"
      :style="`background-image: linear-gradient(transparent 10%, black), url('${props.recipe && props.recipe.image_url}');`">
      <div class="q-pa-sm bottom-slot full-width">
        <div>
          <div class="flex full-width justify-end">
            
          </div>
        </div>

        <div class="text-h6 text-right text-weight-light text-white q-mx-md q-mb-md">{{ props.recipe && props.recipe.recipe.title }}</div>

      </div>
    </div>
    <!-- link to site where recipe is found -->
    <!-- <RecipeButtonSite :link="props.recipe && props.recipe.url" :source="props.recipe && props.recipe.source" /> -->
    <div>
      <!-- makes full screen / via recipe and cook -->
      <!-- <RecipeButtonCook :recipe="props.recipe" /> -->
    </div>
  </div>

  <!-- <q-expansion-item
            class="overflow-hidden full-width q-mx-md"
            style="border-radius: 30px"
            icon="menu"
            label="Ingredients"
            header-class="bg-primary text-white"
            expand-icon-class="text-white"
        >
      <q-card>
        <q-card-section>
          <q-list>
            <q-item v-for="ingredient in props.recipe.recipe.parsed_ingredients">
                {{ ingredient.name }}
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item> -->
</template>

<script setup>

const props = defineProps({
    recipe: Object,
    status: String
})

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