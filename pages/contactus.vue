<template>
    <NotifcationLayoutBanner :name="notificationTypes.contactUsBanner" />
    <div class="q-mx-auto q-my-xl" :class="{ 'w-75': $q.screen.gt.sm }">
    <div class="text-h1 font-heading q-pa-sm">Contact Us</div>
    <div class="text-body1 font-paragraph q-pa-sm">
      We try to get back to all inquiries within 1-2 business days. Please be
      patient if it takes longer.
    </div>
    <div class="font-paragraph">
      <q-form @submit="submit">
      <div class="q-pa-sm">
        <q-input v-model="name" type="text" label="Name" :rules="[val => !!val || 'Must enter a name']" />
      </div>
      <div class="q-pa-sm">
        <q-input v-model="email" type="email" label="Email" :rules="[val => validateEmail(val) || 'Must enter a valid email']" />
      </div>
      <div class="q-pa-sm">
        <q-input v-model="subject" type="text" label="Subject" :rules="[val => !!val || 'Must enter a subject']" />
      </div>
      <div class="q-pa-sm">
        <q-input v-model="message" type="textarea" label="Message" :rules="[val => !!val && val.length > 15  || 'Must enter at least 15 characters']" />
      </div>
      <div class="q-pa-sm text-center">
        <q-btn
          :label="!canSend ? 'Fill out all fields' : 'Send Message'"
          class="q-pa-md"
          :color="!canSend ? 'negative' : 'primary'"
          :disable="!canSend"
          :outline="!canSend"
          type="submit"
        ></q-btn>
      </div>
    </q-form>
    </div>
  </div>
</template>

<script setup>
import { validateEmail } from 'assets/js/validationUtils';
import { useNotificationStore } from '~/stores/notification-store';
import { notificationTypes } from '~/stores/notification-store';

definePageMeta({ layout: 'public', auth: false })

const config = useRuntimeConfig()
const notificationStore = useNotificationStore()

const name = ref("")
const email = ref("")
const subject = ref("")
const message = ref("")

const canSend = computed(() => {
  return !!name.value && !!subject.value && message.value.length > 15 && validateEmail(email.value)
})

const submit = async () => {
  const { data, error} = await useFetch(`${config.public.apiBase}api/messages/`, 
  { method: 'POST', body: { name: name.value, email: email.value, subject: subject.value, message: message.value }})


  if (error.value != null) {
    let message = 'Error sending message, please try again later'

    if (error.value.data.code == 2) {
      message = 'Too many messages sent today, please try again tomorrow'
    }

    if (error.value.data.code == 3) {
      message = 'There is an error with our severs, please try again later'
    }

    notificationStore.open(notificationTypes.contactUsBanner, message, 'negative', 'Dismiss', false)
  } else {
    notificationStore.open(notificationTypes.contactUsBanner, 'Message sent', 'positive', 'Dismiss', false)
  }

}

</script>

<style lang="scss" scoped>

</style>