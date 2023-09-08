<template>
      <!-- <div class="q-py-md font-paragraph"> -->
  <q-toolbar class="q-mx-auto q-px-lg text-dark text-body">
    <q-btn class="q-mt-sm text-heading" flat to="/secure">
      KITCHEN SINK
    </q-btn>
    <q-space />

    <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
    <q-btn-group flat v-if="$q.screen.gt.xs">
      <q-btn to="/secure/shoppinglist" icon="shopping_cart">SHOPPING LIST</q-btn>
      <q-btn to="/secure/account" icon="account_circle">ACCOUNT</q-btn>
    </q-btn-group>
    <q-btn v-if="!$q.screen.gt.xs" flat round dense icon="menu">
      <q-menu>
        <q-list style="min-width: 150px">
          <q-item clickable v-ripple to="/secure/shoppinglist">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>
              <q-item-label>SHOPPING LIST</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/secure/account">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section>
              <q-item-label>ACCOUNT</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu></q-btn>
  </q-toolbar>

  <q-dialog persistent transition-show="scale" transition-hide="scale" ref="login">
    <login-form />
  </q-dialog>

  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale" ref="register">
    <register-form />
  </q-dialog>
  <!-- </div> -->
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


