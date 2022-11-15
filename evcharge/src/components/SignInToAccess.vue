<template>
    <v-app>
        <NavBar />
        <div class="bg-container">
            <img v-bind:src="bg_img" id="bg-ratio">

            <div class="center">
                <v-card elevation id="card">
                    <div style="margin-top: 40px;">
                        <p id="status-text">Please Log In to access this page</p>
                        <div class="center-div">
                            <router-link :to="{ path: '../login' }">
                                <v-btn class="btn-style">Log In</v-btn>
                            </router-link>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
    </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
    name: 'SignInToAccess',
    components: { NavBar },
    data() {
        return {
            bg_img: require('../assets/AccountBalancePage/Allura.png')
        }
    },
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
    height: 180px;
    border-radius: 30px;
}

#status-text {
    font-family: 'Nunito', 'sans-serif';
    font-weight: 600;
    text-align: center;
    font-size: 25px;
    color: #8d8d8d;
    line-height: 50px;
    margin-bottom: 10px;
}

.center-div {
    display: flex;
    justify-content: center
}

.btn-style {
    background-color: #4285f4;
    color: #FFFFFF;
    font-family: 'Outfit';
    font-size: 18px;
    font-weight: bold;
    border-radius: 15px;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>