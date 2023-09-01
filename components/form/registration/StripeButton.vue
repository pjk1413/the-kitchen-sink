<template>
    
    <Script async src="https://js.stripe.com/v3/buy-button.js"></Script>

    <div>
        <stripe-buy-button
            class="stripe-button-el"
            :customer-email="props.email"
            buy-button-id="buy_btn_1Nk5vXJ1HJiIqqAHunlzcMhl"
            publishable-key="pk_test_51NU7jUJ1HJiIqqAHprv1sVK7kNrqO9ZGJx8GrfHXJ9QDrAwxh0ZMNgtcurWoP9IuolLh5J7qvsV6fw71ODlK5XtL00us6qeQdJ"
            >
        </stripe-buy-button>
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