<template>
    <v-app>
        <v-container>
          <NavBarLogin/>
      </v-container>

      <v-container>
    <h1>TESTER FILE</h1>
    <h1>TESTER FILE: used to test out firebase</h1>
    <h1>THIS FILE IS ONLY AVAILABLE TO THOSE THAT HAVE SIGN IN</h1>
    <button @click="signOutPress">Sign out</button> 
    </v-container>
    </v-app>
</template>

<script>

import { signOut, getAuth  } from '@firebase/auth';
// import NavBarLogin from "../components/NavBarLogin.vue";
import NavBarLogin from "../components/NavBarLogin.vue"; //import router

const auth = getAuth();

export default {
    name: 'TesterFile',
    methods: {
        signOutPress() {
            signOut(auth).then(() => {
                alert("Successfully signed out.")
                this.$router.push('/')
            }).catch((error) => {
                alert(error.code)
            });
        }
    },
    components: { NavBarLogin }
}
</script>

<style lang="">
    
</style>

