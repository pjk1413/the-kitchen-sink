<template>
    <div class="bg-color q-pa-xl text-body">
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

        </div>
        <div>
            <q-btn-group spread flat class="text-white">
                <q-btn to="/howitworks#howitworks">How it Works</q-btn>
                <q-btn to="/howitworks#registration">Registration</q-btn>
                <q-btn to="/howitworks#moreinformation">More Information</q-btn>
            </q-btn-group>
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