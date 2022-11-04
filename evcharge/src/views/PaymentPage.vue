<template>
    <h1>Stripe Payment Gateway Integration</h1>
    <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems"
        :success-url="successURL" :cancel-url="cancelURL" @loading="v => loading = v" />
    <button style="background-color: red;" @click="submit">Pay Now</button>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe'

export default {
    components: {
        StripeCheckout
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
            successURL: 'http://localhost:8080/payment-success',
            cancelURL: 'http://localhost:8080/payment-error'
        }
    },
    methods: {
        submit() {
            //Directs to stripe checkout page 
            this.$refs.checkoutRef.redirectToCheckout()
        }
    }
}
</script>

<style scoped>

</style>