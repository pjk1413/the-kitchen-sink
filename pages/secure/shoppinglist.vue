<template>
    <NavRecipe />
    <NavShoppingList />
    <div class="text-body">
        <div style="max-width: 800px;" class="q-mx-auto q-my-lg">
            <div v-if="ingredients.length > 0 || additionalItems.length > 0">

            <q-list bordered v-if="ingredients.length > 0">
                <q-item tag="label" v-ripple v-for="ingredient in ingredients">
                    <q-item-section side top>
                        <q-checkbox v-model="ingredient.is_checked" @update:model-value="toggle('ingredient', ingredient)" />
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

                <q-separator />

            </q-list>
            
            <q-list bordered class="q-mt-sm" v-if="additionalItems.length > 0">
                <q-item tag="label" v-ripple v-for="item in additionalItems">
                    <q-item-section side top>
                        <q-checkbox v-model="item.is_checked" @update:model-value="toggle('additional', item)" />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label>{{ capitalize(item.name) }}</q-item-label>

                        <q-item-label caption>
                            {{ item.detail }}
                        
                        </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <q-btn @click="removeAdditionalItem(item)" icon="delete" flat round></q-btn>
                    </q-item-section>
                </q-item>
            </q-list>

            </div>

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

const additionalItems = computed(() => {
    if (collectionStore.selected && collectionStore.items && collectionStore.items.additional_items) {
        return Object.values(collectionStore.items.additional_items).filter(val => {
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

const ingredients = computed(() => {
    if (collectionStore.selected && collectionStore.items && collectionStore.items.shopping_list) {
        return Object.values(collectionStore.items.shopping_list).filter(val => {
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

const removeAdditionalItem = (item) => {
    console.log(item)
    collectionStore.removeAdditionalItem(item)
}

const capitalize = (str) => {
    str = str.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return str
}

const toggle = (type, item) => {
    collectionStore.toggleCheckIngredient(type, item.id)
}
</script>

<style lang="scss" scoped></style>