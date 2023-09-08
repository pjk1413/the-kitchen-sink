<template>
    <a href="#" target="_blank" v-if="!props.avatar">
      <q-chip :outline="props.border" :color="source.color" class="float-company">
          <img class="img-style" :style="`width: ${source.width}px;`" :src="source.thumbnail_image">
      </q-chip>
    </a>
    <a href="#" target="_blank" v-else>
        <q-btn round :outline="props.border" :color="source.color">
            <img class="img-style" :style="`width: ${source.width / 2}px;`" :src="source.thumbnail_image">
        </q-btn>
    </a>
</template>

<script setup>
  const props = defineProps({
      source: Object,
      border: {
        type: Boolean,
        default: false
      },
      avatar: Boolean
  })

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