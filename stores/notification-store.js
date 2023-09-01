import { defineStore } from 'pinia';


export const notificationTypes = {
    secureLayoutBanner: 'secureLayoutBanner',
    contactUsBanner: 'contactUsBanner'
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    _secureLayoutBanner: {
        isOpen: false,
        color: 'primary',
        message: '',
        btnText: 'Dismiss',
        userTimer: false,
    },
    _contactUsBanner: {
        isOpen: false,
        color: 'primary',
        message: '',
        btnText: 'Dismiss',
        userTimer: false,
    }
  }),
  getters: {
    secureLayoutBanner: (state) => state._secureLayoutBanner,
    contactUsBanner: (state) => state._contactUsBanner
  },
  actions: {
    open(name, message, color='primary', btnText='Dismiss', useTimer=false) {
        switch (name) {
            case notificationTypes.secureLayoutBanner: 
                this._secureLayoutBanner.color = color
                this._secureLayoutBanner.message = message
                this._secureLayoutBanner.btnText = btnText
                this._secureLayoutBanner.userTimer = useTimer
                this._secureLayoutBanner.isOpen = true
                break;
              case notificationTypes.contactUsBanner:
                this._contactUsBanner.color = color,
                this._contactUsBanner.message = message,
                this._contactUsBanner.btnText = btnText,
                this._contactUsBanner.userTimer = useTimer,
                this._contactUsBanner.isOpen = true
                break;
        }        
    },
    close(name) {
        switch (name) {
            case notificationTypes.secureLayoutBanner: 
                this._secureLayoutBanner.isOpen = false
                break;
              case notificationTypes.contactUsBanner:
                this._contactUsBanner.isOpen = false
        }
    }
  },
});