<template>
    <NavRecipe />
    <NavShoppingList />
    <div>
        <div style="max-width: 800px;" class="q-mx-auto q-my-lg">
            <q-list bordered v-if="collectionStore.selected && collectionStore.shoppingList.length > 0">
                <q-item tag="label" v-ripple v-for="ingredient in ingredients">
                    <q-item-section side top>
                        <q-checkbox v-model="ingredient.is_checked" @update:model-value="toggleCheckbox(ingredient)" />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>{{ capitalize(ingredient.name) }}</q-item-label>

                        <q-item-label caption>
            
                            <div v-for="recipe in ingredient.recipes">
                                <CollectionShoppinglistRecipeBadge :recipe="recipe" />
                            </div>
                           
                        </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        {{ ingredient.amount }} {{ ingredient.unit ? ingredient.unit : 'unit' }}
                    </q-item-section>
                </q-item>

            </q-list>
            <div v-else class="text-center">
                <h3 class="text-weight-light">Select a collection <br> or <br>add recipes to selected collection</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFilterStore } from '~/stores/filter-store';
import { useCollectionStore } from '~/stores/collection-store';

definePageMeta({ layout: 'secure' })

onMounted(() => {
    if (collectionStore.selected != null) {
        collectionStore.getShoppingList();
    }
})

const collectionStore = useCollectionStore()
const filterStore = useFilterStore()

watch(() => collectionStore.selected, (o, n) => {
    collectionStore.getShoppingList()
})

const ingredients = computed(() => {
    if (collectionStore.selected) {
        return collectionStore.shoppingList.filter(val => {
            if (filterStore.filter) {
                return !val.is_checked
            } else {
                return true
            }
        })
    } else {
        return []
    }
})

const capitalize = (str) => {
    str = str.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return str
}

const toggleCheckbox = (ingredient) => {
    console.log(ingredient)
    collectionStore.toggleCheckIngredient(ingredient.id)
}
</script>

<style lang="scss" scoped></style>