<template>
    <div>
        <div class="q-mb-xl">
            <LandingHero />
        </div>  
        <div>
            <LandingWelcome />
        </div>  
        <div>
            <LandingInfo />
        </div>
        <div>
            <LandingAbout />
        </div>
    </div>

    <RecipeInstructionsDialog />
    
</template>

<script setup>
import { useModalStore } from '~/stores/modal-store';

definePageMeta({ layout: 'public'})
const { currentRoute } = useRouter();
const modalStore = useModalStore();

onMounted(() => {
    if (currentRoute.value && currentRoute.value.query.email) {
        modalStore._login.email = currentRoute.value.query.email
    }
})

</script>

<style lang="scss" scoped>

</style>