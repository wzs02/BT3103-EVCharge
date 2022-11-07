<template>
    <v-app>
        <NavBarLogin />
        <div id="top-up-div">
            <p id="greeting">Hi, John!</p>
            <p id="available-deposit">Available Deposit: $30.00</p>
            <p id="notice">A minimum of $30.00 is needed to make a reservation</p>
            <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems"
                :success-url="successURL" :cancel-url="cancelURL" @loading="v => loading = v" />
            <v-btn id="btn-style" @click="submit">Top up deposit</v-btn>
        </div>

        <div id="history-div">
            <p id="transactions-header"> Previous Transactions</p>
        </div>
    </v-app>
</template>

<script>
import NavBarLogin from "@/components/NavBarLogin.vue";
import { StripeCheckout } from '@vue-stripe/vue-stripe'

/* Still need to fetch user name and available balance from FB */

export default {
    components: {
        StripeCheckout, NavBarLogin
    },
    data() {
        this.publishableKey = "pk_test_51M0REtKs5bTKMbCfjEQWxFTwszhZIIWTWg8pCXnnEwI6RxayRk1vYDcTPGJU0kFGuf3xR7EaF3cyBdH8vT2sF9B300H51KnG9d"
        return {
            loading: false,
            lineItems: [
                {
                    price: "price_1M0S1yKs5bTKMbCfLQG74k21",
                    quantity: 1
                }
            ],
            successURL: 'http://localhost:8080/#/payment-success',
            cancelURL: 'http://localhost:8080/#/payment-error'
        }
    },
    methods: {
        submit() {
            this.$refs.checkoutRef.redirectToCheckout()
            // Add in FB here next time, should +30 to current user's account directly 
            // FB should also contain name, date of all transactions
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@400;700&display=swap');

#top-up-div {
    margin-top: 80px;
    margin-left: 100px;
    margin-bottom: 80px;
}

#greeting {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 400;
    font-size: 25px;
    margin-bottom: 18px;
}

#available-deposit {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 700;
    font-size: 36px;
}

#notice {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 30px;
}

#btn-style {
    background-color: #4285f4;
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-weight: bold;
    text-transform: none;
    width: 450px;
}

#history-div {
    margin-left: 100px;
}

#transactions-header {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 400;
    font-size: 36px;
}
</style>