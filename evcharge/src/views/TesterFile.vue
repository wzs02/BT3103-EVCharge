<template>
    <v-app>
        <v-container>
          <NavBarLogin/>
      </v-container>

      <v-container>
    <h1>TESTER FILE</h1>
    <h1>TESTER FILE: used to test out firebase</h1>
    <h1>THIS FILE IS ONLY AVAILABLE TO THOSE THAT HAVE SIGN IN</h1>
    <button @click="signOutPress" if="isLoggedIn">Sign out</button> 
    </v-container>
    </v-app>
</template>

<script>
import { onMounted, ref } from "vue";
import { signOut, getAuth, onAuthStateChanged } from '@firebase/auth';
// import NavBarLogin from "../components/NavBarLogin.vue";
import NavBarLogin from "../components/NavBarLogin.vue"; //import router

let isLoggedIn = ref(false);

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = user
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    });
});

export default {
    name: 'TesterFile',
    methods: {
        signOutPress(isLoggedIn) {
            signOut(auth).then(
                console.log(isLoggedIn),
                isLoggedIn.value = false,
                this.$router.push("/")
            )
        }
    },
    components: { NavBarLogin }
}
</script>

<style lang="">
    
</style>

