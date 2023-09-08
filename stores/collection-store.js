import { defineStore } from "pinia";
import { useAuthStore } from "./auth-store";
import { useNotificationStore } from "./notification-store";


export const useCollectionStore = defineStore("collection", {
  state: () => ({
    _editCollection: false,
    _selectedCollection: null,
    _collections: [],
    _itemList: null
  }),
  getters: {
    collections: (state) => state._collections,
    selected: (state) => state._selectedCollection,
    favorite: (state) => state._collections.filter(val => val.is_favorite)[0],
    edit: (state) => state._editCollection,
    items: (state) => state._itemList
  },
  actions: {
    openEdit() {
      this._editCollection = true
    },
    selectCollection(collection) {
      this._selectedCollection = collection;
    },
    async createCollection(name) {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      const notificationStore = useNotificationStore()
      const {data, error} = await useFetch(`${config.public.apiBase}api/collections/`, {method: 'post', headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }, body: {name: name}})

      if (data.value) {
        this._selectedCollection = data.value
        this._collections.push(data.value)
        notificationStore.open('secureLayoutBanner', "Succesfully created collection", 'primary', 'Dismiss', true)
      }

      if (error.value) {
        notificationStore.open('secureLayoutBanner', "Error creating collection", 'negative', 'Dismiss', true)
      }
    },
    async editCollection(name) {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      const notificationStore = useNotificationStore()
      const { data, error } = await useFetch(`${config.public.apiBase}api/collections/${this._selectedCollection.id}/`,
      { method: 'PATCH', headers: { Authorization: `Bearer ${authStore.accessToken}`}, body: {name: name}})

      if (data.value) {
        this.selectCollection(data.value);

        const colId = this._collections.findIndex(
          (val) => val.id == this._selectedCollection.id
        );
        this._collections[colId] = data.value;
        notificationStore.open('secureLayoutBanner', "Succesfully altered collection", 'primary', 'Dismiss', true)
      }

      if (error.value) {
        notificationStore.open('secureLayoutBanner', "Error altering collection", 'negative', 'Dismiss', true)
      }
    },
    async archiveCollection(collectionId) {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      const notificationStore = useNotificationStore()
      const { data, error } = await useFetch(`${config.public.apiBase}api/collections/${collectionId}/`,
      { method: 'delete', headers: { Authorization: `Bearer ${authStore.accessToken}`}})

      if (error.value) {
        notificationStore.open('secureLayoutBanner', "Error archiving collection", 'negative', 'Dismiss', true)
      } else {
        this._collections.splice(this.collections.indexOf(val => val.id === collectionId), 1)
        notificationStore.open('secureLayoutBanner', "Succesfully archived collection", 'primary', 'Dismiss', true)
      }
      
    },
    async getCollections() {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      const {data} = await useFetch(`${config.public.apiBase}api/collections`, {method: 'get', headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }})

      if (data.value) {
        this._collections = data.value.results
      }
    },
    async addRecipeToCollection(recipeId, favorite) {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      const notificationStore = useNotificationStore()

      let id = this._selectedCollection && this._selectedCollection.id

      if (favorite) {
        id = this.favorite.id
      }

      const { data, error } = await useFetch(`${config.public.apiBase}api/collections/${id}/`,
      { method: 'PATCH', headers: { Authorization: `Bearer ${authStore.accessToken}`}, body: 
      { alter: { type: 'ingredient', action: 'add', id: recipeId }}})

      if (data.value) {
        this.selectCollection(data.value)

        const colId = this._collections.findIndex(
          (val) => val.id == this._selectedCollection.id
        );
        this._collections[colId] = data.value;
        notificationStore.open('secureLayoutBanner', "Succesfully added recipe to collection", 'primary', 'Dismiss', true)
      }

      if (error.value) {
        notificationStore.open('secureLayoutBanner', "Error adding recipe to collection", 'negative', 'Dismiss', true)
      }
    },
    async removeRecipeFromCollection(recipeId, favorite) {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      const notificationStore = useNotificationStore()

      let id = this._selectedCollection && this._selectedCollection.id

      if (favorite) {
        id = this.favorite.id
      }

      const { data, error } = await useFetch(`${config.public.apiBase}api/collections/${id}/`,
      { method: 'PATCH', headers: { Authorization: `Bearer ${authStore.accessToken}`}, body: 
      { alter: { type: 'ingredient', action: 'remove', id: recipeId }}})

      if (data.value) {
        this.selectCollection(data.value)
        
        const colId = this._collections.findIndex(
          (val) => val.id == this._selectedCollection.id
        );
        this._collections[colId] = data.value;
        notificationStore.open('secureLayoutBanner', "Succesfully removed recipe from collection", 'primary', 'Dismiss', true)
      }

      if (error.value) {
        notificationStore.open('secureLayoutBanner', "Error removing recipe from collection", 'negative', 'Dismiss', true)
      }
    },
    async getShoppingList() {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      const notificationStore = useNotificationStore()

      let id = this._selectedCollection && this._selectedCollection.id

      const { data, error } = await useFetch(`${config.public.apiBase}api/list/${id}/`,
      { headers: { Authorization: `Bearer ${authStore.accessToken}`}})

      if (data.value) {
        this._itemList = data.value
      }

      if (error.value) {
        notificationStore.open('secureLayoutBanner', "Error retrieving shopping list", 'negative', 'Dismiss', true)
      }
    },
    async toggleCheckIngredient(type, item_id) {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      const notificationStore = useNotificationStore()

      let id = this._selectedCollection && this._selectedCollection.id

      const { data, error } = await useFetch(`${config.public.apiBase}api/list/${id}/`,
      {method: 'PATCH', headers: { Authorization: `Bearer ${authStore.accessToken}`}, body: {
        toggle: { type: type, id: item_id }
      }})

      if (data.value) {
        this._itemList = data.value
      }

      if (error.value) {
        notificationStore.open('secureLayoutBanner', "Error toggling shopping list status", 'negative', 'Dismiss', true)
      }
    },
    async addAdditionalItem(item) {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      const notificationStore = useNotificationStore()

      let id = this._selectedCollection && this._selectedCollection.id

      const { data, error } = await useFetch(`${config.public.apiBase}api/list/${id}/`,
      { method: 'PATCH', headers: { Authorization: `Bearer ${authStore.accessToken}`}, 
      body: { alter: { type: 'additional', action: 'add', data: { name: item.name, detail: item.detail }}}})

      if (data.value) {
        this._itemList = data.value 
        notificationStore.open('secureLayoutBanner', "Succesfully added item to list", 'primary', 'Dismiss', true)
      }

      if (error.value) {
        notificationStore.open('secureLayoutBanner', "Error adding item to list", 'negative', 'Dismiss', true)
      }
    },
    async removeAdditionalItem(item) {
      const authStore = useAuthStore()
      const config = useRuntimeConfig()
      const notificationStore = useNotificationStore()

      let id = this._selectedCollection && this._selectedCollection.id

      const { data, error } = await useFetch(`${config.public.apiBase}api/list/${id}/`,
      { method: 'PATCH', headers: { Authorization: `Bearer ${authStore.accessToken}`}, 
      body: { alter: { type: 'additional', action: 'remove', id: item.id }}})

      if (data.value) {
        this._itemList = data.value 
        notificationStore.open('secureLayoutBanner', "Succesfully added item to list", 'primary', 'Dismiss', true)
      }

      if (error.value) {
        notificationStore.open('secureLayoutBanner', "Error adding item to list", 'negative', 'Dismiss', true)
      }
    }
  },
});
