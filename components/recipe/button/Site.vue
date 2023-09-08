<template>
    <a :href="props.link" target="_blank">
      <q-chip :outline="props.border" :color="source && source.color" class="float-company">
          <img v-if="thumbnail" class="img-style" :style="`width: ${source.width}px;`" :src="thumbnail">
          <div v-else>
            {{ source && source.website.replace('www.', '') }}
          </div>
      </q-chip>
    </a>
  </template>
  
  <script setup>
  import { useRecipeStore } from '~/stores/recipe-store';
  
  const props = defineProps({
      source: String,
      link: String,
      border: {
        type: Boolean,
        default: false
      }
  })
  
  const recipeStore = useRecipeStore();
  const source = computed(() => {
    return recipeStore.sources.filter(val => {
      return val.id === props.source
    })[0]
  })

  const thumbnail = computed(() => {
    if (source.value && source.value.thumbnail_image != 'NOTSET') {
      return source.value.thumbnail_image
    } else {
      return false
    }
  })
  
  // const openLink = (event) => {
  //   event.stopPropagation();
  //   console.log("LINK")
  // }
  
  </script>
  
  <style lang="scss" scoped>
  .float-company {
    position: absolute;
    top: 3px;
    right: 3px;
    border-radius: 20px !important;
  }
  
  .img-style {
    float: right;
  }
  
  </style>