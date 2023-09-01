import { useAuthStore } from "~/stores/auth-store";





export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // TODO add a refresh token route here as well
  if (to.meta.layout === 'secure') {
    console.log(authStore.verify)
    if (authStore.verify) {
      return true
    } else {
      return navigateTo("")
    }
  } else {
    return true
  }
  
});
