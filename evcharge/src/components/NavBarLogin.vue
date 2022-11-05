<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-app-bar :elevation="0" :height=70>
        <v-container fluid>
            <v-row>
                <v-col cols="8">
                    <button @click="$router.push('/')">
                        <v-img id="nav-logo" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img>
                    </button>
                </v-col>

                <v-col cols="4" class="menu-options">
                    <button @click="$router.push('/')" class="menu-op">About</button>
                    <button @click="$router.push('/Book')" class="menu-op">Book</button>
                    <button @click="$router.push('/TesterFile')" class="menu-op">Plan</button>
                    <v-icon style="font-size: 23px;">
                        mdi-bell-outline
                    </v-icon>

                    <div class="text-center">
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn id="profile-btn" v-bind="props">
                                    <v-avatar size="20">
                                        <v-img src='../assets/AboutPage/About_Ellipse.png'>
                                        </v-img>
                                    </v-avatar>
                                    <span id="userName">&emsp;John Doe</span>
                                    <v-icon id="menu-down-icon">
                                        mdi-menu-down
                                    </v-icon>
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item v-for="(item, index) in items" :key="index"
                                    @click="$router.push(item.route)">
                                    <v-list-item-title class="dropdownItem">
                                        {{ item.title }}
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <!-- <v-btn @click="this.$router.push('/login')" class="btn-style">Log In</v-btn> -->
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>
  
<script>
import { onMounted, ref } from "vue";
import { signOut, getAuth, onAuthStateChanged } from '@firebase/auth';
import { mdiBellOutline } from '@mdi/js';
import { mdiMenuDown } from '@mdi/js';

let isLoggedIn = ref(false);

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    });
});

export default {
    name: 'NavBarLogin',
    data() {
        return {
            mdiBellOutline,
            mdiMenuDown,
            items: [
                {
                    title: "Profile",
                    value: 1,
                    route: { name: 'TesterFile' } // to edit
                },
                {
                    title: "My Bookings",
                    value: 2,
                    route: { name: 'ViewBookings' }
                },
                {
                    title: "Account Balance",
                    value: 3,
                    route: { name: 'AccountBalancePage' }
                },
                {
                    title: "Log out",
                    value: 4,
                    route: { name: 'TesterFile' } // to edit
                }
            ]
        }
    },
    methods: {
        signOutPress() {
            signOut(auth).then(() => {
                isLoggedIn.value = false;
                this.$router.push("/")
            })
        }
    }
}
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300&display=swap');

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

#profile-btn {
    background-color: #4285F4;
    width: 150px;
}

#userName {
    color: white;
    font-family: 'Outfit';
    font-weight: bolder;
    text-transform: none;
    font-size: 14px;
}

.dropdownItem {
    font-family: 'Outfit';
    font-weight: bolder;
    text-transform: none;
    font-size: 14px;
}

#menu-down-icon {
    font-size: 23px;
    color: white;
}
</style>