<template>
    <v-app-bar :elevation="0" :height=70>
        <v-container fluid>
            <v-row>
                <v-col cols="8">
                    <button @click="$router.push('/')">
                        <v-img id="nav-logo" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img>
                    </button>
                </v-col>

                <v-col cols="4" class="menu-options">
                    <button @click="$router.push('/')" class="menu-op">About</button>
                    <button @click="$router.push('/map')" class="menu-op">Book</button>
                    <button @click="$router.push('/plan-page-dev')" class="menu-op">Plan</button>
                    <button @click="$router.push('/signup')" class="menu-op">Sign Up</button>
                    <v-btn @click="this.$router.push('/login')" class="btn-style">Log In</v-btn>
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
    padding: 5px;
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