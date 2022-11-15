<template>
    <v-app>
        <div v-if="showDisplay">
            <NavBarLogin />
        </div>
        <div v-else>
            <NavBar />
        </div>
        <div class="bg-container">
            <img v-bind:src="bg_img" id="bg-ratio">

            <div class="center">
                <v-card elevation id="card">
                    <div style="margin-top: 40px;">
                        <div class="center-div">
                            <p id="status-text">The Plan page is still under development</p>
                        </div>
                        <div class="center-div">
                            <p id="update-text">Please check back later for more updates</p>
                        </div>
                        <div class="center-div">
                            <router-link :to="{ path: '../map' }">
                                <v-btn class="btn-style">Back</v-btn>
                            </router-link>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
    </v-app>
</template>

<script>
import NavBarLogin from "@/components/NavBarLogin.vue";
import NavBar from "@/components/NavBar.vue"
import { getAuth, onAuthStateChanged } from '@firebase/auth';

export default {
    name: 'PlanPageDev',
    components: { NavBarLogin, NavBar },
    data() {
        return {
            bg_img: require('../assets/AccountBalancePage/Allura.png'),
            showDisplay: false
        }
    },
    created() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.showDisplay = true;
            }
        })
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
    height: 230px;
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

#update-text {
    font-family: 'Outfit', 'sans-serif';
    margin-bottom: 20px;
    width: 400px;
    font-size: 20px;
    text-align: center;
}

.center-div {
    display: flex;
    justify-content: center;
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