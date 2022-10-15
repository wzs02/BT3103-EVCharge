<template>
    <v-app>
        <NavBar/>
        <h1>Create an Account</h1>
        <p><input type="email" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p><button @click="register">Submit</button></p>
        <p><button @click="signInWithGoogle">Sign in with Google</button></p>
    </v-app>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
// import { useRouter } from 'vue-router'
import NavBar from "../components/NavBar.vue"; //import router
const email = ref("")
const password = ref("")
// const router = useRouter()

export default {
    methods: {
        register() {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then(console.log("Sign Up Successful"), console.log(auth.currentUser), this.$router.push('/'))
                .catch((error) => {
                alert(error.message);
                console.log(error.code);
            });
        }
    },
    components: { NavBar }
}



// const signInWithGoogle = () => {
//     //
// }
</script>

<style>

    
</style>