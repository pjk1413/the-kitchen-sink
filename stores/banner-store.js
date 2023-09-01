import { defineStore } from 'pinia';

export const useBannerStore = defineStore('banner', {
  state: () => ({
    color: 'primary',
    isOpen: false,
    message: "",
    btnText: "",
    timer: {
      use: false,
      length: 5000
    },
  }),
  getters: {
    bannerStatus: (state) => state,
  },
  actions: {
    open(message, timer, color) {
      this.color = color
      this.message = message
      this.timer = timer
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    }
  },
});
