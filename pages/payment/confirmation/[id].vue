<template>
    <div class="absolute-center text-h4 text-weight-light w-75">
        <q-carousel
        @transition="val => nextSlide(val)"
        v-model="step"
        transition-prev="scale"
        transition-next="scale"
        :autoplay="3000"
        infinite
        transition-duration="500"
        animated
        padding
        class="text-black"
      >
        <q-carousel-slide :name="i" class="column no-wrap flex-center" v-for="slide,i in steps">
          <div class="q-mt-md text-center">
            {{ slide }}
          </div>
        </q-carousel-slide>
      </q-carousel>
        
        <q-linear-progress stripe rounded size="20px" :value="progress" color="warning" class="q-mt-sm" />
    </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal-store';
// import { useAccountStore } from '~/stores/account-store';
// import { config } from 'process';
    const config = useRuntimeConfig();
    const { currentRoute } = useRouter();
    // const accountStore = useAccountStore()
    
    const modalStore = useModalStore()
    const step = ref(0)
    const steps = ['Confirming User Details', 'Verifying Subscription Status', 'Assembling Recipes']
    const progress = ref(0.0)

    const interval = setInterval(() => {
        progress.value += .1
    }, 300)

    const { data } = useAsyncData(currentRoute.value.params.id, () => $fetch(`api/payments/confirm?checkout_session_id=${currentRoute.value.params.id}`, 
    { baseURL: config.public.apiBase }));

    const refresh = () => refreshNuxtData(currentRoute.value.params.id) 
    onMounted(() => { refresh() })
    
    watch(data, (d, oldD) => {
        if (d.is_active === true) {
            let wait = 3000
            if (progress.value > .8) {
                wait = 100
            }

            setTimeout(() => {
                clearInterval(interval)
                modalStore.open('login')
                useRouter().push(`/?email=${d.email}`)
            }, wait)
        }
    })

</script>

<style lang="scss" scoped>

</style>