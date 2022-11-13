<template>
    <v-app>
        <NavBarLogin />
        <v-container class="bg-container-ev-info">
            <img v-bind:src="bg_img" id="bg-ratio-ev-info">
        </v-container>

        <div id="div-pos">
            <h1 id="info-title">Tell us more about You and your Electric Vehicle!</h1>
            <p id="page-intro">This information will be used to help us give you a more personalised experience
            </p>
            <div id="form-div">
                <div id="form-contents">
                    <v-form v-model="form" @submit.prevent="onSubmit">
                        <v-text-field v-model="owner_name" :rules="requiredRule" variant="underlined"
                            label="Enter your name" color="#4285f4">
                        </v-text-field>
                        <v-text-field v-model="vehicle_brand" :rules="requiredRule" variant="underlined"
                            label="Enter your vehicle's brand" placeholder="Tesla, MG" color="#4285f4">
                        </v-text-field>
                        <v-text-field v-model="vehicle_model" :rules="requiredRule" variant="underlined"
                            label="Enter your vehicle's model" placeholder="Model 3, ZS" color="#4285f4">
                        </v-text-field>
                        <div style="height: 20px"></div>
                        <v-btn block size="large" type="submit" variant="elevated" id="btn-sign-in">
                            Continue
                        </v-btn>
                    </v-form>
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
/*eslint-disable */
import NavBarLogin from '@/components/NavBarLogin.vue'
import {
    getAuth, onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore"
import app from "../firebase.js"

const db = getFirestore(app);

export default {
    name: "EVInfoPage",
    components: { NavBarLogin },
    data() {
        return {
            bg_img: require('../assets/EVInfoPage/EVInfoBG.png'),
            form: false,
            user: "",
            uid: "",
            vehicle_brand: "",
            vehicle_model: "",
            owner_name: "",
            requiredRule: [
                v => !!v || "Field is required"
            ],
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
                const docRef = doc(db, "USERS", this.uid)
                const data = {
                    user_name: this.owner_name,
                    user_brand: this.vehicle_brand,
                    user_model: this.vehicle_model
                }

                setDoc(docRef, data, { merge: true }).then(() => {
                    window.confirm("Document has been added successfully");
                    this.$router.push('/account-balance')
                }).catch(error => {
                    window.confirm(error);
                })
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@400;700&display=swap');

.bg-container-ev-info {
    max-width: 100%;
    height: 900px;
    margin-top: 0px;
    margin-bottom: 0px;
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
}

#bg-ratio-ev-info {
    position: fixed;
    height: 885px;
    padding-bottom: 0px;
    top: 0;
    right: 0;
    min-width: 50%;
    min-height: 100%;
}

#div-pos {
    position: relative;
    position: absolute;
    top: 50%;
    left: 10%;
    margin-top: -300px;
    margin-left: -25px;
    display: inline-block;
}

#info-title {
    font-family: 'Outfit', 'sans-serif';
    width: 500px;
    text-align: center;
    font-size: 40px;
    line-height: 50px;
    margin-bottom: 10px;
}

#page-intro {
    font-family: 'Outfit', 'sans-serif';
    color: #4285f4;
    width: 400px;
    text-align: center;
    font-size: 18px;
    font-weight: 400px;
    line-height: 22px;
    margin-left: 40px;
    margin-bottom: 30px;
}

#form-div {
    width: 400px;
    justify-content: space-between;
    margin-left: 40px;
    margin: 0 auto;
    width: 80%;
}

#form-contents {
    width: 450px;
}

#btn-sign-in {
    font-family: 'Outfit', 'sans-serif';
    color: white;
    background-color: #4285f4;
    font-weight: 700;
    text-transform: none;
    margin-bottom: 15px;
}
</style>