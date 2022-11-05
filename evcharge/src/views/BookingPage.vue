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
              <v-card-text>You are booking for <b>{{ this.selected_station_name }}</b></v-card-text>
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
import firebaseApp from "../firebase.js"
import { getFirestore, getDoc, doc } from "firebase/firestore"

const db = getFirestore(firebaseApp)

export default {
  name: 'BookingPage',
  components: { NavBar, BookingCalendar, FilterBar },
  created(){
    let station_id = localStorage.getItem("stationID");
    if (station_id != null) {
     this.getStationData(station_id);
     localStorage.setItem("stationID", null)
    }
  },
  data() {
    return {
      selected_station_id: "",
      selected_station_name: "", 
      selected_station_provider: "",
      selected_station_charger_type: "",
      selected_station_address: ""
    } 
  },
  methods: {
    async getStationData(station_id) {
      const docRef = doc(db, "MapPage", "chargerLocations");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const station_data = docSnap.data()[station_id][0];
        this.selected_station_id = station_id;
        this.selected_station_name = station_data.id;
        this.selected_station_provider = station_data.chargerDetails["provider"];
        this.selected_station_charger_type = station_data.chargerDetails["type"][0]; // assume that each station only offers 1 charging type
        this.selected_station_address = {"street": station_data.street, "postalCode": station_data.postalCode};
      }
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