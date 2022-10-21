<template>
    <v-app>
        <v-container>
            <NavBar/>
        </v-container>
        
        <v-container> 
            <v-card width="500" class="mx-auto mt-16 rounded-card1" elevation='5' height="520">
                <v-container>
                    <v-img id="nav-logo-sign-up" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img>
                    <v-row>
                        <v-col>
                            <div id="message">Enter the email address associated with your account and we will send you a link to reset your password.</div>
                        </v-col>
                    </v-row>
                </v-container>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <v-container>
                <v-card-text id="margin-tune">
                    <v-card-text id="field-header-log">Enter your email address</v-card-text>
                    <v-text-field type="text" label="Your Email" v-model="email"/>
                </v-card-text>
                </v-container>

                <v-col class="text-center">
                    <v-btn id="sign-in-btn-style" @click="register(email,password)">                  
                    <span>Continue</span>                  
                    </v-btn>
                </v-col>
            </v-card>
        </v-container>


    </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue"; //import router

export default {
    data() {
        return {
            bg_img2: require('../assets/AboutPage/Sign_Up.png'),
        }
    },
    components: { NavBar }
}
</script>


<style>

#nav-logo-sign-up {
    margin-top: 0px;
    width: 340px;
    top: 40px;
    left: 80px;
    position: absolute;
}

.rounded-card1{
    border-radius:30px;
}

#message {
    font-family: 'Outfit', sans-serif;
    font-weight: bolder;
    font-size: 15px;
    position: absolute;
    line-height:20px;
    top: 150px;
    /* left: 30px; */
    padding-left: 30px;
    padding-right: 30px;
    color:#4285f4;
    text-align: center;
}

#margin-tune {
    margin: 0;
    padding-top: 0px;
    padding-bottom: 0px;
}

#sign-in-btn-style {
  background-color: #4285f4;
  color: #FFFFFF;
  font-family: 'nunito';
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  text-transform: none;
  right: 70px;
  width: 70%;
  margin-top:0px;
  margin-bottom:0px;
  position: absolute;
}

</style>
