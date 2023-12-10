<template>
  <!-- <div class="q-py-md font-paragraph"> -->
  <q-toolbar class="q-mx-auto q-px-lg text-dark text-body">
    <q-btn class="q-mt-sm text-heading" flat to="">
      KITCHEN SINK
    </q-btn>
    <q-space />

    <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
    <q-btn-group flat v-if="$q.screen.gt.xs">
      <q-btn v-if="isLoggedIn" to="/home/shoppinglist" icon="shopping_cart">SHOPPING LIST</q-btn>
      <q-btn v-if="isLoggedIn" to="/home/account" icon="account_circle">ACCOUNT</q-btn>
      <q-btn v-if="!isLoggedIn" @click="$refs.login.show()" icon="login">LOGIN</q-btn>
      <q-btn v-if="!isLoggedIn" @click="$refs.register.show()" icon="how_to_reg">SIGN UP</q-btn>
    </q-btn-group>
    <q-btn v-if="!$q.screen.gt.xs" flat round dense icon="menu">
      <q-menu>
        <q-list style="min-width: 150px">
          <q-item v-if="isLoggedIn" clickable v-ripple to="/home/shoppinglist">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>
              <q-item-label>SHOPPING LIST</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="isLoggedIn" clickable v-ripple to="/home/account">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section>
              <q-item-label>ACCOUNT</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!isLoggedIn" clickable v-ripple @click="$refs.login.show()">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>
            <q-item-section>
              <q-item-label>LOGIN</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!isLoggedIn" clickable v-ripple @click="$refs.register.show()">
            <q-item-section avatar>
              <q-icon name="how_to_reg" />
            </q-item-section>
            <q-item-section>
              <q-item-label>SIGN UP</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-menu></q-btn>
  </q-toolbar>

  <q-dialog persistent :maximized="isMobile" transition-show="scale" transition-hide="scale"
    v-model="modalStore.login.isOpen" ref="login">
    <FormLogin />
  </q-dialog>

  <q-dialog v-model="modalStore.register.isOpen" :maximized="isMobile" persistent transition-show="scale"
    transition-hide="scale" ref="register">
    <FormRegister />
  </q-dialog>
  <!-- </div> -->
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useAuthStore } from '~/stores/auth-store';
import { useModalStore } from '~/stores/modal-store'
const $q = useQuasar();

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = $q.platform.is.mobile
});

const modalStore = useModalStore();
const authStore = useAuthStore();

const isLoggedIn = computed(() => {
  return authStore.verify
})

</script>

<style lang="scss" scoped>
.cover {
  object-fit: cover;
}

.bottom-border {
  /* Curved corners */
  border-color: black;
  border-bottom-left-radius: 50% 40%;
  border-bottom-right-radius: 50% 40%;
}
</style>


