<template>
      <q-item clickable :class="{ 'bg-red-1': removeable && selected, 'bg-primary': selected }" class="text-sh text-body"
    @click="clickableAction">

    <q-item-section avatar top v-auto-animate>

      <q-icon color="white" name="delete" size="md" v-if="selected && removeable"
        class="q-ml-xl bg-red-6 rounded-borders icon-trans" />

      <q-icon class="icon-trans" name="o_folder" size="md" v-if="!selected" />

      <q-icon class="icon-trans" name="o_folder_open" size="md" v-if="selected && !removeable" />

    </q-item-section>

    <q-item-section top>
      <q-item-label class="q-mt-sm" :class="{ 'text-weight-bolder': selected }">{{ collection.name
      }}</q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-grey-8">{{ collection.recipes.length }} recipes</span>
      </q-item-label>
      <q-item-label caption lines="1">
        <span class="text-grey-8">{{ ingredients }} ingredients</span>
      </q-item-label>

    </q-item-section>
  </q-item>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>