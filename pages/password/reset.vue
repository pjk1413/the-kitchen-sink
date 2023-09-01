<template>
    <div class="relative-position fullscreen">
    <div class="absolute-center">
      <div>
        <q-slide-transition>
          <div class="text-positive text-center font-other" v-if="success">
            <h4 class="text-weight-light">Success</h4>
          </div>
        </q-slide-transition>
        <q-slide-transition>
          <div class="text-negative text-center font-other" v-if="failure">
            <h5>Failed, please try again later</h5>
          </div>
        </q-slide-transition>

        <q-card flat class="font-paragraph">
          <q-form @submit="resetPassword">
          <q-card-section>
            <div class="text-h3 text-weight-light">Reset your password</div>
          </q-card-section>
          
          <q-card-section>
            <q-input v-if="isRequest" type="email" v-model="email" label="Email" color="dark" 
            :rules="[val => validateEmail(val) || 'Must be a valid email']">
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input v-else type="password" v-model="password" label="Password" color="dark" 
            :rules="[val => validatePassword(val) || 'Must contain 8 characters, uppper and lowercase letter, number and special character']">
              <template v-slot:prepend>
                <q-icon name="key" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-section>

            <q-btn :disable="!(isRequest ? validateEmail(email) : validatePassword(password))" 
            color="accent" class="full-width q-my-sm" type="submit"
              >Submit</q-btn
            >
            <q-btn
              outline
              color="accent"
              class="full-width q-my-sm"
              to="/"
              icon="home"
              label="home"
            ></q-btn>
          </q-card-section>

            </q-form>

        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { validateEmail, validatePassword } from 'assets/js/validationUtils';
const config = useRuntimeConfig()
const { currentRoute } = useRouter();

const email = ref("")
const password = ref("")
const success = ref(false)
const failure = ref(false)
const errorMessage = ref("")

const isRequest = computed(() => {
    return !('uid' in currentRoute.value.params)
})

const resetPassword = async () => {
    let url = `${config.public.apiBase}auth/users/reset_password/`
    let body = { email: email.value }

    if (!isRequest.value) {
        url = `${config.public.apiBase}auth/users/reset_password_confirm/`
        body = { 
            uid: currentRoute.value.params.uid, 
            token: currentRoute.value.params.token, 
            new_password: password.value 
        }
    }

  const { data, error, status } = await useFetch(url, { method: 'POST', 
  body: body})

  if (error.value == null) {
    success.value = true
  }

  if (error.value != null) {
    error.value = true
  }
}

</script>

<style lang="scss" scoped>

</style>