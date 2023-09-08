<template>
    <div class="q-pt-md">
    <q-toolbar
      class="bottom-border q-mx-auto"
      :class="{ 'q-px-lg': $q.screen.gt.sm }"
    >
      
      <q-btn class="nav-home-size q-mt-sm text-heading" flat to="/" no-caps>
        Kitchen Sink
      </q-btn>

      <q-space />

      <q-btn v-if="$q.platform.is.mobile" flat round dense icon="menu">
        <q-menu class="text-body">
          <q-list style="min-width: 100px">
            <q-item v-ripple clickable v-close-popup to="/howitworks">
              <q-item-section>HOW IT WORKS</q-item-section>
            </q-item>
            <q-item v-ripple clickable v-close-popup @click="$refs.login.show()">
              <q-item-section>LOGIN</q-item-section>
            </q-item>
            <q-item v-ripple clickable v-close-popup @click="$refs.register.show()">
              <q-item-section>SIGN UP</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        </q-btn>
      <q-btn-group flat shrink v-else class="text-body">
        <q-btn  to="/howitworks">HOW IT WORKS</q-btn>
        <q-btn @click="$refs.login.show()">LOGIN</q-btn>
        <q-btn @click="$refs.register.show()">SIGN UP</q-btn>
      </q-btn-group>
    </q-toolbar>

    <q-dialog
      persistent
      :maximized="isMobile"
      transition-show="scale"
      transition-hide="scale"
      v-model="modalStore.login.isOpen"
      ref="login"
    >
      <FormLogin />
    </q-dialog>

    <q-dialog
      v-model="modalStore.register.isOpen"
      :maximized="isMobile"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ref="register"
    >
      <FormRegister />
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useModalStore } from '~/stores/modal-store'
const $q = useQuasar();

const isMobile = ref(false);

onMounted(() => {
    isMobile.value = $q.platform.is.mobile
});

const modalStore = useModalStore();

</script>

<style lang="scss" scoped>
  .nav-home-size {
    font-size: 1.2rem;;
  }
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


