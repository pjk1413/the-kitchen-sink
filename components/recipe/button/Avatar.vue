<template>
    <a :href="props.link" target="_blank">
        <q-btn :round="thumbnail != false" :rounded="!thumbnail" :outline="props.border" :color="source && source.color">
            <img v-if="thumbnail" class="img-style" :style="`width: ${source.width / 2}px;`" :src="source && source.thumbnail_image">
          <div v-else class="text-caption text-dark">
            {{ source && source.website && truncate(source.website.replace('www.', ''), 6) }}
          </div>
        </q-btn>
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

const truncate = (str, length) => {

  if (str.length > length) {
    return str.slice(0, length) + '...';
  } else return str;
}

const recipeStore = useRecipeStore();
const source = computed(() => {
    if (Array.isArray(recipeStore.sources)) {
        return recipeStore.sources && recipeStore.sources.filter(val => {
            return val.id === props.source
        })[0]
    } else {
        return {}
    }

})

const thumbnail = computed(() => {
    if (source.value && source.value.thumbnail_image != 'NOTSET') {
      return source.value.thumbnail_image
    } else {
      return false
    }
  })

</script>
  
<style lang="scss" scoped>
.img-style {
    float: right;
}
</style>