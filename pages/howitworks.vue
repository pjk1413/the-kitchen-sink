<template>
  <div id="howitworks" class="q-pa-xl">
    <div class="row">
      <div class="col-md-6 text-body">
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
      <div class="col-md-6 q-mx-auto">
        <div class="q-mx-auto">
          <img style="max-height: 600px;" class="splash-image how-it-works-image q-mx-auto gt-xs q-mx-auto"
            src="~/assets/images/food-howitworks.jpg" />
        </div>
      </div>
    </div>
    <hr class="q-ma-xl" />
    <a id="moreinformation">
      <div class="text-center text-body">
        <div class="text-h2">
          How it Works
        </div>
      </div>
    </a>
    <div class="row text-body">

      <div class="col-lg-4" v-for="card in cards">
        <LandingInfoHowItWorksCard :title="card.title" :body="card.body" />
      </div>

    </div>
    <div class="text-center text-body">
      <q-btn size="lg" outline @click="registerModal()">Sign Up</q-btn>
    </div>

    <hr class="q-ma-xl" />
    <!-- <a id="pricing">
      <div class="text-center text-body">
        <div class="text-h2">
          Pricing and Registration
        </div>
      </div>
    </a> -->
    <div class="text-body text-body1 q-pa-md">
      <!-- <div>
        At <span class="text-heading">KitchenSink</span>, we believe in providing a seamless experience for all food
        enthusiasts. To access the full array of features and unlock the unlimited potential of our platform, we offer a
        straightforward subscription model.
      </div>
      <div>
        <div class="row">
          <div class="col-md-6" v-for="card in pricing">
            <q-card flat bordered class="q-ma-md q-pa-md">
              <q-card-section>
                <span class="text-weight-bold">{{ card.title }}:</span> {{ card.body }}
              </q-card-section>
              <q-card-section v-if="card.title === 'Subscription'" class="text-center">
                <div class="text-h4">$3 <span class="text-body1">per month</span></div>
              </q-card-section>
            </q-card>
          </div>

        </div>

      </div> -->
      <div class="q-ma-lg">
        <a id="registration">
          <div class="text-h5 text-weight-bold">
            Registration
          </div>
        </a>
        <div class="text-body1">
          Getting started is a breeze:
        </div>
        <div class="text-body-1">
          <div class="row q-my-md">
            <div class="col-md-4" v-for="card in registration">
              <q-card flat bordered class="q-ma-sm q-pa-sm">
                <q-card-section>
                  <div class="text-h6">
                    {{ card.title }}
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="text-body1">
                    {{ card.body }}
                  </div>
                </q-card-section>

              </q-card>

            </div>
          </div>
        </div>
      </div>
      <div class="text-center text-body">
        <q-btn size="lg" outline @click="registerModal()">Sign Up</q-btn>
      </div>

    </div>


  </div>
</template>

<script setup>
import { useModalStore } from '~/stores/modal-store';
definePageMeta({ layout: 'public', auth: false })

const cards = [
  { title: "Discover and Collect", body: "Begin your culinary journey by searching for recipes or providing a website URL for us to scrape. Our powerful search engine scours the web to find the most mouthwatering recipes from top sources. Whether you have a specific dish in mind or are simply exploring, we've got you covered." },
  { title: "Curate Culinary Collections", body: "Take your culinary organization to the next level by creating collections. Whether it's a collection of healthy breakfasts, hearty dinners, or recipes for that special dinner party, it's easy to group your favorite finds. Name your collections, add descriptions, and watch as your virtual cookbook takes shape." },
  { title: "Simple Planning and Shopping", body: "Now comes the fun part! Generate shopping lists effortlessly based on the recipes you've collected. Say goodbye to last-minute grocery store dashes and the frustration of missing ingredients. Our intelligent system compiles your shopping list, ensuring you have everything you need at your fingertips." }
]

const pricing = [
  { title: "One Month Free Trial", body: "Start your culinary journey for free! With our free plan, you can explore, discover, and collect recipes to your heart's content. However, for more advanced features like enhanced meal planning and personalized recommendations, consider our premium options." },
  { title: "Subscription", body: "Create and organize collections, generate shopping lists effortlessly, and explore a world of culinary inspiration." }
]

const registration = [
  { title: "Sign Up", body: "Begin by creating your KitchenSink account using your email and a password. It's quick and easy, and you'll be exploring delicious recipes in no time." },
  // { title: "Payment", body: "After signing up, you'll be directed to a page to securely input your credit card information. Rest assured, you won't be charged for the first month, and your card will only be billed after the trial period ends." },
  { title: "Login", body: " Once your account is set up, you'll be redirected back to the login page. Simply log in with your newly created credentials." },
  { title: "Enoy!", body: "You're all set! Start your one-month free trial and explore the full range of RecipeCollect features. Remember, you can cancel anytime during this period without any hassle." }
]

const store = useModalStore();

const registerModal = () => {
  store.open('register')
}

</script>

<style lang="scss" scoped>
.splash-image {
  object-fit: cover;
  border-radius: 20px;
  min-width: 300px;
  display: block;
}</style>