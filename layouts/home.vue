<template>

    <q-layout view="hHh Lpr lff">
    <q-header class="bg-white">
      <NavHome />
    </q-header>
    
    <div>
        <NavPreview />
    </div>
    
    <q-page-container>
      
      <slot />
      <NotifcationLayoutBanner :name="notificationTypes.secureLayoutBanner" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { notificationTypes } from '~/stores/notification-store';

</script>

<style lang="scss" scoped>
   
</style>