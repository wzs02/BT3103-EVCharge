<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-app>
      <v-container>
          <NavBar/>
      </v-container>

      <v-container class="bg-container-sign-up">
          <v-img id="nav-logo-sign-up" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img>
          <!-- <img v-bind:src="bg_img" id="bg-ratio"> -->
          <img v-bind:src="bg_img2" id="bg-ratio-signup">

        <v-card width="500" class="mx-auto mt-16 rounded-card" elevation='5' height="750" id="details">
          <v-container>
          <v-row>
              <v-col>
                  <div id="welcome-title">Welcome to <span id="charge-text">EVCharge</span><br/></div>
                  <div id="signup-title">Sign Up</div>
              </v-col>
              
              <v-col offset="3">
                <v-card-text id="have-account">Have an account?</v-card-text>
                        <router-link :to="{ path: '../login' }">
                            <button type="button" id="click-signIN">Log In</button>
                        </router-link>
              </v-col>
          </v-row>
          </v-container>
          
          <v-card-text>
            <v-card-text id="field-header">Enter your email address</v-card-text>
            <!-- <v-text-field type="text" label="Your Email" v-model="email" prepend-icon=mdi-bell-outline clearable/> -->
            <v-text-field type="text" label="Your Email" v-model="email" clearable color='#0D47A1' id='email'/>
            <!--  v$.email.$errors[0].$message -->
            <span v-if="v$.email.$error" id="email-error"> {{ "Please enter a valid email." }} </span>


            <v-card-text id="field-header">Your electic vehicle's license plate number</v-card-text>
            <v-text-field type="text" label="License plate number" v-model="vehno" clearable color='#0D47A1' id='vehno'/>
            <span v-if="v$.password.password.$error" id="vehicle-number"> {{ "Please enter your vehicle number." }} </span>

            <v-card-text id="field-header">Enter your password</v-card-text>
            <v-text-field type="password" label="Password" clearable v-model="password.password" color='#0D47A1' id='password'/>
            <span v-if="v$.password.password.$error" id="password-length"> {{ "Your password must be more than 6 characters long" }} </span>

            <v-card-text id="field-header">Re-enter your password</v-card-text>
            <v-text-field label="Confirm Password" clearable v-model="password.confirm" color='#0D47A1' type="password"/>

          </v-card-text>

          <span v-if="v$.password.confirm.$error" id='password-match'> {{ "Passwords do not match" }}</span>

          <v-col class="text-center">
              <v-btn class="sign-up-btn-style" @click="
              register(email, password.password); 
              createUseronFirebase(email, vehno);">                  
                <span>Sign Up</span>                 
              </v-btn>
          </v-col>
          <v-col class="text-center pa-2 ma-0">
              OR
          </v-col>
          <v-col class="text-center">
              <v-btn class="sign-google-btn-style" @click="
                signInWithGoogle(email, password)">                  
                <span class="">Sign up with Google</span>                  
              </v-btn>
          </v-col>
        </v-card>
      </v-container>
  </v-app>
</template>

<script>
import { doc, setDoc, getFirestore } from "firebase/firestore"
import app from "../firebase.js"
import useValidate from '@vuelidate/core'
import { minLength, required, sameAs, email } from '@vuelidate/validators'
import NavBar from "../components/NavBar.vue"
import { ref } from "vue";
import { getAuth, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth"
const errMsg = ref() //ERROR message
const db = getFirestore(app);

export default {
    data() {
        return {
            bg_img: require('../assets/SignInPage/GirlCharging.png'),
            bg_img2: require('../assets/AboutPage/Sign_Up.png'),
            v$: useValidate(),
            email: "",
            vehno: "",
            password: {
              password: "",
              confirm: "",
            },
            errMsg: "",
            emailpass : "Data from Parent to Child"
        }
    },
    methods: {
        async createUseronFirebase(email, vehno) {
          console.log(email)
          console.log(vehno)
          await setDoc(doc(db, "USERS", email), {
            user_email : vehno
          })
        },
        register(email, password) {
            this.v$.$validate()
            if (!this.v$.$error) {
              const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCurrent) => {
                    alert("Sign Up Successful")
                    const user = userCurrent.user;
                    console.log(user)
                    console.log(auth.currentUser), 
                    this.$router.push('/userdetails')})
                .catch((error) => {
                    console.log(error.code);
                    switch (error.code) {
                        case "auth/invalid-email":
                            errMsg.value = "Invalid email";
                            break;
                        case "auth/user-not-found":
                            errMsg.value = "User NOT found";
                            break;
                        case "auth/email-already-in-use":
                            errMsg.value = "Email already in use";
                            break;
                        default:
                            errMsg.value = "Email or password is incorrect";
                            break;
                    }
                    alert(errMsg.value);
            });
            }
            
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
                    this.$router.push('/userdetails');
                })
                .catch((error) => {
                    console.log(error.message)
                    switch (error.code) {
                        case "auth/account-exists-with-different-credential":
                            errMsg.value = "This email has been binded to an account.";
                            break;
                        case "auth/popup-blocked":
                            errMsg.value = "Please enable your browser pop up.";
                            break;
                    }
                    alert(errMsg.value);
                })
        }
    },
    validations() {
      return {
        email: { required, email },
        vehno: { required },
        password: {
        password: { required, minLength: minLength(6) },
        confirm: { required, sameAs: sameAs(this.password.password) },
      },
      }
    },
    components: { NavBar }
}
</script>


<style>

#no-account{
    margin: 0;
    padding-top: 0px;
    padding-bottom: 40px;
    font-family: 'Nunito', sans-serif;
    font-weight: normal;
    /* position: absolute; */
    font-size: 14px;
}

#click-signIN{
    font-family: 'Outfit';
    font-weight: bolder;
    position: absolute;
    left: 340px;
    top: 50px;
    font-size: 14px;
    color:#4285f4;
    text-decoration: underline;
}

#bg-ratio-signup {
  position:fixed;
  height: 885px;
  padding-bottom: 0px;
  top: 0; right: 0;min-width: 50%; min-height: 100%;
}

#details {
  top: 0px;
}

.bg-container-sign-up{
    max-width: 100%;
    height: 900px;
    margin-top: 0px;
    margin-bottom: 0px;
    background-image: linear-gradient(to bottom left, rgb(68, 161, 248), white);
    position: fixed;top: 0;left: 0;min-width: 100%; min-height: 100%;
}

#field-header {
    line-height: 0px;
}
#nav-logo {
  width: 140px;
  margin-left: 150px;
}
/* #girl-sign-up {
    margin-top: -450px;
  width: 2000px;
  top: 450px;
  /* left: 400px; */
  /* margin-left: 200px; */
/* } */ */
.bgimage {
  background-image: src="../assets/AboutPage/Sign_Up.png";
  background-size: cover;
  background-position: center center;
}
#nav-logo-sign-up {
    margin-top: -80px;
  width: 340px;
  top: 450px;
  left: 60px;
}

.sign-up-btn-style {
  background-color: #4285f4;
  color: #FFFFFF;
  font-family: 'Outfit';
  font-weight: 900;
  border-radius: 5px;
  text-transform: none;
  width: 70%;
  margin-top:-50px;
  margin-bottom:-50px;
  text-decoration: none;
}

.sign-google-btn-style{
  text-transform: none;
  background-color: #6fa6ff;
  color: #FFFFFF;
  font-family: 'Outfit';
  font-weight: 900;
  border-radius: 5px;
  width: 50%;
  margin-top:-50px;
  margin-bottom:-50px;
}
.rounded-card{
    border-radius:30px;
}
.bg-container {
  position: relative;
  text-align: center;
}
#bg-ratio {
  width: 100%;
  height: 600px;
}
#welcome-title {
  font-family: 'Outfit', sans-serif;
  font-weight: bolder;
  font-size: 20px;
  position: absolute;
  line-height: 60px;
  top: 0px;
  left: 25px;
}
#signup-title {
  font-family: 'Outfit', sans-serif;
  font-weight: bolder;
  font-size: 40px;
  position: absolute;
  line-height: 60px;
  top: 38px;
  left: 25px;
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

#email-error{
  font-size: 12px;
  color: red;
  position: absolute;
  line-height: 0px;
  top: 200px;
  left: 30px;
}

#vehicle-number{
  font-size: 12px;
  color: red;
  position: absolute;
  line-height: 0px;
  top: 310px;
  left: 30px;
}

#password-length{
  font-size: 12px;
  color: red;
  position: absolute;
  line-height: 0px;
  top: 420px;
  left: 30px;
}

#password-match{
  font-size: 12px;
  color: red;
  position: absolute;
  line-height: 0px;
  top: 530px;
  left: 30px;
}

    
</style>