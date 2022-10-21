<template>
    <v-app>
        <v-container>
            <NavBar/>
        </v-container>

        <v-container> 
            <!-- <v-img id="nav-logo-sign-up" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img> -->
            <v-card width="500" class="mx-auto mt-16 rounded-card1" elevation='5' height="520">
                <v-container>
                    <v-row>
                        <v-col>
                            <div id="welcome-title2">Welcome to <span id="charge-text">EVCharge</span><br/></div>
                            <div id="signup-title2">Sign In</div>
                        </v-col>
                    </v-row>
                </v-container>
                <br>
                <br>
                <br>
                <v-card-text id="margin-tune">
                    <v-card-text id="field-header-log">Enter your email address</v-card-text>
                    <v-text-field type="text" label="Your Email" v-model="email"/>
                    <v-card-text id="field-header-log">Enter your password</v-card-text>
                    <v-text-field label="Password" type="password" v-model="password"/>
                </v-card-text>

                <v-container id="margin-tune">
                    <v-row>
                    
                        <v-card-text id="no-account">Don't have an account?</v-card-text>
                        <router-link :to="{ path: '../signup' }">
                            <button type="button" id="click-signup">Sign Up</button>
                        </router-link>
                        <router-link :to="{ path: '../forgetpw' }">
                            <button type="button" id="click-forgot">Forgot Password</button>
                        </router-link>
                    </v-row>
                </v-container>

                <v-col class="text-center">
                    <v-btn id="sign-in-btn-style" @click="register(email,password)">                  
                    <span>Sign In</span>                  
                    </v-btn>
                </v-col>
                <v-col class="text-center pa-2 ma-0">
                    <div id="or-word">OR</div>
                </v-col>
                <v-col class="text-center">
                    <v-btn id="sign-in-google-btn-style" @click="signInWithGoogle(email,password)">                  
                    <span class="">Sign In with Google</span>                  
                </v-btn>
                </v-col>
            </v-card>
        </v-container>


    </v-app>
</template>


<script>
import NavBar from "../components/NavBar.vue"; //import router
import { mdiMicrophone } from '@mdi/js'

export default {
    data() {
        return {
            icons: {
                mdiMicrophone
            }
        }
    },
    components: { NavBar }
}


</script>

<style>
.rounded-card1{
    border-radius:30px;
}

#welcome-title2 {
  font-family: 'Outfit', sans-serif;
  font-weight: bolder;
  font-size: 20px;
  position: absolute;
  line-height: 60px;
  top: 0px;
  left: 25px;
}
#signup-title2 {
  font-family: 'Outfit', sans-serif;
  font-weight: bolder;
  font-size: 40px;
  position: absolute;
  line-height: 60px;
  top: 38px;
  left: 25px;
}

#field-header-log {
    line-height: 0px;
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
  margin-top:0px;
  margin-bottom:0px;
  position: absolute;
}

#or-word {
    font-weight: lighter;
    font-size: 15px;
    margin-top:25px;
    margin-bottom:0px;
}

#sign-in-google-btn-style{
  background-color: #6fa6ff;
  color: #FFFFFF;
  font-family: 'nunito';
  font-weight: bold;
  font-size: 15px;
  border-radius: 5px;
  text-transform: none;
  width: 50%;
  margin-top:0px;
  margin-bottom:0px;
  position: absolute;
  right: 120px;
  top:450px;
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

#margin-tune {
    margin: 0;
    padding-top: 0px;
    padding-bottom: 0px;
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

#click-signup{
    font-family: 'Outfit';
    font-weight: bolder;
    position: absolute;
    left: 20px;
    top: 335px;
    font-size: 14px;
    color:#4285f4;
    text-decoration: underline;
}

#click-forgot{
    font-family: 'Outfit';
    font-weight: bolder;
    position: absolute;
    left: 360px;
    top: 315px;
    font-size: 14px;
    color:#4285f4;
    text-decoration: underline;
}

</style>