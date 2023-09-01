<template>
    <div class="q-pa-xl">
    <div class="row">
      <div class="col-md-6">
        <div class="text-h2 font-heading q-py-md">
          A New Way of Cooking
        </div>
        <div class="text-h5 font-paragraph q-pa-md">
          You might think you don't have anything to eat at home, or that you need to run to the store. Check again, input
          the ingredients you have and see what you could create.
        </div>

        <div class="text-h5 font-paragraph q-pa-md">
          Finding ingredients at your local grocery store can be challenging and expensive when you want to cook cuisine
          from other parts of the world. Checking for alternatives has never been easier.
        </div>
      </div>
      <div class="col-md-6">
        <div>
          <img class="how-it-works-image q-mx-auto gt-xs" src="./../assets/images/food-table.jpg" />
        </div>
      </div>
    </div>
    <hr class="q-ma-xl" />
    <div class="text-center">
      <div class="text-h2 font-heading">
        How it Works
      </div>
    </div>
    <div class="row">

      <div class="col-md-4">
        <div class="text-h3 font-heading text-italic q-my-lg title-box">
          Create Recipes and Collections
        </div>
        <div class="text-h5 font-paragraph q-my-md">
          Create recipes and add them to collections. Use those collections to create shopping lists and group recipes.
        </div>
      </div>

      <div class="col-md-4">
        <div class="text-h3 font-heading text-italic q-my-lg title-box">
          Optimize Shopping Lists
        </div>
        <div class="text-h5 font-paragraph q-my-md">
          After you have collections created and recipes added, optimize your shopping list to find the least number of
          ingredients.
        </div>
      </div>

      <div class="col-md-4">
        <div class="text-h3 font-heading text-italic q-my-lg title-box">
          Purchase Tokens
        </div>
        <div class="text-h5 font-paragraph q-my-md">
          Purchase additional tokens to continue using. Pay for only what you need. No subscriptions.
        </div>
      </div>
    </div>
    <div class="text-center">
      <q-btn outline @click="registerModalOpen()">Sign Up</q-btn>
    </div>


  </div>
</template>

<script setup>
definePageMeta({ layout: 'public', auth: false })

</script>

<style lang="scss" scoped>

</style>