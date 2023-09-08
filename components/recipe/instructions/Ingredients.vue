<template>
    <q-card
    v-if="ingredients.length > 0"
    square
    style="max-width: 350px"
    class="text-dark text-center q-mx-auto font-calculator text-body"
  >
    <q-card-section>
      <q-list dense>
        <q-item v-for="ingredient in ingredients" :key="ingredient.id">
          <q-item-section>
            <q-item-label>{{ ingredient.ingredient.name }}</q-item-label>
            <q-item-label caption
              >{{ ingredient.amount }} {{ ingredient.unit }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <div>
              <q-btn
                flat
                round
                icon="find_replace"
                @click="searchIngredient(ingredient, true)"
              />
              <q-btn
                flat
                round
                icon="search"
                @click="searchIngredient(ingredient, false)"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions align="around" class="q-pa-none"> </q-card-actions>
  </q-card>
</template>

<script setup>
import { useRecipeStore } from '~/stores/recipe-store';
const recipeStore = useRecipeStore();

const props = defineProps({ step: Number })

const ingredients = computed(() => {
    return recipeStore.selected.ingredients.filter((val) => {
        // TODO: determine better way of comparing ingredients to instructions (split words etc...)
        return props.step.toLowerCase().includes(val.ingredient.name.toLowerCase());
      });
})

const searchIngredient = (ingredient, alt) => {
    const urlIngredientName = ingredient.ingredient.name.replace(" ", "+");

      let url = `https://www.google.com/search?q=${urlIngredientName}`;

      if (alt) {
        url += "+alternative+ingredients";
      }

      window.open(url, "_blank");
}
</script>

<style lang="scss" scoped>

</style>