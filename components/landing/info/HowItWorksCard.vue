<template>
    <q-card class="q-ma-md q-pa-md" flat bordered>
        <q-card-section>
            <div class="text-h5 title-box text-center">
          {{ props.title }}
        </div>
        </q-card-section>
        <q-card-section>
            <div class="text-body1">
                {{ props.body }}
        </div>
        </q-card-section>
        
        
    </q-card>
</template>

<script setup>
const props = defineProps({
    title: String,
    body: String
})

</script>

<style lang="scss" scoped>

</style>