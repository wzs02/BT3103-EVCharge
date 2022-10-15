<template>
    <v-app-bar :elevation="2">
        <v-container fluid>
            <v-row>
                <v-col cols="8">
                    <v-app-bar-nav-icon>
                        <v-img id="nav-logo" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img>
                    </v-app-bar-nav-icon>
                </v-col>

                <v-col cols="3" class="menu-options">
                    <nav>
                    <router-link to="/" class="menu-op">About</router-link>
                    <router-link to="/TesterFile" class="menu-op">Book</router-link>
                    <router-link to="/TesterFile" class="menu-op">Plan</router-link>
                    <router-link to="/signup" class="menu-op">Sign Up</router-link>
                    <v-btn @click="this.$router.push('/login')" class="btn-style">Log In</v-btn>
                </nav> 
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
    width: 140px;
    margin-left: 150px;
}

.menu-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.menu-op {
    font-family: 'Outfit', sans-serif;
    font-weight: bold;
}

.menu-op:hover {
    color: #4285f4;
}

.btn-style {
    background-color: #4285f4;
    color: #FFFFFF;
    font-family: 'Outfit', sans-serif;
    font-weight: bold;
    border-radius: 20px;
    text-transform: none;
}
</style>