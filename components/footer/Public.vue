<template>
  <div>
    <!-- <hr class="q-ma-xl" /> -->
    <div class="links q-mt-xl text-body">
      <div class="">
        <div class="">
          <div class="text-h4 text-weight-light q-px-xl">
            Sign up to start using Kitchen Sink today.
          </div>
          <div class="text-h6 q-px-xl q-pt-lg">
            Register now and recieve a 1 month free trial!
          </div>
          <div class="q-mx-xl q-ma-md">
            <q-btn size="lg" flat class="q-px-md bg-positive text-white" @click="registerModal()">Sign up</q-btn>
          </div>
          <div class="q-px-xl q-pt-lg text-subtitle2">
            We value and respect your privacy
          </div>
        </div>
        
      </div>
    </div>
    <hr class="q-mx-xl" />
    <div class="text-body">
          <div class="text-right" :class="{ 'q-px-lg': $q.screen.gt.sm }">
            <q-btn-group flat>
              <q-btn to="/howitworks">MORE INFORMATION</q-btn>
              <q-btn @click="loginModal()">LOGIN</q-btn>
              <q-btn @click="registerModal()">SIGN UP</q-btn>
              <q-btn to="/contactus">CONTACT US</q-btn>
            </q-btn-group>
          </div>
        </div>
    <div>
      <div class="custom-heading text-center q-ma-xl q-pt-xl text-h1 text-heading">
        Kitchen Sink
      </div>
    </div>
    <div class="bar"></div>
  </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal-store'

const store = useModalStore();
const loginModal = () => {
  store.open('login')
}
const registerModal = () => {
  store.open('register')
}
</script>

<style lang="scss" scoped></style>