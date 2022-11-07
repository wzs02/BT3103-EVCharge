<template>
  <v-app>
    <NavBar />
    <v-container>

      <v-row class="header">
        <h1>Book a Charger</h1>
      </v-row>

      <v-row class="filterbar">
        <FilterBar />
      </v-row>

      <v-row>
        <v-col cols=6>
          <BookingCalendar />
          <div class="legend">
            <div class="legendindiv">
              <span class="dot1"></span>
              <p class="legendtext">Available</p>
            </div>
            <div class="legendindiv">
              <span class="dot2"></span>
              <p class="legendtext">Limited</p>
            </div>
            <div class="legendindiv">
              <span class="dot3"></span>
              <p class="legendtext">Unavailable</p>
            </div>
            <div class="legendindiv">
              <span class="dot4"></span>
              <p class="legendtext">Selected</p>
            </div>
          </div>
        </v-col>

        <v-col cols=6>
          <div class="dayview">
            <v-card color="#F5F5F5" height=500px>
              <BookingCalendarDay />
              <p>You are booking for </p>
              <v-btn class="btn" rounded elevation="5">Book</v-btn>
            </v-card>
          </div>
        </v-col>
      </v-row>
     
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import BookingCalendar from "@/components/BookingCalendar.vue"
import BookingCalendarDay from "@/components/BookingCalendarDay.vue"
import FilterBar from "@/components/FilterBar.vue";

export default {
  name: 'BookingPage',
  components: { NavBar, BookingCalendar, FilterBar, BookingCalendarDay },
  data() {
    return {
      //
    } 
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Outfit:wght@300&display=swap');

.header {
  margin: auto;
  margin-top: 10%;
  font-family: "Outfit";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
}

.filterbar {
  margin: auto;
  margin-bottom: 5%;
  font-family: "Outfit";
  font-style: normal;
  font-weight: 100;
  font-size: 18px;
}

.dot1 {
  background-color: #D9ED92;
  margin-right: 10px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  float: left;
}

.dot2 {
  background-color: #FFE28C;
  margin-right: 10px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  float: left;
}

.dot3 {
  background-color: #FF7575;
  margin-right: 10px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  float: left;
}

.dot4 {
  background-color: #B1DCFF;
  margin-right: 10px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  float: left;
}

.legend {
  margin-top: 10%;
}

.legendindiv {
  vertical-align: middle;
  float: left;
}

.legendtext {
  margin-right: 25px;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 100;
  font-size: 15px;
  float: left;
}

.dayview {
  margin: auto;
  text-align: center;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 100;
  font-size: 15px;
  height: 50px;
}

.btn {
  width: 40%;
  background-color: #4285f4;
  color: #FFFFFF;
  font-family: 'Outfit';
  font-weight: bold;
  font-size: 10px;
  border-radius: 15px;
}

</style>