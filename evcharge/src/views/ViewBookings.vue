<template>
  <v-app>
    <NavBar />
    <div id="view_bookings">
      <h1 id="view_bookings_header">Bookings</h1>
      <p id="view_bookings_upcoming">Upcoming</p>
      <p id="view_bookings_past">Past</p>
    </div>
  </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
    components: {NavBar}

}
</script>

<style scoped>
#view_bookings {
  margin-top: 170px;
  margin-left: 137px;
}

#view_bookings_header {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 70px;
}

#view_bookings_upcoming{
  margin-top: 115px;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 40px;
}

#view_bookings_past {
  margin-top: 80px;
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 40px;
}

</style>