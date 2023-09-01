import { defineStore } from 'pinia';

const modalTypes = {
    register: 'register',
    login: 'login',
    recipeDrawer: 'recipeDrawer',
    recipePreview: 'recipePreview',
    recipeInstructions: 'recipeInstructions'
}

const recipeDrawerType = {
    createCollection: 'createCollection',
    filterRecipes: 'filterRecipes'
}

export const useModalStore = defineStore('modal', {
  state: () => ({
    _register: {
        isOpen: false,
    },
    _login: {
        isOpen: false,
        email: '',
    },
    _recipeDrawer: {
        isOpen: false,
        contains: ''
    },
    _recipePreview: {
        isOpen: false,
    },
    _recipeInstructions: {
        isOpen: false
    }
  }),
  getters: {
    register: (state) => state._register,
    login: (state) => state._login,
    recipeDrawer: (state) => state._recipeDrawer,
    recipePreview: (state) => state._recipePreview,
    recipeInstructions: (state) => state._recipeInstructions
  },
  actions: {
    open(modal) {
        switch(modal) {
            case modalTypes.login:
                this._login.isOpen = true
                break;
            case modalTypes.register:
                this._register.isOpen = true
                break;
            case modalTypes.recipeDrawer:
                this._recipeDrawer.isOpen = true
                break;
            case modalTypes.recipePreview:
                this._recipePreview.isOpen = true
                break;
            case modalTypes.recipeInstructions:
                this._recipeInstructions = true;
                break;
        }

    },
    close(modal) {
        switch(modal) {
            case modalTypes.login:
                this._login.isOpen = false
                break;
            case modalTypes.register:
                this._register.isOpen = false
                break;
            case modalTypes.recipeDrawer:
                this._recipeDrawer.isOpen = false
                break;
            case modalTypes.recipePreview:
                this._recipePreview.isOpen = false
                break;
            case modalTypes.recipeInstructions:
                this._recipeInstructions = false;
                break;
        }
    }
  },
});