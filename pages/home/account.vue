<template>
  <div class="q-mx-auto text-body" style="max-width: 400px;">

    <!-- TODO: turn on to activate payments -->
    <!-- <div v-if="accountStore.user && !accountStore.user.active_subscription">
      <NotifcationSubscriptionStatus :expires="accountStore.user && accountStore.user.active_until" />
    </div>   -->

    <q-card class="q-ma-xl">
      <q-card-section>
        <div class="q-mx-auto text-center">
          <q-icon name="account_circle" size="10rem" color="grey"></q-icon>
        </div>
        <div>
          <div class="text-h6 text-center text-weight-light">
            {{ user && user.first_name }} {{ user && user.last_name }}
          </div>
          <div class="text-center text-weight-light">
            {{ user && user.email }}
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-item clickable v-ripple disable>
            <q-item-section avatar>
              <q-icon name="edit"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>Edit Account Details</q-item-label>
              <!-- <q-item-label caption>Email</q-item-label> -->
            </q-item-section>
          </q-item>
          <q-item @click="changePasswordDialog = true" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="lock"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>Reset Password</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/contactus" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="contact_support"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>Contact Us</q-item-label>
            </q-item-section>
          </q-item>
          <!-- TODO turn on to activate payments -->
          <!-- <q-item @click="accountStore.subscribe()" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="manage_accounts"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>Manage Subscription</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item @click="authStore.logout(); location.reload(true);" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-dialog v-model="changePasswordDialog" persistent class="text-body">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-weight-light">
            Are you sure you want to change your password?
          </div>
        </q-card-section>

        <q-card-actions align="right font-paragraph">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-space />
          <q-btn flat @click="resetPassword" label="Request Reset Email" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  
</template>

<script setup>
import { notificationTypes, useNotificationStore } from '~/stores/notification-store';
import { useAccountStore } from '~/stores/account-store';
import { useAuthStore } from '~/stores/auth-store';

definePageMeta({ layout: 'home' })

const config = useRuntimeConfig();
const accountStore = useAccountStore();
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const changePasswordDialog = ref(false);

onMounted(() => {
  accountStore.getUserDetails()
})

const resetPassword = async () => {
  let url = `${config.public.apiBase}auth/users/reset_password/`
  let body = { email: accountStore.user.user.email }

  const { data, error, status } = await useFetch(url, {
    method: 'POST',
    body: body
  })

  if (error.value == null) {
    notificationStore.open(notificationTypes.secureLayoutBanner, "Reset password request email sent", "positive", "Dismiss", true)
  }

  if (error.value != null) {
    notificationStore.open(notificationTypes.secureLayoutBanner, "Error send reset password email", "negative", "Dismiss", true)
  }
}

const user = computed(() => {
  if (accountStore.user) {
    return accountStore.user.user
  } else {
    return null
  }
})

// TODO: turn on to activate payments
// const subscription = computed(() => {
//   return accountStore.user && accountStore.user.active_subscription
// })
</script>

<style lang="scss" scoped>
.float-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>