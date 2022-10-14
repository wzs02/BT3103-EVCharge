<template>
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

    <div class="bg-container">
      <img v-bind:src="bg_img" id="bg-ratio">
      <div id="bg-title">EMPOWER <br />YOUR RIDE</div>
      <div id="bg-desc">We make your journey worry-free <br />while moving towards a cleaner world.</div>
    </div>

    <div id="how-to-header">
      <div class="header">How To Use <span id="charge-text">EVCharge</span>?</div>
    </div>

    <v-container>
      <v-row>
        <v-col cols=4>
          <img v-bind:src="bg_car" style = "border-radius: 20px">
        </v-col>

        <v-col cols=8>
          <HowTo header="Find"
            para="Filter for an EV charger that meets your needs. Gather relevant information at your fingertips - location, charger type, availability, price, etc." />
          <HowTo header="Book" para="Book an EV charger at a specific time slot in advance. With reservations, you'll never
                  have to show up to an occupied charger." />
          <HowTo header="Plan" para="Plan your mileage or trip in advance. Account for time and distance required for
                  charging in your route." />
        </v-col>
      </v-row>
    </v-container>

    <div class="center-with-bottom-space">
      <v-btn class="btn-style">FAQ Page</v-btn>
    </div>

    <div class="center-with-bottom-space">
      <hr style="width: 1200px" />
    </div>

    <div class="center-with-bottom-space">
      <div class="header">Meet Our Team</div>
    </div>

    <div id="team-profile">
      <TeamProfile imgSource="About_TZ.png" memberName="Lai Tzu Zheng" />
      <TeamProfile imgSource="About_QY.png" memberName="Loh Qian Yi" />
      <TeamProfile imgSource="About_NH.png" memberName="Nathaniel Han" />
      <TeamProfile imgSource="About_SS.png" memberName="Shanice Sng" />
      <TeamProfile imgSource="About_YY.png" memberName="Yang Yee" />
    </div>

    <div id = "contact-details">
      <h3 id = "contact-header">Contact Us: </h3> &emsp;
      <img v-bind:src="icon_email" class="icon-img">
      <span id = "contact-email">enquiries@evcharge.com</span> &emsp;&emsp;
      <img v-bind:src="icon_fb" class="icon-img">
      <img v-bind:src="icon_ig" class="icon-img">
      <img v-bind:src="icon_twitter" class="icon-img">
    </div>
  </v-app>
</template>

<script>
import TeamProfile from '@/components/TeamProfile.vue'
import HowTo from '@/components/HowTo.vue'

export default {
  name: 'NavBar',
  components: { TeamProfile, HowTo },
  data() {
    return {
      bg_img: require('../assets/AboutPage/About_Bg.png'),
      bg_ellipse: require('../assets/AboutPage/About_Ellipse.png'),
      bg_car: require('../assets/AboutPage/About_Car.png'),
      icon_email: require('../assets/AboutPage/About_Email.png'),
      icon_fb: require('../assets/AboutPage/About_FB.png'),
      icon_ig: require('../assets/AboutPage/About_IG.png'),
      icon_twitter: require('../assets/AboutPage/About_Twitter.png'),
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

.bg-container {
  position: relative;
  text-align: center;
}

#bg-ratio {
  width: 100%;
  height: 600px;
}

#bg-title {
  font-family: 'Outfit', sans-serif;
  font-weight: bolder;
  font-size: 70px;
  position: absolute;
  line-height: 60px;
  top: 200px;
  left: 150px;
  text-align: start;

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

#how-to-header {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

#charge-text {
  font-family: 'Outfit';
  font-weight: 700;
  font-size: 70px;
  background: linear-gradient(180deg, #00E0FF 0%, #0028FB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.center-with-bottom-space {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.header {
  font-family: 'Outfit', sans-serif;
  font-weight: bolder;
  font-size: 70px;
}

#team-profile {
  display: flex;
  justify-content: space-around;
  margin-bottom: 100px;
}

.icon-img {
  height: 20px;
  width: 20px;
  margin-left: 2px;
  margin-right: 8px;
}

#contact-details {
  display: flex; 
  justify-content: flex-end; 
  align-items: center;
  margin-bottom: 20px;
}

#contact-header {
  font-family: 'Outfit';
  font-weight: bold;
  font-size: 20px;
}

#contact-email {
  font-family: 'Outfit';
  font-size: 15px;
}
</style>