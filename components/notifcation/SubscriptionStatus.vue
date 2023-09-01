<template>
    <q-card class="bg-primary text-white">
        <q-card-section>
            <div class="text-h6 text-weight-light">
                Your Subscription is Expiring Soon...
            </div>
            <div>
                <q-linear-progress stripe rounded size="20px" 
                :value="progress" 
                color="warning" track-color="white" class="q-mt-sm" />
            </div>
        </q-card-section>
        <q-card-section>
            <div class="flex">
                <q-space />
                <div class="q-pa-sm text-weight-light">
                    Expires in {{ daysUntil }} days...
                </div>
                <div>
                    <q-btn outline @click="accountStore.subscribe()">Renew</q-btn>
                </div>
            </div>
            
        </q-card-section>
        
    </q-card>
</template>

<script setup>
import { useAccountStore } from '~/stores/account-store';


const accountStore = useAccountStore()

const props = defineProps({
    expires: String
})

const daysUntil = computed(() => {
    const expiresAt = new Date(props.expires);
    const currentDate = Date.now();
    return Math.floor((expiresAt - currentDate) / (1000 * 3600 * 24))
})

const progress = computed(() => {
    return (31 - daysUntil.value) / 31
})

</script>

<style lang="scss" scoped>

</style>