<template>
    <div>
        <q-card flat square :class="`w-90 q-mx-auto text-white bg-transparent bbg-${props.color}`">

            <q-card-section>
                <div class="text-h4 text-weight-light">{{ props.heading }}</div>
                <!-- <div class="text-h6">Unleash Your Creativity from Your Pantry</div> -->
            </q-card-section>

            <q-card-section class="q-pt-none">
                <!-- <div class="text-uppercase bold text-subheading">
                    {{ props.subheading }}
                </div> -->
                <div class="text-body1 q-mt-sm">
                    {{ props.text }}
                </div>
                <!-- <div class="q-mt-md q-ml-lg">
                    <q-btn flat>{{ props.btnText }}</q-btn>
                </div> -->
                

            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
const props = defineProps({
    heading: String,
    subheading: String,
    text: String,
    btnText: String,
    btnAction: function(){},
})

</script>

<style lang="scss" scoped>
.bg-transparent-card {
    // background-color: rgba(117,52,89, .8)
    background-color: $accent;
}

.bold {
    font-weight: 900;
}

.w-90 {
    width: 90%
}
</style>