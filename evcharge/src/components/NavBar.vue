<template>
    <v-app-bar :elevation="2" :height=100>
        <v-container fluid>
            <v-row>
                <v-col cols="8">
                    <button @click="$router.push('/')">
                        <v-img id="nav-logo" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img>
                    </button>
                    <!-- <v-app-bar-nav-icon>
                        <v-img id="nav-logo" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img>
                    </v-app-bar-nav-icon> -->
                </v-col>

                <v-col cols="4" class="menu-options">
                    <button @click="$router.push('/')" class="menu-op">About</button>
                    <button @click="$router.push('/TesterFile')" class="menu-op">Book</button>
                    <button @click="$router.push('/TesterFile')" class="menu-op">Plan</button>
                    <button @click="$router.push('/signup')" class="menu-op">Sign Up</button>
                    <v-btn @click="this.$router.push('/login')" class="btn-style">Log In</v-btn>
                    <!-- <nav>
                        <router-link to="/" class="menu-op">About</router-link>
                        <router-link to="/TesterFile" class="menu-op">Book</router-link>
                        <router-link to="/TesterFile" class="menu-op">Plan</router-link>
                        <router-link to="/signup" class="menu-op">Sign Up</router-link>
                        <v-btn @click="this.$router.push('/login')" class="btn-style">Log In</v-btn>
                    </nav>  -->
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>
  
<script>
import { onMounted, ref } from "vue";
import { signOut, getAuth, onAuthStateChanged } from '@firebase/auth';

let isLoggedIn = ref(false);

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    });
});

export default {
    name: 'NavBar',
    methods: {
        signOutPress() {
            signOut(auth).then(() => {
                isLoggedIn.value = false;
                this.$router.push("/")
            })
        }
    }
}
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300&display=swap');

#nav-logo {
    width: 200px;
    height:42px;
    margin-left: 107px;
    align-items: center;
}

.menu-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.menu-op {
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #000;
    width: 80px;
}

.menu-op:hover {
    color: #4285f4;
}

.btn-style {
    background-color: #4285f4;
    color: #FFFFFF;
    font-family: 'Outfit', sans-serif;
    font-weight: bold;
    font-size: 20px;
    border-radius: 80px;
    text-transform: none;
    width: 107px;
    height: 54px;
}
</style>