<template>
    <div class="row bg-white q-pa-sm" :style="{
        'min-width': '350px', 
        'width': '80vh'}">
    <div class="col relative-position">
      <div class="flex">
        <!-- <h3>LOGIN</h3> -->
        <div
          class="q-pa-md q-mt-sm text-h3 text-dark font-heading text-weight-light"
        >
          REGISTER
        </div>
        <q-space />
        <div class="absolute-top-right">
          <q-btn icon="close" class="" flat round dense v-close-popup />
        </div>
       
      </div>

      <!-- <q-separator /> -->

      <q-card-section class="q-pt-none font-paragraph">
        <q-form @submit="register">
        <div class="login-form-input q-mx-auto q-px-md font-sh">
          
          <div class="q-pa-sm">
            <q-input v-model="email" label="Email" 
            :rules="[val => validateEmail(val) || 'Must be a valid email']"/>
          </div>
          <div class="q-pa-sm">
            <q-input v-model="password" type="password" label="Password" 
            :rules="[val => validatePassword(val) || 'Must contain 8 characters, uppper and lowercase letter, number and special character']" />
          </div>
          <div class="q-py-md">
            <q-checkbox
              v-model="acceptTerms"
              label="Accept Terms of Use"
              class="text-body2"
            />
            <q-btn
              dense
              unelevated
              size="sm"
              class="text-body2 float-right q-mt-sm"
              to="/terms"
              >View Terms of Use</q-btn
            >
          </div>
          <div class="text-center">
            <div>
              <q-btn
              type="submit"
              color="secondary"
              class="full-width text-body1"
              :disable="!validated"
              >Subscribe</q-btn
            >
            </div>
            <small>Subscribing will redirect to a secure link for entering payment details</small>
          </div>
          
        
          

          <!--
            GOOGLE REGISTER BUTTON
            <div class="q-py-lg divider">
            <hr />
          </div>
          <div>
            <q-btn class="full-width q-pa-sm">
              <img style="height: 25px;"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            </q-btn>
          </div> -->

        </div>
      </q-form>
      </q-card-section>

      <q-slide-transition>
        <div class="q-gutter-sm" v-if="bannerStatus">
          <q-banner
            dense
            class="bg-info text-white"
            :class="{
              'bg-negative text-white': bannerMessage.includes('Error'),
            }"
          >
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
    <q-inner-loading :showing="loading">
      <div class="font-heading text-h6 q-ma-md">Preparing your account</div>
      <q-spinner color="accent" size="3.5em" />
    </q-inner-loading>
  </div>
</template>

<script setup>
import { validateEmail, validatePassword } from 'assets/js/validationUtils';
import { useAuthStore } from '~/stores/auth-store';
import { STRIPE_PAYMENT_LINK } from "~/stores/constant-store";

const loading = ref(false);
const email = ref("");
const password = ref("");
const acceptTerms = ref(false);
const bannerMessage = ref("");
const bannerStatus = ref(false);

const validated = computed(() => {
  let validEmail = email.value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const passwordRe = /^(?=.*\d)(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  let validPassword = passwordRe.test(password.value)

  return validEmail && validPassword && acceptTerms.value
})

const register = () => {
  const authStore = useAuthStore()
  authStore.register(email.value, password.value).then(data => {
    if (data.value) {
        navigateTo(`${STRIPE_PAYMENT_LINK}?prefilled_email=${data.value.email}&client_reference_id=${data.value.id}`, {
          external: true, open: {target: '_blank'}
        })
      }
  })

}

</script>

<style lang="scss" scoped>
</style>