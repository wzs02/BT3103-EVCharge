<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-app>
        <v-container>
          <NavBarLogin/>
        </v-container>

        <v-container class="bg-container-details">

        <v-row>
        <v-col md="6">
            <v-card width="500" class="mx-auto mt-16" elevation='0' height="800">
                <v-container>
                    <v-row>
                        <v-col>
                            <div id="details1">Tell us more about You and your Electric Vehicle!<br/></div>
                            <div id="details2">This information would be used to help us give you a more personalised experience.</div>
                        </v-col>
                    </v-row>
                </v-container>
               
                <v-card-text id="margin-tune1">
                    <h1>{{ emailpass }}</h1>
                    <v-card-text id="field-header-details">Your electric vehicle's brand</v-card-text>
                    <v-text-field type="text" label="Brand (eg. Tesla, MG)" v-model="brand" clearable color='#0D47A1'/>
                    <v-card-text id="field-header-details">Your electric vehicle's model</v-card-text>
                    <v-text-field label="Model (eg. Model 3, ZS)" type="text" v-model="model" clearable color='#0D47A1'/>
                    <v-card-text id="field-header-details">Your contact number</v-card-text>
                    <v-text-field label="Contact Number" type="text" v-model="number" clearable color='#0D47A1'/>
                </v-card-text>

                <v-col class="text-center">
                    <v-btn id="continue-btn-style" @click="signIn(email, password)">                  
                    <span>Continue</span>                  
                    </v-btn>
                </v-col>
                
            </v-card>
        </v-col>

        <v-col md="6">
            <v-img id="nav-logo-login" src="../assets/AboutPage/Sign_Up.png"></v-img>
        </v-col>
        </v-row>
        </v-container>

        <v-container>
            <button @click="signOutPress">Sign out</button> 
        </v-container>
    </v-app>

</template>

<script>

import { signOut, getAuth  } from '@firebase/auth';
// import NavBarLogin from "../components/NavBarLogin.vue";
import NavBarLogin from "../components/NavBarLogin.vue"; //import router

const auth = getAuth();

export default {
    props: {
        emailpass: String
    },  
    methods: {
        signOutPress() {
            signOut(auth).then(() => {
                alert("Successfully signed out.")
                this.$router.push('/')
            }).catch((error) => {
                alert(error.code)
            });
        }
    },
    components: { NavBarLogin }
}
</script>

<style>
    
#details1 {
  font-family: 'Outfit', sans-serif;
  font-size: 40px;
  position: absolute;
  line-height: 40px;
  top: 0px;
  text-align: center;
  font-weight: 900;
  color: black;
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
  color: rgb(44, 154, 251);
}


#margin-tune1 {
    margin: 0;
    padding-top: 120px;
    padding-bottom: 0px;
}

#field-header-details {
    line-height: 0px;
}

#continue-btn-style {
  background-color: #4285f4;
  color: #FFFFFF;
  font-family: 'Outfit', sans-serif;
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

