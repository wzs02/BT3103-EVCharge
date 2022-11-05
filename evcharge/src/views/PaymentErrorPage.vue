<template>
    <v-app>
        <NavBarLogin />
        <div class="bg-container">
            <img v-bind:src="bg_img" id="bg-ratio">
        </div>

        <div class="center">
            <v-card elevation id="card">
                <div style="margin-top: 70px;">
                    <p id="status-text">Payment Failed</p>
                    <div class="center-div">
                        <router-link :to="{ path: '../payment' }">
                            <v-btn class="btn-style">Back to Payment Page</v-btn>
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
    name: 'PaymentErrorPage',
    components: { NavBarLogin },
    data() {
        return {
            bg_img: require('../assets/PaymentStatusPage/Allura.png')
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@400;700&display=swap');

.bg-container {
    position: relative;
    text-align: center;
}

#bg-ratio {
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#status-text {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 600;
    text-align: center;
    font-size: 40px;
    color: red;
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