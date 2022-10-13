<template>
    <v-app>
        <v-app-bar :elevation="2">
            <v-container fluid>
                <v-row>
                    <v-col cols="8">
                        <v-app-bar-nav-icon>
                            <v-img id="nav-logo" src="../assets/AboutPage/About_Navbar_Logo.png"></v-img>
                        </v-app-bar-nav-icon>
                    </v-col>

                    <v-col cols="3" class="menu-options">
                        <div class="menu-op">About</div>
                        <div class="menu-op">Book</div>
                        <div class="menu-op">Plan</div>
                        <div class="menu-op">Sign up</div>
                        <v-btn class="btn-style">Log in</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
    </v-app>
</template>
  
<script>
export default {
    name: 'NavBar'
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
</style>