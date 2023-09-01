<template>
    <q-badge style="width: 50%" color="transparent" class="bg-color q-mb-xs">
      <div class="ellipsis">
        {{ recipe.title }}
      </div>
    </q-badge>
</template>

<script setup>
const props = defineProps({
  recipe: Object
})

const color = computed(() => {
  let hash = 0;
  props.recipe.title.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }

  return colour
})

</script>

<style lang="scss" scoped>

.bg-color {
  background-color: v-bind('color') !important;
}

</style>