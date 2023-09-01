<template>
    <div class="container bg-color full-height">

        <div class="row full-height">
            <div class="col">
                <div class="text-uppercase text-h6 q-ma-lg mobile-space">
                    Welcome to Kitchen Sink,
                </div>
                <img class="gt-sm w-75 q-ml-auto float-right" src="~/assets/images/semi-circle.png" />
            </div>

            <div class="col-md-8 full-height">
                <div class="q-mx-auto full-height">
                    <div class="text-h3 text-weight-light q-mx-xl q-mt-lg mobile-space">
                        Craft recipes from your pantry's bounty, tailor shopping lists with clever swaps, and curate versatile collections 
                        that adapt to your evolving tastes and needs.
                    </div>
                    <div class="q-py-lg" ></div>
                    <div class="text-h3 text-weight-light q-mx-xl q-mb-lg mobile-space">
                        Trim waste and save time with efficient shopping lists featuring smart ingredient swaps. 
                    </div>

                    <div class="text-h3 q-mx-xl q-py-lg mobile-space">
                        <q-btn class="q-pa-md text-h6" outline @click="modalStore.open('register')">Get Started</q-btn>
                    </div>
                </div>
            </div>

        </div>



    </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal-store';

const modalStore = useModalStore()

</script>

<style lang="scss" scoped>
.bg-color {
    background-color: $secondary;
}

.mobile-space {}

@media (max-width: $breakpoint-sm-min) {
    .mobile-space {
        height: 25%;
    }
}
</style>