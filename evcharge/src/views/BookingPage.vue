<template>
  <v-app>
    <NavBar />
    <v-container>

      <v-row>
        <h1 class="header">Book a Charger</h1>
      </v-row>

      <v-row>
        <FilterBar />
      </v-row>

      <v-row>
        <v-col cols=6>
          <BookingCalendar />
        </v-col>

        <v-col cols=6>
          <p>This where box be</p>
        </v-col>
      </v-row>
      
        
      
       
     
    </v-container>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import BookingCalendar from "@/components/BookingCalendar.vue"
import FilterBar from "@/components/FilterBar.vue";

export default {
  name: 'BookingPage',
  components: { NavBar, BookingCalendar, FilterBar },
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
  padding-top: 100px;
  padding-bottom: 20px;
  font-family: "Outfit";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
}

</style>