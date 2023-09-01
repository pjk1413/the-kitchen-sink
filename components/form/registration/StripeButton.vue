<template>
    
    <!-- <Script async src="https://js.stripe.com/v3/buy-button.js"></Script> -->

    <div>
    </div>

</template>

<script setup>

const props = defineProps({
    email: String
})

const testClick = (event) => {
    console.log(event)
}

</script>

<style lang="scss" scoped>

</style>