<template>
    <div>
        <embed :src="pdf" class="window-width window-height" />
    </div>
</template>

<script setup>
import pdf from "~/assets/data/termsofuse.pdf";
</script>

<style lang="scss" scoped>


</style>