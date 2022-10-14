<template>
    <NavBar />

    <h1>Log In</h1>
    <p><input type="email" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="register(email,password)">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign in with Google</button></p>
</template>


<script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'vue-router'
import NavBar from "../components/NavBar.vue"; //import router
// var email = ref("")
// var password = ref("")
const router = useRouter()
const errMsg = ref() //ERROR message

export default {
    data() {
        return {
            email: "",
            password: "",
            errMsg: "",
        }
    },
    methods: {
        register(email, password) {
            console.log("Input fields")
            console.log(email)
            console.log(password)
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then(
                    console.log("Successfully sign in!"),
                    console.log(auth.currentUser),
                    router.push({ path: '/TesterFile' }))
                .catch((error) => {
                    console.log(error.code);
                    switch (error.code) {
                        case "auth/invalid-email":
                            errMsg.value = "Invalid email";
                            break;
                        case "auth/user-not-found":
                            errMsg.value = "User NOT found";
                            break;
                        default:
                            errMsg.value = "Email or password is incorrect";
                            break;
                    }
                    alert(error.message);
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