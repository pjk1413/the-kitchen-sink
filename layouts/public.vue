<template>

<q-layout view="lHh Lpr lFf">
    <NavPublic />
    <!-- <notification-banner name="publicbanner" /> -->

    <q-page-container >
      <!-- <router-view /> -->
      <slot />
    </q-page-container>

    <FooterPublic />
  </q-layout>
</template>

<script setup>


</script>

<style lang="scss" scoped>

</style>