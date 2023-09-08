<template>
  <q-item clickable class="text-body text-body2" :active="collectionStore.selected && collectionStore.selected.name == props.collection.name
    " active-class="bg-grey-5 text-light">

    <q-item-section v-ripple @click="select" v-close-popup>
      <q-item-label class="text-weight-light text-dark">{{ props.collection.name }}</q-item-label>
      <q-item-label caption>{{ props.collection.recipes.length }} recipes</q-item-label>
    </q-item-section>
    <q-item-section side v-if="!props.isFavorite">
      <div class="flex">
        <q-btn @click="edit" round flat icon="edit"></q-btn>
        <q-btn round flat icon="delete">
          <q-popup-proxy square>
            <q-card class="font-paragraph" style="max-width: 200px">
              <q-card-section class="text-center">
                Are you sure you want to remove collection named
                <span class="text-weight-bold">{{
                  props.collection.name
                }}</span>?
              </q-card-section>

              <q-card-actions align="right">
                <q-btn v-close-popup flat square @click="archive">OK</q-btn>
                <q-btn flat square v-close-popup>CANCEL</q-btn>
              </q-card-actions>
            </q-card>
          </q-popup-proxy>
        </q-btn>
      </div>

    </q-item-section>
    <q-item-section side v-if="props.isFavorite">
      <q-icon class="text-red" name="favorite" />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useCollectionStore } from '~/stores/collection-store';

const collectionStore = useCollectionStore()
const props = defineProps({
  collection: Object,
  isFavorite: Boolean
})

const select = () => {
  collectionStore._editCollection = false;
  collectionStore.selectCollection(props.collection)
}

const archive = () => {
  collectionStore._editCollection = false;
  collectionStore.archiveCollection(props.collection.id)
}

const edit = () => {
  collectionStore.selectCollection(props.collection)
  collectionStore.openEdit()
}

</script>

<style lang="scss" scoped></style>