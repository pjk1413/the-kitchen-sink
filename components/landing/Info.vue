<template>
    <div class="bg-color q-pa-xl">
        <div class="text-white text-h1 q-py-lg" :class="{ 'q-ma-xl': $q.screen.gt.md }">
            Embrace a fresh way to cook, shop, and explore.
        </div>
        <hr class="w-75 q-ml-auto" />
        <div class="row font-paragraph q-mt-xl">
            <div class="col-md-4">
                <LandingInfoCard 
                heading="Ingredient-Centric Cooking" 
                subheading="Unleash your creativity from your pantry." 
                text="Craft flavorful recipes with on-hand ingredients. Transform everyday supplies into culinary masterpieces"
                btnText="accent" />
            </div>
            <div class="col-md-4">
                <LandingInfoCard 
                heading="Smart Shopping Lists"
                subheading="Maximizing Efficiency, Minimizing Waste"
                text="Optimize Shopping with Clever Ingredient Swaps. Reduce Waste and Save Time While Shopping."
                btnText="primary" />
            </div>
            <div class="col-md-4">
                <LandingInfoCard 
                heading="Adaptable Recipe Collections"
                subheading="Your Culinary Universe, Tailored for You"
                text="Curate Reusable Collections for Various Needs. Sort, Filter, and Modify Recipes at Your Fingertips"
                btnText="secondary"/>
            </div>

            <!-- <div class="col-md-6">
                <div :class="{ 'q-px-xl': $q.screen.gt.md }">
                    <div class="text-white text-h4 q-my-lg" :class="{ 'q-ma-xl': $q.screen.gt.md }">
                        Tokens, not subscriptions
                    </div>
                    <div class="text-white text-h5 q-my-lg" :class="{ 'q-ma-xl': $q.screen.gt.md }">
                        We use a token model to provide you with an adhoc way to generate your recipes. One recipe is one
                        token. Sweeet
                        and simple.
                    </div>
                    <hr class="w-75" />
                </div>
            </div>

            <div class="col-md-6">
                <div :class="{ 'q-px-xl': $q.screen.gt.md }">
                    <div class="text-white text-h4 q-my-lg" :class="{ 'q-ma-xl': $q.screen.gt.md }">
                        Shopping Lists, Optimized
                    </div>
                    <div class="text-white text-h5 q-my-lg" :class="{ 'q-ma-xl': $q.screen.gt.md }">
                        Every recipe comes with a list of alternative ingredients. When generating a shopping list you have
                        the option
                        to optimize that list to use the fewest different ingredients possible.
                    </div>
                    <hr class="w-75" />
                </div>
            </div>

            <div class="col-md-6">
                <div :class="{ 'q-px-xl': $q.screen.gt.md }">
                    <div class="text-white text-h4 q-my-lg" :class="{ 'q-ma-xl': $q.screen.gt.md }">
                        Collections
                    </div>
                    <div class="text-white text-h5 q-my-lg" :class="{ 'q-ma-xl': $q.screen.gt.md }">
                        Build collections of recipes to drive your shopping lists or just to group your creations together.
                    </div>
                    <hr class="w-75" />
                </div>
            </div> -->

        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

.bg-color {
    background-color: rgba(117,52,89,1)
}
</style>