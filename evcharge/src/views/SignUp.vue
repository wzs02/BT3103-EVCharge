<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-app>
      <v-container>
          <NavBar />
      </v-container>

      <v-container class="bg-container-sign-up">
          <!-- <v-img id="nav-logo-sign-up" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img> -->
          <!-- <img v-bind:src="bg_img" id="bg-ratio"> -->
        <img v-bind:src="bg_img2" id="bg-ratio-signup">
        <v-col id="first-col">
        <v-card width="500" class="mx-auto mt-16 rounded-card" elevation='5' height="700" id="details">
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
            <span v-if="v$.email.$error" id="email-error"> {{ "Please enter a valid email." }} </span>

            <v-card-text id="field-header">Your electic vehicle's license plate number</v-card-text>
            <v-text-field type="text" label="License plate number" v-model="vehno" clearable color='#0D47A1' id='vehno'/>
            <span v-if="v$.vehno.$error" id="vehicle-number"> {{ "Please enter your vehicle number." }} </span>

            <v-card-text id="field-header">Enter your password</v-card-text>
            <v-text-field type="password" label="Password" clearable v-model="password.password" color='#0D47A1' id='password'/>
            <span v-if="v$.password.password.$error" id="password-length"> {{ "Your password must be more than 6 characters long" }} </span>

            <v-card-text id="field-header">Re-enter your password</v-card-text>
            <v-text-field label="Confirm Password" clearable v-model="password.confirm" color='#0D47A1' type="password"/>
            <span v-if="v$.password.confirm.$error" id='password-match'> {{ "Passwords do not match" }}</span>

            <v-card-text id="field-header">Your contact number</v-card-text>
            <v-text-field label="Contact Number" type="text" v-model="contact" clearable color='#0D47A1'/>
            <span v-if="v$.contact.$error" id='contact-no'> {{ "Please enter your phone number." }}</span>

          </v-card-text>

        </v-card>
      </v-col>
<!-- 2nd COL HERE -->
      <v-col id="second-col">
        <v-card width="500" class="mx-auto mt-16 rounded-card" elevation='5' height="700" id="details">
                <v-container>
                    <v-row>
                        <v-col>
                            <div id="details1">Before we begin, tell us more about your Electric Vehicle!<br/></div>
                            <div id="details2">This information would be used to help us give you a more personalised experience.</div>
                        </v-col>
                    </v-row>
                </v-container>
                <br>
                <br>
                
                <v-card-text id="margin-tune1">
                    <v-card-text id="field-header-details">Your electric vehicle's brand</v-card-text>
                    <v-text-field type="text" label="Brand (eg. Tesla, MG)" v-model="brand" clearable color='#0D47A1'/>
                    <span v-if="v$.brand.$error" id='brand'> {{ "Please enter your vehicle's brand." }}</span>

                    <v-card-text id="field-header-details">Your electric vehicle's model</v-card-text>
                    <v-text-field label="Model (eg. Model 3, ZS)" type="text" v-model="model" clearable color='#0D47A1'/>
                    <span v-if="v$.model.$error" id='model'> {{ "Please enter your vehicle's model." }}</span>

                    <v-card-text id="field-header-details">How should we address you?</v-card-text>
                    <v-text-field label="Your username" type="text" v-model="username" clearable color='#0D47A1'/>
                    <span v-if="v$.model.$error" id='username'> {{ "Please enter your name." }}</span>

                </v-card-text>

                <v-col class="text-center">
                  <v-btn class="sign-up-btn-style" @click="
                  register(email, password.password); 
                  createUseronFirebase(email, vehno, contact, brand, model, username);
                  ">                  
                    <span>Sign Up</span>                 
                  </v-btn>
                </v-col>
                <v-col class="text-center">
                  <div id="or-word-signup">OR</div>
                </v-col>
              <v-col class="text-center">
                  <v-btn class="sign-google-btn-style" @click="
                    signInWithGoogle();
                    // createUseronFirebase(email, vehno, contact, brand, model, username);
                    ">                  
                    <span class="">Sign up with Google</span>                  
                  </v-btn>
                </v-col>
                
            </v-card>
      </v-col>

    </v-container>
  </v-app>
</template>

<script>
import { doc, setDoc, getFirestore } from "firebase/firestore"
import app from "../firebase.js"
import useValidate from '@vuelidate/core'
import { minLength, required, sameAs, email } from '@vuelidate/validators'
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
import { getAuth, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged
} from "firebase/auth"
const errMsg = ref() //ERROR message
const db = getFirestore(app);

export default {
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('ON AUTH STATE CHANGED')
        
        this.user = user
        this.uid = user.uid;
        console.log(this.uid)
      }
    })
  },
    data() {
        return {
            bg_img: require('../assets/SignInPage/GirlCharging.png'),
            bg_img2: require('../assets/AboutPage/Sign_Up.png'),
            v$: useValidate(),
            email: "",
            vehno: "",
            contact: "",
            brand: "",
            model: "",
            username: "",
            password: {
              password: "",
              confirm: "",
            },
            errMsg: "",
            uid: "",
            user: "",
        }
    },
    methods: {
        async createUseronFirebase(email, vehno, contact, brand, model, username) {
          console.log("CREATING USER ON FIREBASE")
          console.log(this.uid)
          this.uid = this.user.uid
          console.log(this.uid)
          this.email = this.user.email
          this.v$.$validate()
            if (!this.v$.$error) {
            await setDoc(doc(db, "USERS", this.uid), {
            user_email : email,
            user_vehno : vehno,
            user_contact : contact,
            user_brand : brand,
            user_model : model,
            user_name : username,
            user_uid : this.uid
          })
        }
        },
        register(email, password) {
            this.v$.$validate()
            if (!this.v$.$error) {
            console.log("REGISTERING")
            console.log(this.uid)
          //   setDoc(doc(db, "USERS", this.uid), {
          //   user_email : email,
          //   user_vehno : this.vehno,
          //   user_contact : this.contact,
          //   user_brand : this.brand,
          //   user_model : this.model,
          //   user_name : this.username,
          //   user_uid : this.uid
          // })
              const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCurrent) => {
                    alert("Sign Up Successful")
                    const user = userCurrent.user;
                    console.log("Sign Up Successful")
                    console.log(user)
                    console.log(auth.currentUser),
                    this.$router.push('/')})
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
            // this.email = "Not_Requried@gmail.com"
            this.password.password = "Not Required"
            this.password.confirm = "Not Required"
            this.v$.$validate()
            if (!this.v$.$error) {
              signInWithPopup(getAuth(), provider)
                  .then((result) => {
                      // The signed-in user info
                      const user = result.user;
                      this.user = user
                      this.email = user.email
                      this.uid = user.uid
                      // console.log(this.email)
                      // console.log(this.uid)
                      // console.log(this.vehno)
                      // console.log(this.contact)
                      // console.log(this.brand)
                      // console.log(this.model)
                      // console.log(this.username)

                      setDoc(doc(db, "USERS", this.uid), {
                      user_email : this.email,
                      user_vehno : this.vehno,
                      user_contact : this.contact,
                      user_brand : this.brand,
                      user_model : this.model,
                      user_name : this.username,
                      user_uid : this.uid
                      })
                      this.$router.push('/')
                  })
                  // .then( function() {
                  //   this.createUseronFirebase(this.email, this.vehno, this.contact, this.brand, this.model);
                  // })
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
              else{
                signInWithPopup(getAuth(), provider)
                    .then((result) => {
                        // The signed-in user info
                        const user = result.user;
                        this.user = user
                        this.email = user.email
                        // this.uid = user.uid
                        })
                this.email = this.user.email
                alert("Please address the Google pop-up before filling up necessary fields.")
                }
        }
    },
    validations() {
      return {
        email: { required, email },
        vehno: { required },
        contact: { required },
        brand: { required },
        model: { required }, 
        username: { required },
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

#margin-tune1 {
    margin: 0;
    padding-top: 120px;
    padding-bottom: 0px;
}

#field-header-details {
    line-height: 0px;
}

#details1 {
  font-family: 'Outfit', sans-serif;
  font-size: 35px;
  position: absolute;
  line-height: 40px;
  top: 0px;
  text-align: center;
  font-weight: 900;
  color: black;
  margin-top:30px
}

#details2 {
  font-family: 'Outfit', sans-serif;
  font-weight: bolder;
  font-size: 17px;
  position: absolute;
  line-height: 20px;
  top: 100px;
  text-align: center;
  font-weight: 300;
  color: rgb(12, 120, 214);
  margin-top:30px
}

#first-col {
  position: absolute;
  right: 350px
}

#second-col {
  /* position: absolute; */
  margin-left: 350px;
}

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
  margin-top: 0px;
  margin-bottom:0px;
  padding-top: 0px;
  padding-bottom: 0px;
  text-decoration: none;
}

#or-word-signup {
    font-weight: lighter;
    font-size: 15px;
    margin-top: 0px;
    margin-bottom:0px;
}

.sign-google-btn-style{
  text-transform: none;
  background-color: #6fa6ff;
  color: #FFFFFF;
  font-family: 'Outfit';
  font-weight: 900;
  border-radius: 5px;
  width: 50%;
  margin-top: 0px;
  margin-bottom: 0px;
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

#contact-no{
  font-size: 12px;
  color: red;
  position: absolute;
  line-height: 0px;
  top: 640px;
  left: 30px;
}

#brand{
  font-size: 12px;
  color: red;
  position: absolute;
  line-height: 0px;
  top: 300px;
  left: 30px;
}

#model{
  font-size: 12px;
  color: red;
  position: absolute;
  line-height: 0px;
  top: 410px;
  left: 30px;
}

#username{
  font-size: 12px;
  color: red;
  position: absolute;
  line-height: 0px;
  top: 520px;
  left: 30px;
}
    
</style>