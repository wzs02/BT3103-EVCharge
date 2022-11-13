<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet"> 
    <v-app> 
        <NavBar />
        <v-container class="bg-container-sign-up">
            <img v-bind:src="bg_img2" id="bg-ratio-signup">
        </v-container>

        <div>
            <div id="logo-div">
                <v-img id="circle-logo" src="../assets/SignUpPage/RoundedLogo.png">
                </v-img>
            </div>
            <div id = "card-pos">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-card width="500" class="mx-auto mt-16 rounded-card" elevation='5' height="580"
                                id="details">
                                <v-row style="margin-bottom: 50px">
                                    <v-col>
                                        <div id="welcome-title">Welcome to <span id="charge-text">EVCharge</span><br />
                                        </div>
                                        <div id="signup-title">Sign Up</div>
                                    </v-col>

                                    <v-col>
                                        <span id="have-account">Have an account?</span>
                                        <router-link :to="{ path: '../login' }">
                                            <button type="button" id="click-signIN">Log In</button>
                                        </router-link>
                                    </v-col>
                                </v-row>
                                <div id="card-spacing">
                                    <v-form v-model="form" @submit.prevent="onSubmit">
                                        <v-text-field v-model="email" :rules="emailValidFormat.concat(requiredRule)"
                                            variant="underlined" label="Enter your email address" color="#4285f4">
                                        </v-text-field>

                                        <v-text-field v-model="licensePlateNumber" color="#4285f4" :rules="requiredRule"
                                            variant="underlined"
                                            label="Enter your electric vehicle's license plate number">
                                        </v-text-field>

                                        <v-text-field v-model="password"
                                            :append-icon="showpw1 ? 'mdi-eye' : 'mdi-eye-off'" variant="underlined"
                                            label="Enter your password" color="#4285f4"
                                            :rules="requiredRule.concat(passwordLengthRule)"
                                            :type="showpw1 ? 'text' : 'password'" @click:append="showpw1 = !showpw1">
                                        </v-text-field>

                                        <v-text-field v-model="secondPassword"
                                            :append-icon="showpw2 ? 'mdi-eye' : 'mdi-eye-off'" color="#4285f4"
                                            variant="underlined" label="Re-enter your password"
                                            :rules="requiredRule.concat(passwordsMatchRule.concat(validateSecondPassword))"
                                            :type="showpw2 ? 'text' : 'password'" @click:append="showpw2 = !showpw2">
                                        </v-text-field>

                                        <v-btn block size="large" type="submit" variant="elevated" id="btn-sign-up">
                                            Sign Up
                                        </v-btn>
                                    </v-form>
                                </div>
                                <h6 id="or">OR</h6>
                                <v-row class="center-content">
                                    <v-btn class="sign-google-btn-style" @click="
                                    signInWithGoogle()">
                                        <span>Sign up with Google</span>
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
/*eslint-disable*/
import NavBar from "@/components/NavBar.vue";
import {
    getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
    onAuthStateChanged
} from "firebase/auth";
import { ref } from "vue";
import { doc, setDoc, getFirestore } from "firebase/firestore"
import app from "../firebase.js"

const db = getFirestore(app);
const errMsg = ref();

export default {
    name: "MSignUp",
    components: { NavBar },
    data() {
        return {
            bg_img2: require('../assets/SignUpPage/Sign_Up.png'),
            form: false,
            email: null,
            password: null,
            licensePlateNumber: null,
            secondPassword: null,
            showpw1: false,
            showpw2: false,
            uid: "",
            user: "",
            errMsg: "",
            emailValidFormat: [
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            requiredRule: [
                v => !!v || "Field is required"
            ],
            passwordLengthRule: [
                v => (v && v.length >= 6) || "Password must be at least 6 characters long"
            ],
            passwordsMatchRule: [
                v => (v && v.length >= 6) || "Password must be at least 6 characters long",
                v => !!v || "Passwords do not match"
            ]
        }
    },
    created() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user
                this.uid = user.uid;
            }
        })
    },
    methods: {
        onSubmit() {
            if (!this.form) {
                window.confirm("Login details invalid")
            }
            else {
                this.register(this.email, this.password)
            }
        },
        validateSecondPassword(value) {
            return value == this.password || "Passwords do not match"
        },
        register(email, password) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password).then((result) => {
                const docRef = doc(db, "USERS", result.user.uid)
                const data = {
                    user_email: email,
                    user_uid: result.user.uid
                }
                setDoc(docRef, data).then(() => {
                    window.confirm("Document has been added successfully");
                    this.$router.push('/')
                }).catch(error => {
                    window.confirm(error);
                })
            }).catch((error) => console.log(error))
        },
        signInWithGoogle() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider).then((result) => {
                const docRef = doc(db, "USERS", result.user.uid)
                const data = {
                    user_email: result.user.email,
                    user_uid: result.user.uid
                }
                setDoc(docRef, data).then(() => {
                    window.confirm("Document has been added successfully");
                    this.$router.push('/')
                }).catch(error => {
                    window.confirm(error);
                })
            }).catch((error) => {
                console.log(error.message)
                switch (error.code) {
                    case "auth/account-exists-with-different-credential":
                        errMsg.value = "This email has been binded to an account.";
                        break;
                    case "auth/popup-blocked":
                        errMsg.value = "Please enable your browser pop up."
                        break;
                }
                alert(errMsg.value);
            })
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@400;700&display=swap');

#circle-logo {
    height: 300px;
    width: 300px; 
    position:absolute;
    top:50%;
    left:40%;
    margin-top:-200px;
    margin-left:-25px;
}

#logo-div {
    position: relative;
    height: 100vh;
    width: 30%;
    display:inline-block;
}

#card-pos {
    position: relative; 
    position:absolute;
    top:50%;
    left:35%;
    margin-top:-350px;
    margin-left:-25px;
    display:inline-block;
}

#details {
    border-radius: 30px;
}
.bg-container-sign-up {
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

#bg-ratio-signup {
    position: fixed;
    height: 885px;
    padding-bottom: 0px;
    top: 0;
    right: 0;
    min-width: 50%;
    min-height: 100%;
}

#card-spacing {
    margin-left: 40px; 
    margin-right: 40px
}

#welcome-title {
    font-family: 'Outfit', sans-serif;
    font-weight: bolder;
    font-size: 20px;
    position: absolute;
    line-height: 60px;
    top: 10px;
    left: 25px;
    margin-left: 10px;
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

#signup-title {
    font-family: 'Outfit', sans-serif;
    font-weight: bolder;
    font-size: 40px;
    position: absolute;
    line-height: 60px;
    top:45px;
    left: 25px;
    margin-left: 10px;
}

#click-signIN {
    font-family: 'Outfit';
    font-weight: bolder;
    position: absolute;
    left: 340px;
    top: 50px;
    font-size: 14px;
    color: #4285f4;
    text-decoration: underline;
}

#have-account {
    font-family: 'Outfit', 'sans-serif';
    float:right;
    margin-top: 30px;
    margin-right: 35px;
    color: #8d8d8d;
}

#btn-sign-up {
    font-family: 'Outfit', 'sans-serif';
    color: white;
    background-color: #4285f4;
    font-weight: 700;
    text-transform: none;
    margin-bottom: 15px;
}

v-text-field {
    margin-bottom: 10px;
}

#or {
    font-family: 'Outfit', 'sans-serif';
    color: #ababab;
    font-weight: 200px;
    text-align: center;
    font-size: 15px;
    margin-top: 25px;
    margin-bottom: 30px;
}

.sign-google-btn-style {
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

.center-content {
    display: flex; 
    justify-content:center;
}
</style>