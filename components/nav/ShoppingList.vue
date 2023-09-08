<template>
    <q-toolbar class=" q-py-sm">
        <q-item class="bordered">

            <q-item-section>
                <q-item-label class="text-center">
                    <!-- <q-badge rounded color="red" :label="remainingIngredients" /> -->
                    {{ remainingItems }} / {{ totalItems }}</q-item-label>
                <q-item-label caption>
                    Ingredients</q-item-label>
            </q-item-section>
        </q-item>

        <q-item>
            <q-item-section>
                <q-item-label class="text-center">{{ collectionStore.selected && collectionStore.selected.recipes.length
                }}</q-item-label>
                <q-item-label caption>Recipes</q-item-label>
            </q-item-section>
        </q-item>
        <q-space />


        <q-btn :icon="addAdditionalForm ? 'close' : 'add_shopping_cart'" round flat
            @click="addAdditionalForm = !addAdditionalForm"></q-btn>
        <!-- right_panel_close -->
    </q-toolbar>

    <q-dialog v-model="addAdditionalForm" persistent>
        <q-card style="min-width: 350px" class="text-body">
            <q-form @submit="addAdditionalItem">
                <q-card-section>
                    <div class="text-h6 text-body">Add Additional Item</div>
                </q-card-section>

                <q-card-section :class="text - body" class="q-pt-none">

                    <div>
                        <q-input v-model="item.name" label="Item" autofocus></q-input>

                    </div>
                    <div>
                        <q-input v-model="item.detail" label="Details"></q-input>
                    </div>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Save" v-close-popup type="submit" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { useCollectionStore } from '~/stores/collection-store';

const collectionStore = useCollectionStore();
const addAdditionalForm = ref(false);
const item = ref({ name: '', detail: '' })

const remainingItems = computed(() => {
    let remaining = 0
    if (collectionStore.selected && collectionStore.items) {
        if (collectionStore.items.additional_items) {
            remaining += Object.values(collectionStore.items.additional_items).filter(val => {
                return !val.is_checked
            }).length
        }

        if (collectionStore.items.shopping_list) {
            remaining += Object.values(collectionStore.items.shopping_list).filter(val => {
                return !val.is_checked
            }).length
        }
    }
    return remaining
})

const totalItems = computed(() => {
    let total = 0
    if (collectionStore.selected && collectionStore.items) {
        if (collectionStore.items.shopping_list) {
            total += Object.keys(collectionStore.items.shopping_list).length
        }

        if (collectionStore.items.additional_items) {
            total += Object.keys(collectionStore.items.additional_items).length
        }

        return total
    } else {
        return total
    }
})

const addAdditionalItem = () => {
    collectionStore.addAdditionalItem(item.value)
}

</script>

<style lang="scss" scoped></style>