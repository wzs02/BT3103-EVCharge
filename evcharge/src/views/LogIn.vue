<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-app>
        <NavBar />
        <v-container class="bg-container-login">
            <img v-bind:src="bg_img2" id="bg-ratio-login">
        </v-container>

        <div>
            <div id="logo-div">
                <v-img id="circle-logo" src="../assets/SignUpPage/RoundedLogo.png">
                </v-img>
            </div>
            <div id="card-pos">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-card width="500" class="mx-auto mt-16 rounded-card1" elevation='5' height="520">
                                <v-row style="margin-bottom: 20px;">
                                    <v-col>
                                        <div id="welcome-title">Welcome to <span id="charge-text">EVCharge</span><br />
                                        </div>
                                        <div id="signup-title">Log In</div>
                                    </v-col>
                                </v-row>
                                <div style="height: 80px;"></div>
                                <div id="card-spacing">
                                    <v-form v-model="form" @submit.prevent="onSubmit">
                                        <v-text-field v-model="email" :rules="emailValidFormat.concat(requiredRule)"
                                            variant="underlined" label="Enter your email address" color="#4285f4">
                                        </v-text-field>
                                        <v-text-field v-model="password"
                                            :append-icon="showpw1 ? 'mdi-eye' : 'mdi-eye-off'" variant="underlined"
                                            label="Enter your password" color="#4285f4"
                                            :rules="requiredRule.concat(passwordLengthRule)"
                                            :type="showpw1 ? 'text' : 'password'" @click:append="showpw1 = !showpw1">
                                        </v-text-field>
                                        <v-row id="options-section">
                                            <v-col>
                                                <v-row>
                                                    <span id="no-account-text">Don't have an account?</span>
                                                </v-row>
                                                <v-row style="margin-top: 5px;">
                                                    <router-link :to="{ path: '../signup' }" id="sign-up-link">Sign Up
                                                    </router-link>
                                                </v-row>
                                            </v-col>
                                            <v-col>
                                                <router-link :to="{ path: '../forgetpw' }" id="forgot-pw-link">Forgot
                                                    Password
                                                </router-link>
                                            </v-col>
                                        </v-row>
                                        <v-btn block size="large" type="submit" variant="elevated" id="btn-sign-in">
                                            Log In
                                        </v-btn>
                                    </v-form>
                                </div>
                                <v-col>
                                    <h6 id="or">OR</h6>
                                </v-col>
                                <v-row class="center-content">
                                    <v-btn id="sign-in-google-btn-style" @click="signInWithGoogle(email, password)">
                                        <span class="">Log In with Google</span>
                                    </v-btn>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>
    </v-app>
</template>


<script>
import NavBar from "../components/NavBar.vue"; //import router
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";

export default {
    data() {
        return {
            bg_img2: require('../assets/SignInPage/SignInBG.png'),
            email: "",
            password: "",
            form: false,
            showpw1: false,
            emailValidFormat: [
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            requiredRule: [
                v => !!v || "Field is required"
            ],
            passwordLengthRule: [
                v => (v && v.length >= 6) || "Password must be at least 6 characters long"
            ]
        }
    },
    components: { NavBar },
    methods: {
        onSubmit() {
            if (!this.form) {
                console.log("Login details invalid")
            }
            else {
                this.signIn(this.email, this.password)
            }
        },
        signIn(email, password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                    this.$router.push("/map")
                })
                .catch((error) => {
                    console.log(error.code);
                    alert("Email and password is invalid");
                });
        },
        signInWithGoogle() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    console.log(token)
                    // The signed-in user info.
                    const user = result.user;
                    console.log(user)
                    this.$router.push("/map");
                })
                .catch((error) => {
                    console.log(error.message)
                    switch (error.code) {
                        case "auth/account-exists-with-different-credential":
                            alert("This email has been binded to an account.");
                            break;
                        case "auth/popup-blocked":
                            alert("Please enable your browser pop up");
                            break;
                    }
                })
        }
    }
}


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@400;700&display=swap');

.bg-container-login {
    max-width: 100%;
    height: 900px;
    margin-top: 0px;
    margin-bottom: 0px;
    background-image: linear-gradient(to bottom left, rgb(68, 161, 248), white);
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
}

#bg-ratio-login {
    position: fixed;
    height: 885px;
    padding-bottom: 0px;
    top: 0;
    right: 0;
    min-width: 50%;
    min-height: 100%;
    z-index: 10000;
}

#logo-div {
    position: relative;
    height: 100vh;
    width: 30%;
    display: inline-block;
}

#circle-logo {
    height: 300px;
    width: 300px;
    position: absolute;
    top: 50%;
    left: 40%;
    margin-top: -200px;
    margin-left: -25px;
}

#card-pos {
    position: relative;
    position: absolute;
    top: 50%;
    left: 35%;
    margin-top: -350px;
    margin-left: -25px;
    display: inline-block;
}

#card-spacing {
    margin-left: 40px;
    margin-right: 40px
}

#btn-sign-in {
    font-family: 'Outfit', 'sans-serif';
    color: white;
    background-color: #4285f4;
    font-weight: 700;
    text-transform: none;
    margin-bottom: 15px;
}

#options-section {
    margin-top: 5px;
    margin-left: 3px;
    margin-bottom: 5px;
}

#nav-logo-login {
    margin-top: -80px;
    width: 340px;
    top: 450px;
    left: 60px;
}

.rounded-card1 {
    border-radius: 30px;
}

#welcome-title {
    font-family: 'Outfit', sans-serif;
    font-weight: bolder;
    font-size: 20px;
    position: absolute;
    line-height: 60px;
    top: 0px;
    left: 25px;
    margin-left: 10px;
}

#signup-title {
    font-family: 'Outfit', sans-serif;
    font-weight: bolder;
    font-size: 40px;
    position: absolute;
    line-height: 60px;
    top: 38px;
    left: 25px;
    margin-left: 10px;
}

#sign-in-btn-style {
    background-color: #4285f4;
    color: #FFFFFF;
    font-family: 'nunito';
    font-weight: bold;
    font-size: 15px;
    border-radius: 5px;
    text-transform: none;
    right: 70px;
    width: 70%;
    margin-top: 0px;
    margin-bottom: 0px;
    position: absolute;
}

#or {
    font-family: 'Outfit', 'sans-serif';
    color: #ababab;
    font-weight: 200px;
    text-align: center;
    font-size: 15px;
    margin-bottom: 20px;
}

#sign-in-google-btn-style {
    text-transform: none;
    background-color: #6fa6ff;
    color: #FFFFFF;
    font-family: 'Outfit';
    font-weight: 900;
    width: 50%;
    margin-top: 0px;
    margin-bottom: 0px;
    justify-content: center;
}

#charge-text {
    font-family: 'Outfit';
    font-weight: 700;
    font-size: 20px;
    background: linear-gradient(180deg, #00E0FF 0%, #0028FB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

#no-account-text {
    font-family: 'Outfit', 'sans-serif';
    color: #8d8d8d;
    font-weight: 400px;
}

#sign-up-link {
    font-family: 'Outfit', 'sans-serif';
    color: #4285f4;
    font-weight: 400px;
    text-decoration: underline;
}

#forgot-pw-link {
    float: right;
    font-family: 'Outfit', 'sans-serif';
    color: #4285f4;
    font-weight: 400px;
    text-decoration: underline;
}

a {
    text-decoration: none;
    color: inherit;
}

.center-content {
    display: flex; 
    justify-content:center;
}
</style>