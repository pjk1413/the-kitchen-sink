<template>
     <q-dialog
    v-model="modalStore.recipeInstructions"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-positive text-white">
      <q-bar>
        <q-space />

        <q-btn
          dense
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn dense flat icon="close" @click="modalStore.close('recipeInstructions'); slide = 0">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          class="bg-transparent text-white font-paragraph"
        >
          <q-carousel-slide
            v-for="(instruct, index) in recipeStore.selected.instructions"
            :key="index"
            :name="index"
            class="column no-wrap flex-center"
          >
            <div class="text-center text-h4 text-weight-light">
             {{ instruct }}
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>
      <!-- <q-card-section
        class="no-padding"
        :class="{ 'q-pt-sm': $q.screen.lt.sm }"
      >
        <div class="row q-pa-none q-ma-none">
          <div class="col-md-6 no-padding">
            <recipe-timer :step="recipe.steps[slide - 1].instruct" />
          </div>
          <div class="col-md-6 no-padding">
            <list-ingredients
              :recipe="recipe"
              :step="recipe.steps[slide - 1].instruct"
            />
          </div>
        </div>
      </q-card-section> -->
    </q-card>
  </q-dialog>
  <!-- <video loop :src="videoSource" autoplay muted></video> -->
</template>

<script setup>
import { useModalStore } from '~/stores/modal-store';
import { useRecipeStore } from '~/stores/recipe-store';
import { ref } from 'vue'

const modalStore = useModalStore()
const recipeStore = useRecipeStore()
const maximizedToggle = ref(true)
const slide = ref(0)
</script>

<style lang="scss" scoped>

</style>