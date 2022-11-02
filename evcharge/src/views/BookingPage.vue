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
        </v-col>

        <v-col cols=6>
          <div class="dayview">
            <v-card color="#F5F5F5" height=500px>
              <BookingCalendarDay />
              <v-card-text>You are booking for </v-card-text>
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
import FilterBar from "@/components/FilterBar.vue";
import BookingCalendarDay from "@/components/BookingCalendarDay.vue"

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

.dayview {
  margin: auto;
  font-family: "Outfit";
  font-style: normal;
  height: 50px;
}

.btn {
    background-color: #4285f4;
    color: #FFFFFF;
    font-family: 'Outfit', sans-serif;
    font-weight: bold;
    border-radius: 20px;
}

</style>