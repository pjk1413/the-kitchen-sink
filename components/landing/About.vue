<template>
    <div class="bg-color">
        <div class="row">
            <div class="col-md-6 q-pl-xl q-pt-xl text-body">
                <div class="text-uppercase text-h5 q-mb-xl">
                    Our Mission,
                </div>

                <div class="q-px-lg q-pt-lg text-weight-light text-h5" :class="{ 'q-mx-xl': $q.screen.gt.sm }">

                    We empower you to craft extraordinary recipes from the ingredients you already possess,
                    optimizing your shopping with intelligent swaps that reduce waste and save time. Embrace a new era of
                    cooking, where resourcefulness, efficiency, and innovation converge to
                    elevate every meal you create.
                    <div>
                        <img class="semi-circle q-mx-lg q-mt-lg gt-sm w-25" src="~/assets/images/semi-circle.png" />
                        <q-btn class="q-pa-md" :class="{ 'q-mt-xl': !$q.screen.gt.md }" to="/howitworks" outline>Learn
                            More</q-btn>
                    </div>

                </div>

            </div>
            <div class="col-md-6 q-mx-auto">
                <div class="q-py-md q-mx-auto" >
                    <img style="max-height: 700px;" class="splash-image q-mx-auto gt-xs" src="~/assets/images/food-about.jpg" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.bg-color {
    background-color: $primary;
}

.splash-image {
  object-fit:cover;
  border-radius: 20px;
  min-width: 300px;
  display: block;
}
</style>