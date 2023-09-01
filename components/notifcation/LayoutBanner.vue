<template>
        <q-banner inline-actions v-if="isOpen"
            :class="`fix-bottom text-h5 text-white bg-${notificationStore[props.name].color}`">
            {{ notificationStore[props.name].message }}
            <template v-slot:action>
                <q-btn @click="close" flat color="white" :label="notificationStore[props.name].btnText" />
            </template>
        </q-banner>
</template>

<script setup>
import { useNotificationStore } from '~/stores/notification-store'

const notificationStore = useNotificationStore();

const props = defineProps({name: String})

const close = () => {
    notificationStore.close(props.name)
}

const isOpen = computed(() => {
    return notificationStore[props.name].isOpen
})

watch(isOpen, (open, prev) => { 
    if (notificationStore[props.name].useTimer) {
        setTimeout(() => close(), 5000)}
    })

</script>

<style lang="scss" scoped>

.fix-bottom {
    position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
}


</style>