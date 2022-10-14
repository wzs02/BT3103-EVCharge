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

        <div id="faq-div">
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
                                    EVCharge aims to promote a culture of respect and consideration, hence a deposit fee
                                    is mandatory because a nominal sum will be imposed as a no-show fee for users who
                                    have not adhered to the time slots that they have booked.
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-title class="panel-title" expand-icon="mdi-menu-down">
                                    How would the no-show fee be implemented?
                                </v-expansion-panel-title>

                                <v-expansion-panel-text class="panel-text">
                                    The no-show fee will be deducted from your account deposit. This deposit is to be
                                    made before you can start booking EV charging slots using EVCharge.
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-title class="panel-title" expand-icon="mdi-menu-down">
                                    What are the payment methods available?
                                </v-expansion-panel-title>

                                <v-expansion-panel-text class="panel-text">
                                    EVCharge supports a wide variety of payment methods. In-application payments can be
                                    made through a PayNow QR Code, or through a credit card of your choice.
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-title class="panel-title" expand-icon="mdi-menu-down">
                                    How do I report irresponsible user behaviour?
                                </v-expansion-panel-title>

                                <v-expansion-panel-text class="panel-text">
                                    Instances of irresponsible user behaviour or inadequate charging facilities can be
                                    reported at our forum page. While we do appreciate user feedback, we urge all users
                                    to remain tactful in their comments at all times and to refrain from disclosing
                                    personal information about other users. To ensure that user behaviour adheres to
                                    community guidelines, our forum channels are being regulated by our team on a
                                    regular basis and EVCharge reserves the right to terminate the accounts of users who
                                    repeatedly violate community guidelines.
                                </v-expansion-panel-text>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-title class="panel-title" expand-icon="mdi-menu-down">
                                    How do I record my attendance?
                                </v-expansion-panel-title>

                                <v-expansion-panel-text class="panel-text">
                                    You can verify your attendance by clicking on the confirmation button of the Booking
                                    Page.
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

#faq-div {
    align-items: flex-start;
    display: flex;
    justify-content: center;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>