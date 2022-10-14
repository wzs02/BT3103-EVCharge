<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-app>
        <v-app-bar :elevation="0">
            <v-container fluid>
                <v-row>
                    <v-col cols="8">
                        <v-app-bar-nav-icon>
                            <v-img id="nav-logo" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img>
                        </v-app-bar-nav-icon>
                    </v-col>

                    <v-col cols="3" class="menu-options">
                        <nav>
                            <router-link to="/" class="menu-op">About</router-link>
                            <router-link to="/login" class="menu-op">Book</router-link>
                            <router-link to="/login" class="menu-op">Plan</router-link>
                            <router-link to="/signup" class="menu-op">Sign Up</router-link>
                            <v-btn @click="this.$router.push('/login')" class="btn-style">Log In</v-btn>
                        </nav>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>

        <div style="height: 120px"></div>

        <div style="align-items: start; display: flex; justify-content: center;">
            <div>
                <h1 id="faq-heading">FAQs</h1>
                <div>
                    <div style="width: 800px">
                        <v-expansion-panels variant='accordion' color="#8AC3F3">
                            <v-expansion-panel>
                                <v-expansion-panel-title class="panel-title" expand-icon="mdi-menu-down">
                                    Why is there a deposit fee?
                                </v-expansion-panel-title>

                                <v-expansion-panel-text class="panel-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione
                                    debitis
                                    quis est
                                    labore voluptatibus! Eaque cupiditate minima
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-title class="panel-title" expand-icon="mdi-menu-down">
                                    How would the no-show fee be implemented?
                                </v-expansion-panel-title>

                                <v-expansion-panel-text class="panel-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione
                                    debitis
                                    quis est
                                    labore voluptatibus! Eaque cupiditate minima
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-title class="panel-title" expand-icon="mdi-menu-down">
                                    What are the payment methods available?
                                </v-expansion-panel-title>

                                <v-expansion-panel-text class="panel-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione
                                    debitis
                                    quis est
                                    labore voluptatibus! Eaque cupiditate minima
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-title class="panel-title" expand-icon="mdi-menu-down">
                                    How do I report irresponsible user behaviour?
                                </v-expansion-panel-title>

                                <v-expansion-panel-text class="panel-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione
                                    debitis
                                    quis est
                                    labore voluptatibus! Eaque cupiditate minima
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-title class="panel-title" expand-icon="mdi-menu-down">
                                    How do I record my attendance?
                                </v-expansion-panel-title>

                                <v-expansion-panel-text class="panel-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione
                                    debitis
                                    quis est
                                    labore voluptatibus! Eaque cupiditate minima
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </div>
                </div>
            </div>
        </div>

    </v-app>
</template>

<script>
import { mdiAccount } from '@mdi/js';

export default {
    name: 'FAQPage',
    data() {
        return {
            mdiAccount
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@300&display=swap');

#nav-logo {
    width: 140px;
    margin-left: 150px;
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

.panel-title {
    font-family: 'Outfit';
    font-weight: bolder;
    font-size: 17px;
    color: white;
    background-color: #8AC3F3;
}

.panel-text {
    font-family: 'Outfit';
    font-size: 15px;
    color: black;
}

#faq-heading {
    font-family: 'Outfit';
    font-size: 50px;
    margin-bottom: 40px;
    font-weight: bolder;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>