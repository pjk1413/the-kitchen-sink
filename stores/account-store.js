import { defineStore } from "pinia";
import { useAuthStore } from "./auth-store";
import { STRIPE_CUSTOMER_PORTAL_LINK } from "./constant-store";

const randomKey = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export const useAccountStore = defineStore("account", {
  state: () => ({
    _verified: false,
    _user: null,
  }),
  getters: {
    verified: (state) => state._verified,
    user: (state) => state._user
  },
  actions: {
    async getUserDetails() {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();
      const { data, status } = await useFetch(
        `${config.public.apiBase}api/account`, { headers: { Authorization: `Bearer ${authStore.accessToken}`}}
      );
      
      if (data.value) {
        this._user = data.value.results[0]
      }
    },
    subscribe() {
      navigateTo(`${STRIPE_CUSTOMER_PORTAL_LINK}?prefilled_email=${this._user.user.email}`, {
        external: true, open: { target: '_blank' }
      })
    },
    async verifyCheckoutSession(checkout_session_id) {
      const config = useRuntimeConfig();

      const { data } = await useFetch(() => `api/payments/confirm?checkout_session_id=${checkout_session_id}`, 
      {
        key: checkout_session_id,
        baseURL: config.public.apiBase,
        method: 'GET',
      })

      if (data.value && data.value.is_active) {
        this._verified = data.value.is_active
      } 
    }
  },
});
