<template>
    <div class="q-pa-md q-ma-md border">
        <q-card flat>
        <div class="text-body text-body1">
            Import Recipe
        </div>
        <div class="text-body text-caption">
            Copy the full url of a recipe in the field below and click upload.
        </div>
        <div class="text-body text-caption">
            <span class="text-weight-bold">Note:</span> Imported recipes may have inaccuracies. Ensure you reference the ingredients list prior to shopping to make sure all ingredients have been accounted for.
        </div>

        <div class="q-mx-xl">
            <q-input label="URL" type="url" v-model="url" :rules="[val => validateUrl(val) || 'Must be a valid url']">
                <template #before>
                    <q-icon name="restaurant"></q-icon>
                </template>
                <template #after>
                    <q-btn :disable="!validateUrl(url)" @click="importUrl" flat round icon="cloud_upload"></q-btn>
                </template>
            </q-input>
        </div> 
        <div v-if="createdRecipe" class="q-mx-auto" style="max-width: 500px;">
            <RecipeCard :recipe="createdRecipe" />
        </div>

        <q-inner-loading :showing="loading">
            <q-spinner-facebook size="75px" color="primary" />
        </q-inner-loading>
        </q-card>
    </div>
</template>

<script setup>
import { validateUrl } from '~/assets/js/validationUtils'
import { useRecipeStore } from '~/stores/recipe-store'

const url = ref('');
const loading = ref(false);
const recipeStore = useRecipeStore()

const createdRecipe = computed(() => {
    return recipeStore.createdRecipe
})

watch(createdRecipe, (o, n) => {
    loading.value = false
})

const importUrl = async () => {
    loading.value = true
    recipeStore.importRecipe(url.value)
}

</script>

<style lang="scss" scoped>
.border {
    border: 1px solid rgba($color: darkgrey, $alpha: 0.5);
    border-radius: 5px;
}
</style>