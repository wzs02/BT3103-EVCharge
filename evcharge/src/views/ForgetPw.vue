<template>
    <v-app>
        <NavBar />
        <div class="bg-container">
            <img v-bind:src="bg_img" id="bg-ratio">
        </div>
        <div id="card-pos">
            <v-container>
                <v-card width="500" id="rounded-card" elevation='5' height="500">
                    <img v-bind:src="logo_img" id="ev-logo">
                    <div style="height: 130px;"></div>

                    <v-container>
                        <span id="message">Enter the email address associated with your account and we will
                            send you
                            a link to reset your password.</span>
                        <v-form v-model="form" @submit.prevent="onSubmit">
                            <div id="card-space">
                                <v-text-field style="margin-bottom: 15px" v-model="email"
                                    :rules="emailValidFormat.concat(requiredRule)" variant="underlined"
                                    label="Enter your email address" color="#4285f4">
                                </v-text-field>
                                <v-btn block size="large" type="submit" variant="elevated" id="reset-pw-btn">
                                    Reset Password
                                </v-btn>
                            </div>
                        </v-form>
                        <div class="center-text">
                            <span style="text-align:center">
                                <span id="no-account-text">
                                    Don't have an account?
                                </span>
                                <span>
                                    <router-link :to="{ path: '../signup' }" id="sign-up-link">
                                        Sign up
                                    </router-link>
                                </span>
                            </span>
                        </div>
                    </v-container>
                </v-card>
            </v-container>
        </div>

    </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue"; //import router
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
    data() {
        return {
            bg_img: require('../assets/AccountBalancePage/Allura.png'),
            errMsg: "",
            logo_img: require('../assets/AboutPage/About_Navbar_Logo.png'),
            form: false,
            email: null,
            emailValidFormat: [
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            requiredRule: [
                v => !!v || "Field is required"
            ]
        }
    },
    components: { NavBar },
    methods: {
        onSubmit() {
            if (!this.form) {
                window.confirm("Details are invalid")
            }
            else {
                this.resetpw(this.email)
            }
        },
        resetpw(email) {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("An password reset email has been sent to your email.")
                    this.$router.push('/')
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/invalid-email":
                            alert("The email that you have entered is invalid.")
                            break;
                        default:
                            alert("User is not found.")
                            break;
                    }
                })
        }
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

#card-pos {
    position: relative;
    position: absolute;
    top: 50%;
    left: 35%;
    margin-top: -300px;
    margin-left: -25px;
    display: inline-block;
}

#ev-logo {
    margin-top: 0px;
    width: 340px;
    top: 40px;
    left: 80px;
    position: absolute;
}

#rounded-card {
    border-radius: 30px;
}

#message {
    font-family: 'Outfit', sans-serif;
    font-weight: bolder;
    font-size: 15px;
    line-height: 20px;
    color: #4285f4;
    text-align: center;
    margin-left: 40px;
    margin-right: 40px;
    display: inline-block;
    margin-bottom: 40px;
}

#card-space {
    margin-right: 40px;
    margin-left: 40px;
}

#reset-pw-btn {
    font-family: 'Outfit', 'sans-serif';
    color: white;
    background-color: #4285f4;
    font-weight: 700;
    text-transform: none;
    margin-bottom: 50px;
}

#no-account-text {
    font-family: 'Outfit', 'sans-serif';
    font-weight: 400px;
    color: #8d8d8d;
}

a {
    text-decoration: none;
    color: inherit;
}

#sign-up-link {
    font-family: 'Outfit', 'sans-serif';
    color: #4285f4;
    text-decoration: underline;
}

.center-text {
    display: flex;
    justify-content: center;
}
</style>
