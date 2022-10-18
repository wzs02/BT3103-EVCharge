<template>
    <v-app>
      <v-container>
          <NavBar/>
      </v-container>

      <v-container class="bg-container-sign-up">
          <v-img id="nav-logo-sign-up" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img>
          <!-- <v-img id="girl-sign-up" src="../assets/SignInPage/GirlCharging.png"></v-img> -->
          <v-content>
        <v-card width="500" class="mx-auto mt-16 rounded-card" elevation='5' height="750">
          <v-container>
          <v-row>
              <v-col>
                  <div id="welcome-title">Welcome to EVCharge<br/></div>
                  <div id="signup-title">Sign Up<br/></div>
              </v-col>
              
              <v-col offset="3">
                  <v-card-text>Have an account? <br /> Sign In</v-card-text>
              </v-col>
          </v-row>
          </v-container>
          
          <v-card-text>
          <v-card-text id="field-header">Enter your email address</v-card-text>
            <v-text-field type="text" label="Your Email" v-model="email"/>
            <v-card-text id="field-header">Your electic vehicle's license plate number</v-card-text>
            <v-text-field type="text" label="License plate number" v-model="plateNo"/>
            <v-card-text id="field-header">Enter your password</v-card-text>
            <v-text-field label="Password" type="password" v-model="password"/>
            <v-card-text id="field-header">Re-enter your password</v-card-text>
            <v-text-field label="Password" type="password"/>
          </v-card-text>
          <v-col class="text-center">
              <v-btn class="sign-up-btn-style" @click="register(email,password)">                  
                <span>Sign up</span>                  
              </v-btn>
          </v-col>
          <v-col class="text-center pa-2 ma-0">
              OR
          </v-col>
          <v-col class="text-center">
              <v-btn class="sign-google-btn-style">                  
                <span class="">Sign up with Google</span>                  
              </v-btn>
          </v-col>
        </v-card>
      </v-content>
      </v-container>
  </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import { ref } from "vue";
import { getAuth, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth"
// import { useRouter } from 'vue-router'
// import NavBar from "../components/NavBar.vue"; //import router
// const email = ref("")
// const password = ref("")
// const router = useRouter()
const errMsg = ref() //ERROR message

export default {
    data() {
        return {
            bg_img: require('../assets/AboutPage/About_Bg.png'),
            bg_car: require('../assets/AboutPage/About_Car.png'),
            email: "",
            password: "",
            errMsg: "",
        }
    },
    methods: {
        register(email, password) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCurrent) => {
                    const user = userCurrent.user;
                    console.log(user)
                    console.log("Sign Up Successful"),
                    console.log(auth.currentUser), 
                    this.$router.push('/TesterFile')})
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
        },
        signInWithGoogle() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
                .then((result) => {
                    console.log(result.user);
                    this.$router.push('/TesterFile');
                })
                .catch((error) => {
                    console.log(error.message)
                })
        }
    },
    components: { NavBar }
}
</script>


<style>
.bg-container-sign-up{
    max-width: 100%;
    height: 900px;
    margin-top: 0px;
    margin-bottom: 0px;
    background-image: linear-gradient(to right, rgb(129, 194, 254), white),
    url('../assets/AboutPage/About_Bg.png');
    background-position: left, right;
    background-repeat: no-repeat, no-repeat; 
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

.menu-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-op {
  padding: 5px;
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
}

.menu-op:hover {
  color: #4285f4;
}

.btn-style {
  background-color: #4285f4;
  color: #FFFFFF;
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  border-radius: 20px;
  text-transform: none;
}

.sign-up-btn-style {
  background-color: #4285f4;
  color: #FFFFFF;
  font-family: 'nunito';
  font-weight: bold;
  font-size: 15px;
  border-radius: 5px;
  text-transform: none;
  width: 70%;
  margin-top:-50px;
  margin-bottom:-50px;
}

.sign-google-btn-style{
  background-color: #6fa6ff;
  color: #FFFFFF;
  font-family: 'nunito';
  font-weight: bold;
  font-size: 15px;
  border-radius: 5px;
  text-transform: none;
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

#bg-desc {
  font-family: 'Nunito', sans-serif;
  font-weight: normal;
  font-size: 20px;
  position: absolute;
  top: 340px;
  left: 150px;
  text-align: start;
  line-height: 25px;

}

    
</style>