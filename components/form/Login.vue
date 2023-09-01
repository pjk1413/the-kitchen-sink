<template>
    <div class="row bg-white q-pa-sm" style="min-width: 350px; width: 80vh">
    <div class="col relative-position">
      <div class="flex">
        <!-- <h3>LOGIN</h3> -->
        <div
          class="q-pa-md q-mt-sm text-h3 text-dark font-heading text-weight-light"
        >
          LOGIN
        </div>
        <q-space />
        <div class="absolute-top-right">
          <q-btn icon="close" class="" flat round dense v-close-popup />
        </div>
       
      </div>


      <q-card-section class="q-pt-none font-paragraph">
        <div class="login-form-input q-mx-auto q-px-md font-sh">
          <q-form @submit="login">
          <div class="q-pa-sm">
            <q-input v-model="email" label="Email" 
            :rules="[val => validateEmail(val) || 'Must be a valid email']"/>
          </div>
          <div class="q-pa-sm">
            <q-input v-model="password" type="password" label="Password" />
          </div>
          <div class="text-right">
            <q-btn
              dense
              unelevated
              size="sm"
              class="text-body2"
              to="/password/reset"
              >Forgot Password</q-btn
            >
          </div>
          <div class="text-center q-mt-sm">
            <q-btn
            type="submit"
              color="secondary"
              class="full-width text-body1"
              :disable="!validated"
              >Submit</q-btn
            >
          </div>
        </q-form>
          <!--
            GOOGLE LOGIN BUTTON
          <div class="q-py-md divider">
            <hr />
          </div>
          <div>
            <q-btn class="full-width q-pa-sm" @click="login">
              <img style="height: 25px;"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            </q-btn>
          </div> -->
          <div class="text-center q-mt-md">
            <q-btn
              dense
              unelevated
              size="sm"
              class="text-body2"
              @click="openRegister"
              >Need to sign up? Register here</q-btn
            >
          </div>
        </div>
      </q-card-section>

      <q-slide-transition>
        <div class="q-gutter-sm" v-if="bannerStatus">
          <q-banner dense class="bg-info text-white">
            <div class="align-banner">
              <div>
                {{ bannerMessage }}
              </div>
              <q-space></q-space>
              <q-btn
                flat
                color="white"
                label="Dismiss"
                @click="() => (bannerStatus = false)"
              />
            </div>
          </q-banner>
        </div>
      </q-slide-transition>
    </div>
    <q-inner-loading :showing="loading" label="Logging in" />
  </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal-store';
import { useAuthStore } from '~/stores/auth-store';
import { validateEmail } from 'assets/js/validationUtils';

const loading = ref(false);
const email = ref("");
const password = ref("");
const bannerMessage = ref("");
const bannerStatus = ref(false);

const authStore = useAuthStore();

const modalStore = useModalStore()

onMounted(() => {
  if (modalStore.login.email && modalStore.login.email.length > 0) {
    email.value = modalStore.login.email
  }
})

const validated = computed(() => {
  return validateEmail(email.value) && password.value.length > 5 
})

const login = async () => {
  loading.value = true
  const result = await authStore.login(email, password);
  loading.value = false
  bannerStatus.value = !result
  bannerMessage.value = "Incorrect username and/or password.  Please try again."
}

const openRegister = () => {
  modalStore.close('login')
  modalStore.open('register')
}

</script>

<style lang="scss" scoped>

.align-banner {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>