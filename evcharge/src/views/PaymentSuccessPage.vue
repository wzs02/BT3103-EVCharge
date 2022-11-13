<template>
    <v-app>
        <NavBarLogin />
        <div class="bg-container">
            <img v-bind:src="bg_img" id="bg-ratio">
        </div>

        <div class="center">
            <v-card elevation id="card">
                <div style="margin-top: 40px;">
                    <p id="status-text">Payment Successful</p>
                    <div class="center-div">
                        <router-link :to="{ path: '../account-balance' }">
                            <v-btn class="btn-style">Back to Account Balance</v-btn>
                        </router-link>
                    </div>
                </div>
            </v-card>
        </div>
    </v-app>
</template>

<script>
import NavBarLogin from "@/components/NavBarLogin.vue";

export default {
    name: 'PaymentSuccessPage',
    components: { NavBarLogin },
    data() {
        return {
            bg_img: require('../assets/AccountBalancePage/Allura.png')
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@400;700&display=swap');

.bg-container {
    position: fixed;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
}

#bg-ratio {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    min-width: 50%;
    min-height: 50%;
}

.center {
    width: 500px;
    height: 400px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
}

#card {
    align-items: center;
    height: 200px;
    border-radius: 30px;
}

#status-text {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 600;
    text-align: center;
    font-size: 40px;
    color: green;
    margin-bottom: 10px;
}

.center-div {
    display: flex;
    justify-content: center
}

.btn-style {
    background-color: #fff;
    color: #000;
    font-family: 'Outfit', sans-serif;
    font-weight: bold;
    text-transform: none;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>