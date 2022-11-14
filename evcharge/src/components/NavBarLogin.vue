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
                    <button @click="$router.push('/map')" class="menu-op">Book</button>
                    <button @click="$router.push('/TesterFile')" class="menu-op">Plan</button>
                    <v-icon style="font-size: 23px;">
                        mdi-bell-outline
                    </v-icon>

                    <div class="text-center">
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn id="profile-btn" v-bind="props">
                                    <!-- <v-avatar size="20">
                                        <v-img src='../assets/AboutPage/About_Ellipse.png'>
                                        </v-img>
                                    </v-avatar> -->
                                    <span id="userName">&emsp;{{ username }}</span>
                                    <v-icon id="menu-down-icon">
                                        mdi-menu-down
                                    </v-icon>
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item v-for="(item, index) in items" :key="index" @click="handleDropdownClick(item)">
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
import { signOut, getAuth, onAuthStateChanged } from '@firebase/auth';
import { mdiBellOutline } from '@mdi/js';
import { mdiMenuDown } from '@mdi/js';
import firebaseApp from '../firebase.js';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


export default {
    created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.uid = user.uid;
        this.getUsername(user.uid)
        console.log(user.uid)
      } else{
        this.isLoggedIn = false;
      }
    })
    },
    data() {
        return {
            isLoggedIn: false,
            uid: false,
            username: "",
            mdiBellOutline,
            mdiMenuDown,
            items: [
                {
                    title: "Profile",
                    value: 1,
                    route: { name: 'ProfilePage' } // to edit,
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
                }
            ]
        }
    },
    methods: {
        handleDropdownClick(item) {
            if (item.title != "Log out") {
                this.$router.push(item.route)
            } else {
                const auth = getAuth();
                signOut(auth).then(() => {
                    this.isLoggedIn= false;
                    this.$router.push("/")
                })
            }
        },
        async getUsername(uid) {
        // const auth = getAuth()
        const db = getFirestore(firebaseApp);
        const userRef = collection(db, "USERS")
        let z = await getDocs(query(userRef, where('user_uid', "==", uid)))
        z.forEach((docs) => {
            let data = docs.data();
            this.username = data.user_name
        }
        )
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