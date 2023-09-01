<template>
  <q-btn icon="library_books" :label="collectionStore.selected && collectionStore.selected.name" flat>

    <q-menu :class="{ 'w-75': $q.screen.lt.sm }">
      <q-list style="min-width: 150px">

        <!-- Add new collection -->
        <q-expansion-item @click="create" v-model="createCollection" :icon="inputIcon" label="New Collection" caption="Create a new collection">
          <div class="q-pa-sm">
            <q-input  bottom-slots v-model="collection.name" label="Name" :dense="dense"
              hint="Enter name for new collection">
              <template v-slot:append>
                <q-btn v-close-popup round :icon="inputIcon" size="sm" @click="add" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
        </q-expansion-item>

        <q-separator />

      <CollectionSelectItem :is-favorite="true" :collection="collectionStore.favorite" />
        
        <q-seperator />

        <CollectionSelectItem :collection="collection" v-for="collection in collections" :key="collection.id" />

      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
import { useModalStore } from '~/stores/modal-store';
import { useCollectionStore } from '~/stores/collection-store';
const collectionStore = useCollectionStore()
const modalStore = useModalStore()

nextTick(() => {
  collectionStore.getCollections()
})

const collection = ref({
  id: null,
  name: "",
  recipes: []
});

const createCollection = ref(false);

const inputIcon = ref("add")

const collections = computed(() => {
  return collectionStore.collections.filter(val => val.name != 'Favorite')
})

watch(() => collectionStore.selected, (cur, oldval) => {
  // TODO: if selected collection is editted, does not auto dropdown
  if (collectionStore.edit == true) {
    createCollection.value = true
    collection.value.id = collectionStore.selected.id
    collection.value.name = collectionStore.selected.name
    inputIcon.value = "edit"
  } else {
    createCollection.value = false
    inputIcon.value = "add"
  }
})

const create = () => {
  collectionStore._editCollection = false
  collection.value.id = null
  collection.value.name = ""
  collection.value.recipes = []
  inputIcon.value = "add"
}

const add = () => {
  if (collectionStore.edit) {
    collectionStore.editCollection(collection.value.name)
  } else {
    collectionStore.createCollection(collection.value.name)
  }
  
}

</script>

<style lang="scss" scoped></style>