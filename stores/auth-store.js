import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";
import { STRIPE_PAYMENT_LINK } from "./constant-store";

const accessKey = "access_token";
const refreshKey = "refresh_token";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    _user: null,
    _access: null,
    _refresh: null,
  }),
  getters: {
    user: (state) => state._user,
    accessToken: (state) => {
      const access = useCookie(accessKey, { sameSite: 'lax' });
      if (access.value) {
        return access.value;
      } else {
        return state._access;
      }
    },
    refreshToken: (state) => {
      const refresh = useCookie(refreshKey, { sameSite: 'lax' });
      if (refresh.value) {
        return refresh.value;
      } else {
        return state._refresh;
      }
    },
    verify: (state) => {
      const token = useCookie(accessKey, { sameSite: 'lax' });
      let value = token.value
      
      
      if (!value) {
        value = state._access
      }  

      if (value) {
        const decoded = jwt_decode(value);
        if (1000 * decoded.exp > Date.now()) {
          return true;
        }
        return false;
      }
      return false
    },
  },
  actions: {
    async register(email, password) {
      const config = useRuntimeConfig();
      const { data, status, error } = await useFetch(
        `${config.public.apiBase}auth/users/`,
        { method: "POST", body: { username: email, email: email, password: password } }
      );

      return data
    },
    logout() {
      this._access = null;
      this._refresh = null;

      const access = useCookie(accessKey, { sameSite: 'lax' });
      const refresh = useCookie(refreshKey, { sameSite: 'lax' });

      access.value = null;
      refresh.value = null;

      const router = useRouter();
      router.push("/");
    },
    async login(username, password) {
      const config = useRuntimeConfig();

      const { data, status, error } = await useFetch(
        `${config.public.apiBase}auth/jwt/create/`,
        { method: "POST", body: { username: username, password: password } }
      );

      if (data.value) {
        if (status.value == "success") {
          this._access = data.value.access;
          this._refresh = data.value.refresh;

          const access = useCookie(accessKey, {
            sameSite: 'lax',
          });
          const refresh = useCookie(refreshKey, {
            sameSite: 'lax',
          });

          if (data.value) {
            access.value = data.value.access;
            refresh.value = data.value.refresh;

            const router = useRouter();
            router.push("/secure");
            return true
          }
        } else {
          return false
        }
      } else {
        return false
      }
    },
  },
});
