<template>
  <v-app>
    <NavBar />
    <div id="view_bookings">
      <h1 id="view_bookings_header">Bookings</h1>
      <p id="view_bookings_upcoming">Upcoming</p>
      <br>
      <BookingRecord />
      <p id="view_bookings_past">Past</p>
    </div>
  </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import BookingRecord from "../components/BookingRecord.vue";

export default {
    components: { NavBar, BookingRecord } 

}
</script>

<style scoped>
#view_bookings {
  margin-top: 140px;
  margin-left: 130px;
}

#view_bookings_header {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 55px;
}

#view_bookings_upcoming{
  margin-top: 65px;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 35px;
}

#view_bookings_past {
  margin-top: 40px;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 35px;
}
</style>