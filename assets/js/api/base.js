// import { useAuthStore } from "src/stores/auth-store";
// import { useBannerStore } from "src/stores/banner-store";

import { useAuthStore } from "~/stores/auth-store"



export const fetch = async ({url = "", method = "GET", banner = {}, }) => {
    const authStore = useAuthStore()
    const config = useRuntimeConfig()
    const { data, pending, status } = await useFetch(`${config.public.apiBase}${url}`, 
        { method: method, headers: { Authorization: `Bearer ${authStore.access_token}`}})
        if (data.value) {
          this._recipeList = data.value.results    
        }
}



// export const get = async (url, errorMessage, successMessage) => {
//   const authStore = useAuthStore();
//   return await api
//     .get(url, { headers: { Authorization: authStore.auth_header } })
//     .then((response) => {
//       if (successMessage != null) {
//         const bannerStore = useBannerStore();
//         bannerStore.open(
//           successMessage,
//           { use: true, length: 5000 },
//           "positive"
//         );
//       }

//       return response;
//     })
//     .catch((err) => {
//       if (errorMessage != null) {
//         const bannerStore = useBannerStore();
//         bannerStore.open(errorMessage, null, "negative");
//       }
//       return err;
//     });
// };

// export const post = async (url, data, errorMessage, successMessage) => {
//   const authStore = useAuthStore();
//   return await api
//     .post(url, data, { headers: { Authorization: authStore.auth_header } })
//     .then((response) => {
//       console.log("BASE POST");
//       if (successMessage != null) {
//         const bannerStore = useBannerStore();
//         bannerStore.open(
//           successMessage,
//           { use: true, length: 5000 },
//           "positive"
//         );
//       }

//       return response;
//     })
//     .catch((err) => {
//       if (errorMessage != null) {
//         if (err.response.status == 402) {
//           errorMessage = "Please add more tokens to account";
//         }

//         const bannerStore = useBannerStore();
//         bannerStore.open(errorMessage, null, "negative");
//       }
//       return err;
//     });
// };

// export const patch = async (url, data, errorMessage, successMessage) => {
//   const authStore = useAuthStore();
//   return await api
//     .patch(url, data, { headers: { Authorization: authStore.auth_header } })
//     .then((response) => {
//       if (successMessage != null) {
//         const bannerStore = useBannerStore();
//         bannerStore.open(
//           successMessage,
//           { use: true, length: 5000 },
//           "positive"
//         );
//       }

//       return response;
//     })
//     .catch((err) => {
//       if (errorMessage != null) {
//         const bannerStore = useBannerStore();
//         bannerStore.open(errorMessage, null, "negative");
//       }
//       return err;
//     });
// };

// export const delete_ = async (url, errorMessage, successMessage) => {
//   const authStore = useAuthStore();
//   return await api
//     .delete(url, { headers: { Authorization: authStore.auth_header } })
//     .then((response) => {
//       if (successMessage != null) {
//         const bannerStore = useBannerStore();
//         bannerStore.open(
//           successMessage,
//           { use: true, length: 5000 },
//           "positive"
//         );
//       }

//       return response;
//     })
//     .catch((err) => {
//       if (errorMessage != null) {
//         const bannerStore = useBannerStore();
//         bannerStore.open(errorMessage, null, "negative");
//       }
//       return err;
//     });
// };
